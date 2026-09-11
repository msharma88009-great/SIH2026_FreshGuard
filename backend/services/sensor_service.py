from datetime import datetime, timezone
from uuid import uuid4

from services.freshness_service import calculate_freshness_score
from utils.database import db


def now():
    return datetime.now(timezone.utc).isoformat()


def get_shipments():
    return db.find_many("shipments")


def get_shipment(sid):
    return db.find_one("shipments", {"shipment_id": sid})


def create_shipment(p):
    missing = [x for x in ("product", "origin", "destination") if not p.get(x)]

    if missing:
        return {
            "success": False,
            "error": "Missing fields: " + ", ".join(missing),
        }

    x = {
        "shipment_id": p.get("shipment_id") or "FG-" + uuid4().hex[:8].upper(),
        "product": p["product"],
        "origin": p["origin"],
        "destination": p["destination"],
        "status": p.get("status", "Active"),
        "freshness_score": float(p.get("freshness_score", 100)),
        "created_at": now(),
    }

    db.insert_one("shipments", x)

    return {
        "success": True,
        "data": x,
    }


def get_sensor_readings(sid=None):
    return db.find_many(
        "sensor_readings",
        {"shipment_id": sid} if sid else {},
    )


def create_sensor_alerts(
    shipment_id,
    temperature,
    humidity,
    gas_level,
    vibration=False,
    reed_open=False,
):
    alerts = []

    # ================= TEMPERATURE =================

    if temperature > 8:
        alerts.append({
            "alert_id": "AL-" + uuid4().hex[:10].upper(),
            "shipment_id": shipment_id,
            "alert_type": "Temperature",
            "severity": "Critical" if temperature > 10 else "High",
            "message": f"Temperature is too high: {temperature}°C",
            "timestamp": now(),
            "acknowledged": False,
        })

    # ================= HUMIDITY =================

    if humidity > 75:
        alerts.append({
            "alert_id": "AL-" + uuid4().hex[:10].upper(),
            "shipment_id": shipment_id,
            "alert_type": "Humidity",
            "severity": "Medium",
            "message": f"Humidity is above safe level: {humidity}%",
            "timestamp": now(),
            "acknowledged": False,
        })

    # ================= GAS =================

    if gas_level > 100:
        alerts.append({
            "alert_id": "AL-" + uuid4().hex[:10].upper(),
            "shipment_id": shipment_id,
            "alert_type": "Gas",
            "severity": "Critical",
            "message": f"Gas level is too high: {gas_level} ppm",
            "timestamp": now(),
            "acknowledged": False,
        })

    # ================= VIBRATION =================

    if vibration:
        alerts.append({
            "alert_id": "AL-" + uuid4().hex[:10].upper(),
            "shipment_id": shipment_id,
            "alert_type": "Vibration",
            "severity": "High",
            "message": "Vibration detected during shipment. Possible rough handling or impact.",
            "timestamp": now(),
            "acknowledged": False,
        })

    # ================= REED / TAMPER =================

    if reed_open:
        alerts.append({
            "alert_id": "AL-" + uuid4().hex[:10].upper(),
            "shipment_id": shipment_id,
            "alert_type": "Container",
            "severity": "Critical",
            "message": "Container access detected. Reed switch is open.",
            "timestamp": now(),
            "acknowledged": False,
        })

    # ================= SAVE ALERTS =================

    for alert in alerts:
        db.insert_one("alerts", alert)

    return alerts


def add_sensor_reading(p):
    missing = [
        x
        for x in (
            "shipment_id",
            "temperature",
            "humidity",
            "gas_level",
        )
        if x not in p
    ]

    if missing:
        return {
            "success": False,
            "error": "Missing fields: " + ", ".join(missing),
        }

    temperature = float(p["temperature"])
    humidity = float(p["humidity"])
    gas_level = float(p["gas_level"])

    # ================= VIBRATION =================

    vibration = bool(p.get("vibration", False))

    # ================= REED SWITCH =================

    reed_open = bool(p.get("reed_open", False))

    # ================= SENSOR RECORD =================

    x = {
        "reading_id": "RD-" + uuid4().hex[:10].upper(),
        "shipment_id": p["shipment_id"],
        "temperature": temperature,
        "humidity": humidity,
        "gas_level": gas_level,
        "vibration": vibration,
        "reed_open": reed_open,
        "timestamp": p.get("timestamp", now()),
        "location": p.get("location", {}),
    }

    # ================= FRESHNESS =================

    x["freshness_score"] = calculate_freshness_score(
        temperature,
        humidity,
        gas_level,
    )

    # ================= SAVE SENSOR DATA =================

    db.insert_one("sensor_readings", x)

    # ================= CREATE ALERTS =================

    generated_alerts = create_sensor_alerts(
        p["shipment_id"],
        temperature,
        humidity,
        gas_level,
        vibration,
        reed_open,
    )

    return {
        "success": True,
        "data": x,
        "alerts_generated": len(generated_alerts),
    }


def get_alerts():
    return db.find_many("alerts")


def add_traceability_event(p):
    missing = [
        x
        for x in ("shipment_id", "stage", "location")
        if not p.get(x)
    ]

    if missing:
        return {
            "success": False,
            "error": "Missing fields: " + ", ".join(missing),
        }

    x = {
        "event_id": p.get("event_id") or "EV-" + uuid4().hex[:10].upper(),
        "shipment_id": p["shipment_id"],
        "stage": p["stage"],
        "actor": p.get("actor", "Fresh Guard"),
        "location": p["location"],
        "timestamp": p.get("timestamp", now()),
        "metadata": p.get("metadata", {}),
    }

    db.insert_one("traceability", x)

    return {
        "success": True,
        "data": x,
    }


def get_traceability(sid):
    return db.find_many(
        "traceability",
        {"shipment_id": sid},
    )