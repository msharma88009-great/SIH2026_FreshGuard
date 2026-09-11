from flask import Blueprint, jsonify, request
from services.sensor_service import get_traceability, add_traceability_event

traceability_bp = Blueprint("traceability", __name__)


@traceability_bp.get("/<shipment_id>")
def trace(shipment_id):
    return jsonify(success=True, data=get_traceability(shipment_id))


@traceability_bp.post("")
def add_event():
    result = add_traceability_event(request.get_json(silent=True) or {})
    return jsonify(result), 201 if result["success"] else 400
