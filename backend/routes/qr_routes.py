from flask import Blueprint,jsonify,request
from services.qr_service import verify_qr_payload
qr_bp=Blueprint("qr",__name__)
@qr_bp.post("/verify")
def verify():
    result=verify_qr_payload((request.get_json(silent=True) or {}).get("code"))
    return jsonify(result),200 if result["success"] else 400
