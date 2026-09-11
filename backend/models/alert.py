from dataclasses import dataclass
@dataclass
class Alert:
    alert_id:str
    shipment_id:str
    alert_type:str
    severity:str
    message:str
    timestamp:str
    acknowledged:bool=False
