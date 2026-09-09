function SensorChart({
  title,
  unit,
  value,
  type = "temperature",
}) {
  const chartData = {
    temperature: [42, 48, 44, 53, 49, 57, 51, 60, 56, 63, 59, 66],
    humidity: [58, 61, 57, 64, 62, 68, 65, 70, 67, 73, 71, 75],
    gas: [35, 40, 37, 44, 42, 49, 46, 52, 48, 56, 53, 58],
  };

  const points = chartData[type] || chartData.temperature;

  return (
    <div className={`chart-card ${type}-chart-card`}>
      <div className="chart-title">
        <div>
          <strong>
            {title} ({unit})
          </strong>
          <span>Live sensor readings</span>
        </div>

        <div className="chart-current-value">
          {value}
          <small>{unit}</small>
        </div>
      </div>

      <div className="sensor-chart">
        <div className="chart-grid-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`chart-line chart-line-${type}`}>
          {points.map((point, index) => (
            <span
              key={index}
              className="chart-point"
              style={{
                left: `${index * 9}%`,
                bottom: `${point}%`,
              }}
            ></span>
          ))}
        </div>

        <div className="chart-labels">
          <span>10:00</span>
          <span>10:10</span>
          <span>10:20</span>
          <span>10:30</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
}

export default SensorChart;