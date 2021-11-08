/*
   Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleScan.cpp
   Ported to Arduino ESP32 by Evandro Copercini
*/

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <BLEAddress.h>

int scanTime = 5; //In seconds
BLEScan* pBLEScan;
int temp, hum, pressure, ax, ay, az, voltage_power, voltage, power, rssi_ruuvi, movement, measurement;
//Converts hexadecimal values to decimal values
int hexadecimalToDecimal(String hexVal)
{
    int len = hexVal.length();
    int base = 1;

    int dec_val = 0;

    for (int i = len - 1; i >= 0; i--)
    {
        if (hexVal[i] >= '0' && hexVal[i] <= '9')
        {
            dec_val += (hexVal[i] - 48) * base;

            base = base * 16;
        }
        else if (hexVal[i] >= 'A' && hexVal[i] <= 'F')
        {
            dec_val += (hexVal[i] - 55) * base;

            base = base * 16;
        }
    }
    return dec_val;
}

//Decodes RUUVI raw data and arranges it in an array
void decodeRuuvi(String hex_data, int rssi){
    if(hex_data.substring(4, 6) == "05"){
        temp = hexadecimalToDecimal(hex_data.substring(6, 10))*0.005;
        hum = hexadecimalToDecimal(hex_data.substring(10, 14))*0.0025;
        pressure = hexadecimalToDecimal(hex_data.substring(14, 18))*1+50000;

        ax = hexadecimalToDecimal(hex_data.substring(18, 22));
        ay = hexadecimalToDecimal(hex_data.substring(22, 26));
        az = hexadecimalToDecimal(hex_data.substring(26, 30));     

        if(ax > 0xF000){
          ax = ax - (1 << 16);
        }
        if(ay > 0xF000){
          ay = ay - (1 << 16);
        }
        if (az > 0xF000){
          az = az - (1 << 16);
        }

        voltage_power = hexadecimalToDecimal(hex_data.substring(30, 34));
        voltage = (int)((voltage_power & 0x0b1111111111100000) >> 5) + 1600;
        power = (int)(voltage_power & 0x0b0000000000011111) - 40;

        rssi_ruuvi = rssi;

        movement = hexadecimalToDecimal(hex_data.substring(34, 36));
        measurement = hexadecimalToDecimal(hex_data.substring(36, 40));
        Serial.print("Temperature: ");
        Serial.print(temp);
        Serial.println("°C");
        Serial.print("Humidity: ");
        Serial.print(hum);
        Serial.println("%");
        Serial.print("Signal strength: ");
        Serial.print(rssi_ruuvi);
        Serial.println("");
    }
}



class MyAdvertisedDeviceCallbacks: public BLEAdvertisedDeviceCallbacks {
    void onResult(BLEAdvertisedDevice advertisedDevice) {
      String ruuvi_mac = advertisedDevice.getAddress().toString().c_str();
      if (ruuvi_mac == "fb:44:89:ab:db:e0") {
        String raw_data = String(BLEUtils::buildHexData(nullptr, (uint8_t*)advertisedDevice.getManufacturerData().data(), advertisedDevice.getManufacturerData().length()));
        raw_data.toUpperCase();
        decodeRuuvi(raw_data, advertisedDevice.getRSSI());
        //Serial.printf("Advertised Device: %s \n", advertisedDevice.toString().c_str());
        }
      
        
    }
};

void setup() {
  Serial.begin(115200);
  Serial.println("Scanning...");

  BLEDevice::init("");
  pBLEScan = BLEDevice::getScan(); //create new scan
  pBLEScan->setAdvertisedDeviceCallbacks(new MyAdvertisedDeviceCallbacks());
  pBLEScan->setActiveScan(true); //active scan uses more power, but get results faster
  pBLEScan->setInterval(100);
  pBLEScan->setWindow(99);  // less or equal setInterval value
}

void loop() {
  // put your main code here, to run repeatedly:
  BLEScanResults foundDevices = pBLEScan->start(scanTime, false);
  Serial.println("Scan done!");
  pBLEScan->clearResults();   // delete results fromBLEScan buffer to release memory
  delay(2000);
}
