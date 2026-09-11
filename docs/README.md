# Fresh Guard Documentation

This folder contains the project documentation for the SIH 2026 Fresh Guard system.

## Documents

- `architecture/architecture.md` — overall system architecture and data flow
- `hardware/hardware_setup.md` — IoT/ESP32 hardware setup and operational flow
- `api/api_documentation.md` — Flask REST API endpoints and frontend integration

## Project Flow

**Farm → Collection → Processing → Transport → Retail → Consumer**

The implementation combines:

**IoT → LoRa/MQTT → Flask → MongoDB → React**

with blockchain/hash verification for important integrity records.
