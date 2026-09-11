from flask import Blueprint,jsonify
from services.sensor_service import get_alerts
alert_bp=Blueprint("alerts",__name__)
@alert_bp.get("")
def alerts(): return jsonify(success=True,data=get_alerts())
