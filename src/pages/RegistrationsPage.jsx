import { useEffect, useState } from "react";
import {
  getRegistrations,
  updateRegistrationStatus,
} from "../services/registrations";
import RegistrationRow from "../components/RegistrationRow";
import rowStyles from "../components/RegistrationRow.module.css";
import styles from "./RegistrationsPage.module.css";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRegistrations()
      .then((data) => {
        setRegistrations(data);
        setRegistrationCount(data.length);
      })
      .catch(() => setError("Kunne ikke hente tilmeldinger. Prøv igen senere."))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleConfirm(id) {
    try {
      await updateRegistrationStatus(id, "Bekræftet");
      setRegistrations((prev) =>
        prev.map((registration) =>
          registration.id === id
            ? { ...registration, status: "Bekræftet" }
            : registration,
        ),
      );
    } catch (error) {
      console.error("Kunne ikke bekræfte tilmelding:", error);
    }
  }

  return (
    <>
      <header className={styles.adminHeader}>
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrationCount} tilmeldinger i alt</p>
      </header>
      <main>
        {/* Loading-tilstand */}
        {isLoading && <LoadingMessage>Indlæser tilmeldinger...</LoadingMessage>}

        {/* Fejlmeddelelse */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!isLoading && !error && (
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
                onConfirm={handleConfirm}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
