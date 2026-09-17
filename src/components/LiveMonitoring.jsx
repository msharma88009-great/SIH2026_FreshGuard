import { useEffect, useMemo, useState } from 'react'
import SensorCard from './SensorCard'
import SensorChart from './SensorChart'
import { getHealth, getSensors } from '../services/api'

export default function LiveMonitoring() {
  const [sensors, setSensors] = useState([])
  const [connected, setConnected] = useState(false)
  const [lastSync, setLastSync] = useState(null)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try { const [data] = await Promise.all([getSensors(), getHealth()]); if (!alive) return; setSensors(data.data || []); setConnected(true); setLastSync(new Date()) }
      catch { if (alive) setConnected(false) }
    }
    load(); const timer = setInterval(load, 5000); return () => { alive = false; clearInterval(timer) }
  }, [])

  const latest = sensors.at(-1)
  const status = (value, warning, critical) => value == null ? 'Waiting' : value >= critical ? 'Critical' : value >= warning ? 'Warning' : 'Good'
  const series = useMemo(() => sensors.slice(-12), [sensors])

  return <div>
    <div className="page-title-row"><div><h2>Live Monitoring</h2><p>Real-time telemetry with offline-first buffering.</p></div><span className={`status-pill ${connected ? 'status-active' : 'status-waiting'}`}>● {connected ? 'Telemetry connected' : 'Waiting for node/network'}</span></div>
    <div className="telemetry-status-bar"><span><i className={connected ? 'online-dot' : 'offline-dot'} /> {connected ? 'Backend reachable' : 'Backend unavailable'}</span><span>{latest?.timestamp ? `Last reading ${new Date(latest.timestamp).toLocaleTimeString()}` : 'No readings yet'}</span><span>SD buffer: ready</span></div>
    <div className="sensor-grid">
      <SensorCard name="Temperature" value={latest?.temperature ?? '—'} unit={latest ? '°C' : ''} status={status(latest?.temperature, 6, 8)} icon="🌡" />
      <SensorCard name="Humidity" value={latest?.humidity ?? '—'} unit={latest ? '%' : ''} status={status(latest?.humidity, 75, 85)} icon="💧" />
      <SensorCard name="Gas" value={latest?.gas_level ?? '—'} unit={latest ? ' raw' : ''} status={status(latest?.gas_level, 50, 100)} icon="◌" />
      <SensorCard name="Vibration" value={latest ? (latest.vibration ? 'Detected' : 'Normal') : '—'} unit="" status={latest ? (latest.vibration ? 'Warning' : 'Good') : 'Waiting'} icon="📳" />
      <SensorCard name="Reed / Tamper" value={latest ? (latest.reed_open ? 'Open' : 'Closed') : '—'} unit="" status={latest ? (latest.reed_open ? 'Critical' : 'Good') : 'Waiting'} icon="▣" />
    </div>
    <div className="dashboard-section dashboard-grid"><SensorChart title="Temperature" records={series}/><SensorChart title="Humidity" records={series}/></div>
    <div className="dashboard-section dashboard-grid"><SensorChart title="Gas Level" records={series}/><section className="panel"><div className="section-heading"><h3>Connection timeline</h3><span>{lastSync ? `Checked ${lastSync.toLocaleTimeString()}` : 'Not checked'}</span></div><div className="connection-timeline"><div><strong>1</strong><span>ESP32 captures sensor packet</span></div><div><strong>2</strong><span>Wi-Fi available → API upload</span></div><div><strong>3</strong><span>Wi-Fi unavailable → MicroSD buffer</span></div><div><strong>4</strong><span>Reconnect → buffered records sync</span></div></div></section></div>
  </div>
}
