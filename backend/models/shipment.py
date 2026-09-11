from dataclasses import dataclass,field
from typing import Any,Dict
@dataclass
class Shipment:
    shipment_id:str
    product:str
    origin:str
    destination:str
    status:str="Active"
    freshness_score:float=100.0
    metadata:Dict[str,Any]=field(default_factory=dict)
