# RuuviMeter
A React Native mobile application that takes data from RuuviTag and sends it via ESP32-microcontroller to display the current weather and humidity.
ESP32 is used as a middleman because the objective was to be able to send the data using WiFi so you don't have to be close to the bluetooth device (RuuviTag).

## ESP32
The code that was made for ESP32 can be found in the RuuviTagBLESCAN folder, programmed using Arduino IDE.

##### References
https://www.hackster.io/amir-pournasserian/ble-weather-station-with-esp32-and-ruuvi-e8a68d
https://arduinojson.org/
https://gist.github.com/VeraZab/c3f13d51588bcfdf6799da65decf26fa
