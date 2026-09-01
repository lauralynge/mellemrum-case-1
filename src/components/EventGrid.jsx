import styles from "./EventGrid.module.css";
import EventCard from "./EventCard";

export default function EventGrid({ events }) {
  return (
    <section className={styles.eventGrid}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </section>
  );
}
