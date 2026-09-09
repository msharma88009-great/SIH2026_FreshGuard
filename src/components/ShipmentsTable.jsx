function ShipmentsTable() {
  const shipments = [
    {
      id: "SHIP001",
      product: "Fresh Tomatoes",
      route: "Nashik → Mumbai",
      status: "In Transit",
      temp: "6.4°C",
      freshness: 92,
    },
    {
      id: "SHIP002",
      product: "Green Vegetables",
      route: "Pune → Delhi",
      status: "Alert",
      temp: "8.7°C",
      freshness: 76,
    },
    {
      id: "SHIP003",
      product: "Mangoes",
      route: "Ratnagiri → Pune",
      status: "In Transit",
      temp: "5.9°C",
      freshness: 95,
    },
    {
      id: "SHIP004",
      product: "Dairy Products",
      route: "Kolhapur → Mumbai",
      status: "Delivered",
      temp: "4.2°C",
      freshness: 98,
    },
  ];

  return (
    <div className="shipments-table-card">
      <div className="card-heading">
        <div>
          <span className="section-label">LOGISTICS</span>
          <h2>Active Shipments</h2>
        </div>

        <button className="view-all-button">
          View all
        </button>
      </div>

      <div className="table-wrapper">
        <table className="shipments-table">
          <thead>
            <tr>
              <th>Shipment</th>
              <th>Route</th>
              <th>Status</th>
              <th>Temp.</th>
              <th>Freshness</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>
                  <div className="shipment-name">
                    <strong>{shipment.id}</strong>
                    <span>{shipment.product}</span>
                  </div>
                </td>

                <td>{shipment.route}</td>

                <td>
                  <span
                    className={`shipment-status ${
                      shipment.status
                        .toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>

                <td>{shipment.temp}</td>

                <td>
                  <div className="freshness-mini">
                    <div className="freshness-bar">
                      <span
                        style={{
                          width: `${shipment.freshness}%`,
                        }}
                      ></span>
                    </div>

                    <strong>{shipment.freshness}%</strong>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShipmentsTable;