import { useMemo, useState } from 'react'

function formatTime(value) {
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function SensorChart({ title = 'Temperature', records = [], values = [] }) {
  const [showFlow, setShowFlow] = useState(false)
  const pointsData = useMemo(() => {
    if (records.length) return records.slice(-12).map((item) => ({ value: Number(item[title === 'Humidity' ? 'humidity' : title === 'Gas Level' ? 'gas_level' : 'temperature'] ?? 0), timestamp: item.timestamp }))
    return values.map((value, index) => ({ value: Number(value), timestamp: null, index }))
  }, [records, values, title])
  const valuesOnly = pointsData.map((p) => p.value)
  const hasData = pointsData.length > 0
  const min = hasData ? Math.min(...valuesOnly) : 0
  const max = hasData ? Math.max(...valuesOnly) : 1
  const range = max - min || 1
  const points = pointsData.map((p, index) => `${pointsData.length === 1 ? 50 : (index / (pointsData.length - 1)) * 100},${92 - ((p.value - min) / range) * 78}`).join(' ')
  const unit = title === 'Humidity' ? '%' : title === 'Gas Level' ? 'raw' : '°C'

  return <>
    <section className="panel chart-panel">
      <div className="section-heading"><div><h3>{title} Trend</h3><span className="chart-subtitle">X-axis: time • Y-axis: {unit}</span></div><button className="chart-flow-button" onClick={() => setShowFlow(true)}>View data flow</button></div>
      <div className="chart-shell">
        {!hasData ? <div className="chart-empty">Waiting for sensor telemetry…</div> : <><div className="chart-axis-y"><span>{max.toFixed(1)}</span><span>{((max + min) / 2).toFixed(1)}</span><span>{min.toFixed(1)}</span></div><div className="chart"><div className="chart-grid"/><div className="chart-line"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke"/></svg></div></div><div className="chart-axis-x">{pointsData.slice(-4).map((p, i) => <span key={i}>{p.timestamp ? formatTime(p.timestamp) : `T${i + 1}`}</span>)}</div></>}
      </div>
      <div className="chart-legend"><span><i className="legend-dot"/>Sensor telemetry</span><span>{hasData ? `Current: ${valuesOnly.at(-1)} ${unit}` : 'No live reading'}</span></div>
    </section>
    {showFlow && <div className="flow-modal-backdrop" onClick={() => setShowFlow(false)}><div className="flow-modal" onClick={(e) => e.stopPropagation()}><div className="flow-modal-head"><div><h3>Fresh Guard data flow</h3><p>{title} telemetry path</p></div><button onClick={() => setShowFlow(false)}>×</button></div><div className="flow-diagram"><div className="flow-node">Sensors<span>Temp • Humidity • Gas • Vibration • Reed</span></div><b>→</b><div className="flow-node">ESP32<span>Timestamp + packet</span></div><div className="flow-branch"><div><b>Wi-Fi available</b><div className="flow-node">Backend API<span>Validate + hash</span></div></div><div className="offline-path"><b>Wi-Fi unavailable</b><div className="flow-node">MicroSD<span>Local CSV/JSON buffer</span></div><div className="flow-arrow">↘ reconnect → sync</div></div></div><b>→</b><div className="flow-node">MongoDB<span>Persisted telemetry</span></div><b>→</b><div className="flow-node">Fresh Guard UI<span>Graphs + alerts + history</span></div></div></div></div>}
  </>
}
