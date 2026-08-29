import { useEffect, useState } from "react";
import RegistrationRow from "../components/RegistrationRow";
import rowStyles from "../components/RegistrationRow.module.css";
import styles from "./RegistrationsPage.module.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    async function getRegistrations() {
      const response = await fetch(
        `${SUPABASE_URL}/registrations?order=createdAt.desc`,
        { headers },
      );
      const data = await response.json();
      setRegistrations(data);
      setRegistrationCount(data.length);
    }

    getRegistrations();
  }, []);

  return (
    <>
      <header className={styles.adminHeader}>
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrationCount} tilmeldinger i alt</p>
      </header>
      <main>
        <div className={styles.registrationList}>
          <div
            className={`${rowStyles.registrationRow} ${styles.registrationLabels}`}
          >
            <span>Navn</span>
            <span>Event</span>
            <span>Dato</span>
            <span>Status</span>
          </div>
          {registrations.map((registration) => (
            <RegistrationRow
              key={registration.id}
              registration={registration}
            />
          ))}
        </div>
      </main>
    </>
  );
}
