import styles from "./EventDetail.module.css";
import { formatEventDate, formatEventTime } from "../utils/formatDate";

export default function EventDetail({ event }) {
  return (
    <section className={styles.eventDetail}>
      <img src={event.image} alt="" className={styles.image} />

      <div className={styles.content}>
        <p className={styles.category}>{event.category}</p>

        <h1 className={styles.title}>{event.title}</h1>

        {/* lead er global */}
        <p className="lead">{event.summary}</p>

        <div className={styles.detailList}>
          <p>
            <strong>Dato</strong>
            {formatEventDate(event.date)} kl. {formatEventTime(event.date)}
          </p>

          <p>
            <strong>Sted</strong>
            <span>
              {event.venueName}
              <br />
              {event.venueAddress}, {event.venuePostalCode} {event.venueCity}
              {event.venueWebsite && (
                <>
                  <br />
                  <a href={event.venueWebsite}>Besøg venue</a>
                </>
              )}
            </span>
          </p>

          <p>
            <strong>Pris</strong>
            {event.price === 0 ? "Gratis" : `${event.price} kr.`}
          </p>
        </div>

        <p>{event.description}</p>
      </div>
    </section>
  );
}
