import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EventDetail from "../components/EventDetail";
import RegistrationForm from "../components/RegistrationForm";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import styles from "./EventPage.module.css";
import { getEventById } from "../services/events";
import {
  createRegistration,
  checkExistingRegistration,
} from "../services/registrations";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    getEventById(eventId)
      .then(setEvent)
      .catch(() => setError("Kunne ikke hente eventet. Prøv igen senere."))
      .finally(() => setIsLoading(false));
  }, [eventId]);

  function handleNameChange(value) {
    setName(value);
    if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  }

  function handleEmailChange(value) {
    setEmail(value);
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    }
  }

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
    setSubmitStatus(null);

    const errors = {};
    if (!name.trim()) {
      errors.name = "Udfyld venligst";
    }
    if (!email.trim()) {
      errors.email = "Udfyld venligst";
    } else if (!email.includes("@")) {
      errors.email = "Ugyldig e-mail";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      const alreadyRegistered = await checkExistingRegistration(
        email,
        Number(eventId),
      );

      if (alreadyRegistered) {
        setSubmitStatus("duplicate");
        return;
      }

      await createRegistration({
        name,
        email,
        eventId: Number(eventId),
      });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Tilmelding fejlede:", error);
      setSubmitStatus("error");
    }
  }

  if (isLoading) {
    return (
      <main className={styles.eventPage}>
        <LoadingMessage>Indlæser event...</LoadingMessage>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.eventPage}>
        <div className={styles.errorState}>
          <ErrorMessage>{error}</ErrorMessage>
          <Link className={styles.backLink} to="/">
            ← Alle events
          </Link>
        </div>
      </main>
    );
  }

  if (!event) {
    return null;
  }

  /* Format event date and time */
  const eventDate = new Date(event.date);
  const formattedEventDate = eventDate.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const formattedEventTime = eventDate.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
          setName={handleNameChange}
          setEmail={handleEmailChange}
          onSubmit={handleSubmit}
          submitStatus={submitStatus}
          eventTitle={event.title}
          eventDateFormatted={`${formattedEventDate} kl. ${formattedEventTime}`}
          fieldErrors={fieldErrors}
        />
      </main>
    </>
  );
}
