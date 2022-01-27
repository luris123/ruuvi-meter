# RuuviMeter
A React Native mobile application that takes data from RuuviTag and sends it via ESP32-microcontroller to display the current weather and humidity.
ESP32 is used as a middleman because the objective was to be able to send the data using WiFi so you don't have to be close to the bluetooth device (RuuviTag).

## ESP32
The code that was made for ESP32 can be found in the RuuviTagBLESCAN folder, coded with Arduino IDE.
