from flask import Blueprint,jsonify,request
from services.sensor_service import get_shipments,get_shipment,create_shipment
shipment_bp=Blueprint("shipments",__name__)
@shipment_bp.get("")
def list_shipments(): return jsonify(success=True,data=get_shipments())
@shipment_bp.get("/<shipment_id>")
def detail(shipment_id):
    x=get_shipment(shipment_id)
    return (jsonify(success=True,data=x),200) if x else (jsonify(success=False,error="Shipment not found"),404)
@shipment_bp.post("")
def add():
    result=create_shipment(request.get_json(silent=True) or {})
    return jsonify(result),201 if result["success"] else 400
