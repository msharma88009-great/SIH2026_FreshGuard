# Fresh Guard Database

MongoDB-oriented database definitions and seed data for the Fresh Guard project.

## Collections

- `shipments` — shipment and freshness summary records
- `sensor_readings` — temperature, humidity, gas and location readings
- `alerts` — detected cold-chain/sensor alerts
- `traceability` — farm-to-fork movement events

## Files

- `seed/sample_data.json` — development/demo seed data
- `schema/shipments.json` — shipment JSON Schema
- `schema/sensors.json` — sensor reading JSON Schema
- `schema/alerts.json` — alert JSON Schema
- `schema/traceability.json` — traceability event JSON Schema

The Flask backend is responsible for database access. React should not connect
directly to MongoDB.
