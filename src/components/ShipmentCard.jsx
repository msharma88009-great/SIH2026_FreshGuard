function ShipmentCard({ shipment, onClick }) {
  if (!shipment) {
    return null;
  }

  const statusClass = shipment.status
    ? shipment.status.toLowerCase().replace(/\s+/g, "-")
    : "unknown";

  return (
    <div
      className="shipment-card"
      onClick={onClick}
    >
      <div className="shipment-card-header">
        <div>
          <span className="shipment-id">
            {shipment.id}
          </span>

          <h3>{shipment.product}</h3>
        </div>

        <span
          className={`shipment-status ${statusClass}`}
        >
          {shipment.status}
        </span>
      </div>

      <div className="shipment-route">
        <div className="route-point">
          <span className="route-dot origin"></span>
          <div>
            <small>FROM</small>
            <strong>{shipment.source}</strong>
          </div>
        </div>

        <div className="route-line"></div>

        <div className="route-point">
          <span className="route-dot destination"></span>
          <div>
            <small>TO</small>
            <strong>{shipment.destination}</strong>
          </div>
        </div>
      </div>

      <div className="shipment-card-footer">
        <div>
          <small>Temperature</small>
          <strong>
            {shipment.temperature || "6.4°C"}
          </strong>
        </div>

        <div>
          <small>Freshness</small>
          <strong>
            {shipment.freshness || 92}%
          </strong>
        </div>

        <button
          onClick={(event) => {
            event.stopPropagation();
            onClick?.();
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

export default ShipmentCard;