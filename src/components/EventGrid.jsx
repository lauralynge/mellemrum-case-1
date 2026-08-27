import EventCard from "./EventCard";

export default function EventGrid({ events, formatEventDate }) {
  return (
    <section className="event-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          formatEventDate={formatEventDate}
        />
      ))}
    </section>
  );
}
