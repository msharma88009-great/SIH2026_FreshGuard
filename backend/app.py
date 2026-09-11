from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.shipment_routes import shipment_bp
from routes.sensor_routes import sensor_bp
from routes.alert_routes import alert_bp
from routes.traceability_routes import traceability_bp
from routes.qr_routes import qr_bp
from routes.hash_routes import hash_bp

def create_app():
    app=Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    app.register_blueprint(shipment_bp,url_prefix="/api/shipments")
    app.register_blueprint(sensor_bp,url_prefix="/api/sensors")
    app.register_blueprint(alert_bp,url_prefix="/api/alerts")
    app.register_blueprint(traceability_bp,url_prefix="/api/traceability")
    app.register_blueprint(qr_bp,url_prefix="/api/qr")
    app.register_blueprint(hash_bp,url_prefix="/api/hash")
    @app.get("/api/health")
    def health(): return jsonify(success=True,service="Fresh Guard Flask Backend",status="healthy")
    @app.get("/")
    def home(): return jsonify(success=True,message="Fresh Guard API is running")
    return app
app=create_app()
if __name__=="__main__": app.run(host=Config.HOST,port=Config.PORT,debug=Config.DEBUG)
