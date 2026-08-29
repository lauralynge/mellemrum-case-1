import styles from "./EventGrid.module.css";
import EventCard from "./EventCard";

export default function EventGrid({ events, formatEventDate }) {
  return (
    <section className={styles.eventGrid}>
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
