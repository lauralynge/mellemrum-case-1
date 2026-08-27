export default function EventDetail({ event }) {
  const date = new Date(event.date);

  return (
    <section className="event-detail">
      <img src={event.image} alt="" />

      <div className="event-detail-content">
        <p className="event-category">{event.category}</p>

        <h1>{event.title}</h1>

        <p className="lead">{event.summary}</p>

        <div className="detail-list">
          <p>
            <strong>Dato</strong>
            {date.toLocaleDateString("da-DK", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            kl.{" "}
            {date.toLocaleTimeString("da-DK", {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
