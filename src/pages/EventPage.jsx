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

  useEffect(() => {
    getEventById(eventId)
      .then(setEvent)
      .catch(() => setError("Kunne ikke hente eventet. Prøv igen senere."))
      .finally(() => setIsLoading(false));
  }, [eventId]);

 async function handleSubmit(eventSubmit) {
   eventSubmit.preventDefault();
   setSubmitStatus(null);

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
          submitStatus={submitStatus}
        />
      </main>
    </>
  );
}
