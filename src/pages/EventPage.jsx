import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EventDetail from "../components/EventDetail";
import RegistrationForm from "../components/RegistrationForm";
import ErrorMessage from "../components/ErrorMessage";
import styles from "./EventPage.module.css";
import { getEventById } from "../services/events";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventById(eventId)
      .then(setEvent)
      .catch(() => setError("Kunne ikke hente eventet. Prøv igen senere."));
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
    console.log({ name, email, event: event.title });
  }

  if (error) {
    return (
      <main className={styles.eventPage}>
        <ErrorMessage>{error}</ErrorMessage>
      </main>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <>
      <main className={styles.eventPage}>
        <Link className={styles.backLink} to="/">
          ← Alle events
        </Link>

        <EventDetail event={event} />

        <RegistrationForm
          name={name}
          email={email}
          setName={setName}
          setEmail={setEmail}
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}
