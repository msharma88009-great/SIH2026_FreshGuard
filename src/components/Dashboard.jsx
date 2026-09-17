import { useEffect, useState } from 'react'
import StatCard from './StatCard'
import SensorCard from './SensorCard'
import FreshnessScore from './FreshnessScore'
import SensorChart from './SensorChart'
import Alerts from './Alerts'
import ShipmentsTable from './ShipmentsTable'
import { getShipments, getSensors, getAlerts } from '../services/api'

export default function Dashboard({ onNavigate }) {
  const [data, setData] = useState({ shipments: [], sensors: [], alerts: [] })
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const [shipments, sensors, alerts] = await Promise.all([getShipments(), getSensors(), getAlerts()])
        if (!alive) return
        setData({ shipments: shipments.data || [], sensors: sensors.data || [], alerts: alerts.data || [] })
        setConnected(true)
      } catch { if (alive) setConnected(false) } finally { if (alive) setLoading(false) }
    }
    load(); const timer = setInterval(load, 10000); return () => { alive = false; clearInterval(timer) }
  }, [])

  const { shipments, sensors, alerts } = data
  const latest = sensors.at(-1)
  const has = Boolean(latest)
  const activeShipments = shipments.filter((s) => !['Delivered', 'Completed'].includes(s.status)).length
  const temp = latest?.temperature
  const humidity = latest?.humidity
  const gas = latest?.gas_level
  const vibration = latest?.vibration
  const reed = latest?.reed_open
  const freshness = latest?.freshness_score
  const severity = (v, warn, critical) => !has ? 'Waiting' : v >= critical ? 'Critical' : v >= warn ? 'Warning' : 'Good'

  return <div>
    <div className="page-title-row"><div><h2>Operations Dashboard</h2><p>Cold-chain visibility from field node to traceability record.</p></div><div className="page-actions"><span className={`status-pill ${connected ? 'status-active' : 'status-waiting'}`}>● {connected ? 'Platform connected' : 'Awaiting connection'}</span><button className="primary-button" onClick={() => onNavigate?.('Shipments')}>View Shipments</button></div></div>
    <div className="stats-grid">
      <StatCard label="Total Shipments" value={loading ? '…' : shipments.length} change="Shipment records" icon="▣" />
      <StatCard label="Active Shipments" value={loading ? '…' : activeShipments} change="Current status" icon="◉" />
      <StatCard label="Alerts" value={loading ? '…' : String(alerts.length).padStart(2, '0')} change="Sensor events" icon="⚠" />
      <StatCard label="Latest Reading" value={has ? new Date(latest.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'} change={has ? 'Telemetry timestamp' : 'No telemetry yet'} icon="◷" />
    </div>
    <div className="dashboard-section"><div className="section-heading"><div><h3>Sensor overview</h3><span>Temperature, humidity, gas, vibration and enclosure status</span></div><span>{has ? 'Latest packet received' : 'Waiting for first packet'}</span></div>
      <div className="sensor-grid">
        <SensorCard name="Temperature" value={has ? Number(temp).toFixed(1) : '—'} unit={has ? '°C' : ''} status={severity(temp, 6, 8)} icon="🌡" />
        <SensorCard name="Humidity" value={has ? Number(humidity).toFixed(1) : '—'} unit={has ? '%' : ''} status={severity(humidity, 75, 85)} icon="💧" />
        <SensorCard name="Gas" value={has ? Number(gas).toFixed(0) : '—'} unit={has ? ' raw' : ''} status={severity(gas, 50, 100)} icon="◌" />
        <SensorCard name="Vibration" value={has ? (vibration ? 'Detected' : 'Normal') : '—'} unit="" status={!has ? 'Waiting' : vibration ? 'Warning' : 'Good'} icon="📳" />
        <SensorCard name="Reed / Tamper" value={has ? (reed ? 'Open' : 'Closed') : '—'} unit="" status={!has ? 'Waiting' : reed ? 'Critical' : 'Good'} icon="▣" />
      </div>
    </div>
    <div className="dashboard-section dashboard-grid"><SensorChart title="Temperature" records={sensors.slice(-12)} /><FreshnessScore score={freshness == null ? null : Number(freshness)} /></div>
    <div className="dashboard-section dashboard-grid"><Alerts /><SensorChart title="Humidity" records={sensors.slice(-12)} /></div>
    <div className="dashboard-section dashboard-grid"><SensorChart title="Gas Level" records={sensors.slice(-12)} /><section className="panel"><div className="section-heading"><h3>Data pipeline</h3><span>Offline-first</span></div><div className="connection-timeline"><div><strong>01</strong><span>ESP32 captures telemetry</span></div><div><strong>02</strong><span>Wi-Fi → backend upload</span></div><div><strong>03</strong><span>No Wi-Fi → MicroSD buffer</span></div><div><strong>04</strong><span>Reconnect → automatic sync</span></div></div></section></div>
    <div className="dashboard-section"><ShipmentsTable onSelect={() => onNavigate?.('Shipments')} /></div>
  </div>
}
