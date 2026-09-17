from flask import Blueprint, jsonify, request
from services.sensor_service import get_traceability, add_traceability_event
from services.blockchain_service import BlockchainService

traceability_bp = Blueprint("traceability", __name__)
blockchain = BlockchainService()


@traceability_bp.get("/<shipment_id>")
def trace(shipment_id):
    return jsonify(success=True, data=get_traceability(shipment_id))


@traceability_bp.post("")
def add_event():
    payload = request.get_json(silent=True) or {}

    result = add_traceability_event(payload)

    if not result["success"]:
        return jsonify(result), 400

    blockchain_result = blockchain.record_traceability_event(
        result["data"]
    )

    result["blockchain"] = blockchain_result

    return jsonify(result), 201