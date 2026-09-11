# Fresh Guard — API Documentation

## Base URL

Local development:

`http://127.0.0.1:5000`

All application APIs use the `/api` prefix.

## 1. Health

### GET `/api/health`

Checks whether the Flask service is running.

Example response:

```json
{
  "success": true,
  "service": "Fresh Guard Flask Backend",
  "status": "healthy"
}
```

## 2. Shipments

### GET `/api/shipments`

Returns shipment records.

### GET `/api/shipments/<shipment_id>`

Returns one shipment.

### POST `/api/shipments`

Creates a shipment.

Example request:

```json
{
  "product": "Fresh Tomatoes",
  "origin": "Nashik Farm",
  "destination": "Jaipur Retail Hub",
  "status": "Active"
}
```

## 3. Sensors

### GET `/api/sensors`

Returns sensor readings.

Optional query:

`?shipment_id=FG-1001`

### POST `/api/sensors`

Adds a sensor reading.

Example:

```json
{
  "shipment_id": "FG-1001",
  "temperature": 4.2,
  "humidity": 68,
  "gas_level": 42,
  "timestamp": "2026-09-09T10:05:00Z",
  "location": {
    "latitude": 20.011,
    "longitude": 73.789
  }
}
```

The backend calculates a prototype freshness score from the supplied readings.

## 4. Alerts

### GET `/api/alerts`

Returns alert records.

## 5. Traceability

### GET `/api/traceability/<shipment_id>`

Returns the farm-to-fork traceability events for a shipment.

## 6. QR Verification

### POST `/api/qr/verify`

Verifies a shipment/product identifier against the backend record.

Example:

```json
{
  "code": "FG-1001"
}
```

## 7. Hash Verification

### POST `/api/hash/verify`

Calculates SHA-256 for the supplied record and compares it with the expected hash.

Example:

```json
{
  "record": {
    "shipment_id": "FG-1001",
    "stage": "Farm"
  },
  "expected_hash": "..."
}
```

## 8. Frontend Integration

The React frontend should call Flask APIs through the `services/` layer.

```text
React
  ↓
services/api.js and feature API modules
  ↓
Flask REST API
  ↓
MongoDB / processing / blockchain adapter
```

React should never connect directly to MongoDB.

## 9. Error Convention

API errors use JSON such as:

```json
{
  "success": false,
  "error": "Description of the problem"
}
```

HTTP status codes should communicate the result, for example:

- `200` — successful request
- `201` — resource created
- `400` — invalid request
- `404` — resource not found
- `500` — server error
