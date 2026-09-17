import { useEffect, useState } from 'react'
import ShipmentCard from './ShipmentCard'
import ShipmentDetails from './ShipmentDetails'
import { createShipment, getShipments } from '../services/api'

const emptyForm = { shipment_id: '', product: '', origin: '', destination: '', status: 'Active', freshness_score: '100' }

export default function Shipments() {
  const [shipments, setShipments] = useState([])
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function loadShipments() {
    try { const result = await getShipments(); setShipments(result.data || []) }
    catch (e) { setError(e.message || 'Unable to load shipments.') }
    finally { setLoading(false) }
  }

  useEffect(() => { loadShipments() }, [])

  async function submit(event) {
    event.preventDefault(); setSaving(true); setError('')
    try {
      const result = await createShipment({ ...form, freshness_score: Number(form.freshness_score || 100) })
      if (!result.success) throw new Error(result.error || 'Unable to create shipment.')
      setForm(emptyForm); setShowForm(false); await loadShipments()
    } catch (e) { setError(e.message || 'Unable to create shipment.') }
    finally { setSaving(false) }
  }

  if (selectedShipment) return <ShipmentDetails shipment={selectedShipment} onBack={() => setSelectedShipment(null)} />

  return <div>
    <div className="page-title-row"><div><h2>Shipments</h2><p>Monitor all active and completed cold-chain shipments.</p></div><button className="primary-button" onClick={() => { setShowForm(true); setError('') }}>＋ Add New Shipment</button></div>
    {error && <div className="page-error connection-error"><strong>Backend connection issue</strong><span>{error}</span><small>Start the Fresh Guard Flask backend on port 5000, then refresh this page.</small></div>}
    {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}><form className="shipment-form modal-card" onSubmit={submit} onClick={(e) => e.stopPropagation()}><div className="modal-head"><div><h3>Add New Shipment</h3><p>Create a shipment record in the backend database.</p></div><button type="button" className="modal-close" onClick={() => setShowForm(false)}>×</button></div><div className="form-row"><label>Shipment ID<input value={form.shipment_id} onChange={(e) => setForm({...form, shipment_id:e.target.value})} placeholder="Auto-generated if blank" /></label><label>Product<input required value={form.product} onChange={(e) => setForm({...form, product:e.target.value})} placeholder="e.g. Tomatoes" /></label></div><div className="form-row"><label>Origin<input required value={form.origin} onChange={(e) => setForm({...form, origin:e.target.value})} placeholder="Farm / city" /></label><label>Destination<input required value={form.destination} onChange={(e) => setForm({...form, destination:e.target.value})} placeholder="Hub / city" /></label></div><div className="form-row"><label>Status<select value={form.status} onChange={(e) => setForm({...form, status:e.target.value})}><option>Active</option><option>In Transit</option><option>Delayed</option><option>Delivered</option></select></label><label>Freshness Score (%)<input type="number" min="0" max="100" value={form.freshness_score} onChange={(e) => setForm({...form, freshness_score:e.target.value})} /></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Create Shipment'}</button></div></form></div>}
    {loading ? <div className="panel"><p>Loading shipments...</p></div> : shipments.length === 0 ? <div className="empty-panel"><div className="empty-icon">＋</div><h3>No shipments yet</h3><p>Create your first shipment to start farm-to-fork tracking.</p><button className="primary-button" onClick={() => setShowForm(true)}>Add New Shipment</button></div> : <div className="shipment-grid">{shipments.map((shipment) => <ShipmentCard key={shipment.shipment_id} shipment={shipment} onClick={() => setSelectedShipment(shipment)} />)}</div>}
  </div>
}
