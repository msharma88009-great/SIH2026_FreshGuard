from flask import Blueprint, jsonify, request

from services.sensor_service import (
    get_sensor_readings,
    add_sensor_reading,
)


sensor_bp = Blueprint("sensors", __name__)


@sensor_bp.get("")
def list_sensors():
    shipment_id = request.args.get("shipment_id")

    return jsonify(
        success=True,
        data=get_sensor_readings(shipment_id),
    )


@sensor_bp.post("")
def add_sensor():
    payload = request.get_json(silent=True) or {}

    result = add_sensor_reading(payload)

    status_code = 201 if result["success"] else 400

    return jsonify(result), status_code