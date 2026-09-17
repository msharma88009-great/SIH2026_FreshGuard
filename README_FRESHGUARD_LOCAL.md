# Fresh Guard local run

## Frontend
Open CMD in this folder:

```cmd
npm install
npm run dev
```

Open the Vite URL shown by the terminal (normally `http://localhost:5173`).

## Backend
Open a second CMD:

```cmd
cd backend
python -m pip install -r requirements.txt
python app.py
```

Backend health: `http://localhost:5000/api/health`

## MongoDB
Set `MONGO_URI` and `MONGO_DB_NAME` in a `.env` file if needed. The backend automatically uses MongoDB when reachable and otherwise falls back to temporary in-memory storage for development.

## Sensor data flow
ESP32 -> temperature/humidity/gas/vibration/reed -> Wi-Fi -> POST `/api/sensors` -> MongoDB.

When Wi-Fi is unavailable, the ESP32 should append packets to MicroSD. When Wi-Fi returns, send the buffered array to POST `/api/sensors/sync`. Records are deduplicated by `reading_id` and receive a SHA-256 record hash before persistence.

Gas is intentionally labelled **raw** in the UI because MQ-2 is a general gas sensor and is not an ethylene-specific calibrated sensor.
