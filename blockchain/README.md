# Fresh Guard Blockchain

This module contains the Hyperledger Fabric blockchain layer for Fresh Guard.

## Structure

```text
blockchain/
├── chaincode/
│   ├── traceability.js
│   └── package.json
│
├── network/
│   ├── organizations/
│   ├── channel-config/
│   └── scripts/
│
└── README.md
```

## Role in Fresh Guard

The blockchain stores important tamper-evident traceability/integrity records and hashes. Raw high-frequency sensor readings remain in the application database.

Flow:

IoT/ESP32 → Flask Backend → MongoDB
                         ↓
                  Hash / Integrity Record
                         ↓
                Hyperledger Fabric
                         ↓
                 QR / Hash Verification

## Important

This is the project-side blockchain code and network structure. A live Fabric network still requires peers, ordering service, identities/MSP, channel setup, and chaincode deployment/configuration.
