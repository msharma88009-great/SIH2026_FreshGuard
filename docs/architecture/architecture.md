# Fresh Guard — System Architecture

## 1. Overview

Fresh Guard is a farm-to-fork traceability and freshness monitoring system. The proposed flow is:

**Farm → Collection → Processing → Transport → Retail → Consumer**

The system combines IoT sensing, a web dashboard, database storage, and blockchain-backed integrity verification.

## 2. End-to-End Architecture

```text
Temperature / Humidity / Gas / Location Sensors
                    ↓
                  ESP32
                    ↓
              LoRa / MQTT
                    ↓
              Flask Backend
                 ↙       ↘
            MongoDB    Blockchain
                 ↘       ↙
               React Dashboard
                    ↓
          QR / Traceability / Hash
               Verification
```

## 3. Main Layers

### IoT Layer
ESP32 collects environmental and shipment information from sensors. MicroSD storage can buffer readings when network connectivity is unavailable.

### Communication Layer
LoRa and/or MQTT transports sensor data from the field/container side to the backend.

### Backend Layer
Flask provides REST APIs, validation, freshness-score logic, alerts, traceability processing, and verification endpoints.

### Database Layer
MongoDB stores application data such as shipments, sensor readings, alerts, and traceability events.

### Integrity Layer
Important traceability records and hashes can be anchored to Hyperledger Fabric so that later verification can detect tampering.

### Presentation Layer
React provides the operator dashboard, live monitoring, shipment tracking, alerts, history, traceability, QR verification, and hash verification.

## 4. Offline Operation

When connectivity is unavailable, the ESP32 can store readings locally on MicroSD. Once connectivity is restored, buffered readings can be transmitted to the backend for processing and storage.

## 5. Data Flow

1. Sensors measure shipment conditions.
2. ESP32 collects and packages readings.
3. LoRa/MQTT transports available readings.
4. Flask validates and processes the data.
5. MongoDB stores application records.
6. Freshness and alert logic evaluates conditions.
7. Important integrity information is prepared for blockchain anchoring.
8. React retrieves the processed information through Flask APIs.
9. QR and hash verification expose traceability/integrity information to authorized users.

## 6. Design Principle

React does not connect directly to MongoDB. The Flask API is the application boundary between the frontend and backend data/services.
