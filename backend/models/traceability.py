from dataclasses import dataclass, field
from typing import Any, Dict


@dataclass
class TraceabilityEvent:
    event_id: str
    shipment_id: str
    stage: str
    actor: str
    location: str
    timestamp: str
    metadata: Dict[str, Any] = field(default_factory=dict)
