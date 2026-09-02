import { Link } from "react-router";
import styles from "./EventCard.module.css";
import { formatEventDate } from "../utils/formatDate";

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className={styles.cardWrapper}>
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

          <span className={styles.cardLink}>Læs mere</span>
        </div>
      </article>
    </Link>
  );
}
