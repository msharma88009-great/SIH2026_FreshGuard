from dataclasses import dataclass,field
from typing import Dict
@dataclass
class SensorReading:
    shipment_id:str
    temperature:float
    humidity:float
    gas_level:float
    timestamp:str
    location:Dict[str,float]=field(default_factory=dict)
