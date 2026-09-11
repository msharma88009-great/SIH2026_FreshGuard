export default function SensorChart({
  title = 'Temperature',
  values = [4, 4.5, 4.1, 4.8, 4.2, 4.4, 4.1],
}) {
  const min = Math.min(...values) - 0.5
  const max = Math.max(...values) + 0.5

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 100 - ((value - min) / (max - min)) * 100
      return `${x},${y}`
    })
    .join(' ')

  const unit = title === 'Humidity' ? '%' : title === 'Gas Level' ? ' ppm' : '°C'

  return (
    <section className="panel chart-panel">
      <div className="section-heading">
        <h3>{title} Trend</h3>
        <span>Last 7 readings</span>
      </div>

      <div className="chart">
        <div className="chart-grid" />

        <div className="chart-line">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points={points}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <div className="chart-legend">
        <span>
          <i className="legend-dot" />
          Sensor telemetry
        </span>

        <span>
          Current: {values[values.length - 1]}{unit}
        </span>
      </div>
    </section>
  )
}