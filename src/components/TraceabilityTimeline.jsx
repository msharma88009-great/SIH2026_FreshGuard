export default function TraceabilityTimeline({ events }) {
  return (
    <div className="timeline">
      {events.map((event) => (
        <div className="timeline-item" key={`${event.stage}-${event.time}`}>
          <span className="timeline-dot" />
          <strong>{event.stage}: {event.title}</strong>
          <span>{event.location} • {event.time}</span>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  )
}
