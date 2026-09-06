import { Link } from "react-router";
import styles from "./EventCard.module.css";
import { formatEventDate } from "../utils/formatDate";
import { getAvailableSpots } from "../utils/eventCapacity";

export default function EventCard({ event }) {
  const registrationCount = event.registrations?.[0]?.count ?? 0;
  const isSoldOut = getAvailableSpots(event) <= 0;
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
            <span>{event.venue?.name}</span>
          </div>

          <div className={styles.eventCardBottom}>
            <span className={styles.cardLink}>Læs mere</span>
            <span className={isSoldOut ? styles.soldOut : styles.eventCapacity}>
              {isSoldOut
                ? "Udsolgt"
                : `${registrationCount} / ${event.capacity} pladser`}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
