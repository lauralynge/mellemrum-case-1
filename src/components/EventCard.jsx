// EventCard.jsx
import { Link } from "react-router";
import styles from "./EventCard.module.css";
import { formatEventDate } from "../utils/formatDate";

export default function EventCard({ event }) {
  return (
    <article className={styles.eventCard}>
      <img src={event.image} alt="" />

      <div className={styles.eventCardContent}>
        <p className={styles.eventCategory}>{event.category}</p>

        <h3>{event.title}</h3>

        <p>{event.summary}</p>

        <div className={styles.eventMeta}>
          <span>{formatEventDate(event.date)}</span>
          <span>{event.venueName}</span>
        </div>

        <Link className={styles.cardLink} to={`/events/${event.id}`}>
          Læs mere
        </Link>
      </div>
    </article>
  );
}
