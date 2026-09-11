from flask import Blueprint,jsonify,request
from services.hash_service import verify_hash
hash_bp=Blueprint("hash",__name__)
@hash_bp.post("/verify")
def verify():
    result=verify_hash(request.get_json(silent=True) or {})
    return jsonify(result),200 if result["success"] else 400
