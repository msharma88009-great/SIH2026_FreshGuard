import { shipments } from '../data/mockData'

export default function History() {
  const completed = shipments.filter((item) => item.status === 'Completed')

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>History</h2>
          <p>Completed and historical shipment records.</p>
        </div>
      </div>

      <section className="panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Shipment</th><th>Product</th><th>Destination</th><th>Freshness</th><th>Status</th></tr>
            </thead>
            <tbody>
              {completed.map((item) => (
                <tr key={item.id}>
                  <td className="shipment-id">{item.id}</td>
                  <td>{item.product}</td>
                  <td>{item.destination}</td>
                  <td>{item.freshness}%</td>
                  <td><span className="status-pill status-completed">Completed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
