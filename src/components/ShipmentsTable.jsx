import { shipments } from '../data/mockData'

export default function ShipmentsTable({ onSelect }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h3>Active Shipments</h3>
        <span>{shipments.filter((item) => item.status !== 'Completed').length} in operation</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Shipment</th>
              <th>Product</th>
              <th>Route</th>
              <th>Temp</th>
              <th>Freshness</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((item) => (
              <tr key={item.id} onClick={() => onSelect?.(item)} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
                <td className="shipment-id">{item.id}</td>
                <td>{item.product}</td>
                <td>{item.origin} → {item.destination}</td>
                <td>{item.temperature}°C</td>
                <td>{item.freshness}%</td>
                <td>
                  <span className={`status-pill ${
                    item.status === 'Active' ? 'status-active' :
                    item.status === 'Delayed' ? 'status-delayed' : 'status-completed'
                  }`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
