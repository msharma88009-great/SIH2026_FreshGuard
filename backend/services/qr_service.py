from services.sensor_service import get_shipment
def verify_qr_payload(code):
    if not code: return {"success":False,"error":"QR code value is required"}
    shipment=get_shipment(str(code).strip())
    if not shipment: return {"success":False,"verified":False,"error":"Shipment/product record not found"}
    return {"success":True,"verified":True,"data":shipment}