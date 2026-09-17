import { useEffect, useState } from 'react'
import { getShipments } from '../services/api'

export default function History() {
  const [shipments, setShipments] = useState([])
  useEffect(() => { getShipments().then((r) => setShipments(r.data || [])).catch(() => setShipments([])) }, [])
  const completed = shipments.filter((item) => ['Completed', 'Delivered'].includes(item.status))
  return <div><div className="page-title-row"><div><h2>History</h2><p>Completed shipment records from the backend database.</p></div></div><section className="panel"><div className="section-heading"><h3>Historical shipments</h3><span>{completed.length} records</span></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Shipment</th><th>Product</th><th>Destination</th><th>Freshness</th><th>Status</th></tr></thead><tbody>{completed.length ? completed.map((item) => <tr key={item.shipment_id}><td className="shipment-id">{item.shipment_id}</td><td>{item.product}</td><td>{item.destination}</td><td>{item.freshness_score ?? '—'}{item.freshness_score != null ? '%' : ''}</td><td><span className="status-pill status-completed">{item.status}</span></td></tr>) : <tr><td colSpan="5" className="table-empty">No completed shipment records yet.</td></tr>}</tbody></table></div></section></div>
}
