import { useEffect, useState } from 'react'
import MapCard from './MapCard'
import { getShipments } from '../services/api'

export default function MapTracking() {
  const [shipments, setShipments] = useState([])
  useEffect(() => { getShipments().then((r) => setShipments(r.data || [])).catch(() => setShipments([])) }, [])
  const active = shipments.filter((item) => !['Completed', 'Delivered'].includes(item.status))
  return <div><div className="page-title-row"><div><h2>Map Tracking</h2><p>Shipment route view. GPS becomes live when the node sends location data.</p></div></div><div className="map-layout"><MapCard shipment={active[0]} /><section className="panel"><div className="section-heading"><h3>Tracked shipments</h3><span>{active.length} active</span></div><div className="location-list">{active.length ? active.map((item) => <div className="location-item" key={item.shipment_id}><strong>{item.shipment_id} • {item.product}</strong><span>{item.origin} → {item.destination}</span><span>Status: {item.status}</span></div>) : <div className="empty-state">No active shipments from backend.</div>}</div></section></div></div>
}
