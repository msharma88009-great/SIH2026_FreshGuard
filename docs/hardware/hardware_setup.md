# Fresh Guard — Hardware Setup

## 1. Hardware Purpose

The hardware prototype collects environmental and shipment information during the farm-to-fork journey.

## 2. Core Components

- ESP32 development board
- Temperature sensor
- Humidity sensor
- Gas sensor
- GPS/location module (when available)
- MicroSD/TF card module for offline buffering
- LoRa module (when used for long-range communication)
- Suitable power supply
- Breadboard, jumper wires, and required resistors/modules

## 3. Functional Flow

```text
Sensors
   ↓
ESP32
   ├──→ MicroSD (offline buffer)
   └──→ LoRa / MQTT
             ↓
        Flask Backend
```

## 4. Sensor Data

The prototype data model supports:

- Temperature
- Humidity
- Gas level
- Timestamp
- Shipment/batch identifier
- Location

These readings can be combined to calculate a freshness score and detect abnormal conditions.

## 5. Offline Storage

MicroSD is used as local temporary storage when network connectivity is unavailable.

Recommended concept:

1. Read sensor values.
2. Create a timestamped record.
3. Store the record locally when communication is unavailable.
4. Continue collecting readings.
5. When connectivity returns, transmit buffered records.
6. Mark/remove successfully synchronized records according to the firmware's sync policy.

## 6. Communication

The ESP32 can publish readings through MQTT or transmit them through LoRa to a gateway, depending on the deployed hardware architecture.

## 7. Hardware Safety

Use the voltage levels and wiring requirements specified by each sensor/module manufacturer. Do not connect a module to the ESP32 until its supply voltage, signal voltage, pinout, and required libraries have been checked.

## 8. Prototype Goal

The hardware demonstration should prove the complete path:

**real sensor reading → ESP32 → communication → Flask → database → React dashboard**

The final hardware pin mapping should be documented after the exact sensor and LoRa/GPS modules are selected.
