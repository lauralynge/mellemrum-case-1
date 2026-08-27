import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import EventDetail from "../components/EventDetail";
import RegistrationForm from "../components/RegistrationForm";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getEvent() {
      const response = await fetch(`${SUPABASE_URL}/events?id=eq.${eventId}`, {
        headers,
      });
      const data = await response.json();
      setEvent(data[0]);
    }

    getEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();
    console.log({ name, email, event: event.title });
  }

  if (!event) {
    return null;
  }

  return (
    <>
      <main className="event-page">
        <Link className="back-link" to="/">
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
