from flask import Blueprint, jsonify, request
from services.sensor_service import get_sensor_readings, add_sensor_reading, sync_sensor_readings

sensor_bp = Blueprint('sensors', __name__)

@sensor_bp.get('')
def list_sensors():
    shipment_id = request.args.get('shipment_id')
    return jsonify(success=True, data=get_sensor_readings(shipment_id))

@sensor_bp.post('')
def add_sensor():
    result = add_sensor_reading(request.get_json(silent=True) or {})
    return jsonify(result), 201 if result.get('success') else 400

@sensor_bp.post('/sync')
def sync():
    payload = request.get_json(silent=True) or {}
    records = payload.get('records') if isinstance(payload, dict) else None
    result = sync_sensor_readings(records)
    return jsonify(result), 200 if result.get('success') else 400
