import { useEffect, useMemo, useState } from "react";
import {
  getRegistrations,
  updateRegistrationStatus,
} from "../services/registrations";
import RegistrationList from "../components/RegistrationList";
import styles from "./RegistrationsPage.module.css";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import { formatEventDate } from "../utils/formatDate";
import { getAvailabilityStatus } from "../utils/availability";
import { getAvailableSpots } from "../utils/eventCapacity";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Hent alle tilmeldinger én gang ved mount
  useEffect(() => {
    getRegistrations()
      .then(setRegistrations)
      .catch(() => setError("Kunne ikke hente tilmeldinger. Prøv igen senere."))
      .finally(() => setIsLoading(false));
  }, []);

  // Marker en tilmelding som bekræftet, både i databasen og i lokal state
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

  // Tæller det reelle (ufiltrerede) antal tilmeldte pr. event, så en søgning
  // ikke ved et uheld kan gøre et udsolgt event til at se ledigt ud
  const totalRegisteredByEvent = useMemo(() => {
    const counts = new Map();
    registrations.forEach((registration) => {
      const eventId = registration.eventId;
      counts.set(eventId, (counts.get(eventId) ?? 0) + 1);
    });
    return counts;
  }, [registrations]);

  // Filtrér tilmeldinger ud fra søgefeltet (navn, email eller eventtitel)
  const filteredRegistrations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return registrations;

    return registrations.filter((registration) => {
      const eventTitle = registration.events?.title ?? "";
      return (
        registration.name.toLowerCase().includes(term) ||
        registration.email.toLowerCase().includes(term) ||
        eventTitle.toLowerCase().includes(term)
      );
    });
  }, [registrations, searchTerm]);

  // Gruppér de (evt. filtrerede) tilmeldinger pr. event, sorteret efter dato
  const groupedByEvent = useMemo(() => {
    const groups = new Map();

    filteredRegistrations.forEach((registration) => {
      const eventId = registration.eventId;
      if (!groups.has(eventId)) {
        groups.set(eventId, {
          event: registration.events,
          registrations: [],
        });
      }
      groups.get(eventId).registrations.push(registration);
    });

    return Array.from(groups.values()).sort(
      (a, b) => new Date(a.event?.date) - new Date(b.event?.date),
    );
  }, [filteredRegistrations]);

  return (
    <>
      <header className={styles.adminHeader}>
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>
          {registrations.length} tilmeldinger på {groupedByEvent.length} events
        </p>
      </header>
      <main className={styles.main}>
        {/* Søgefelt i egen "kort"-boks, så den visuelt matcher event-listen nedenunder */}
        <div className={styles.searchWrapper}>
          <label htmlFor="registration-search" className={styles.searchLabel}>
            Søg
          </label>
          <input
            id="registration-search"
            type="search"
            className={styles.searchInput}
            placeholder="Søg navn, email eller event"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading && <LoadingMessage>Indlæser tilmeldinger...</LoadingMessage>}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!isLoading && !error && (
          <div className={styles.groupList}>
            {groupedByEvent.map(({ event, registrations: groupRows }) => {
              const eventId = groupRows[0].eventId;
              const totalRegistered = totalRegisteredByEvent.get(eventId) ?? 0;

              // Kun beregn tilgængelighed, hvis vi rent faktisk kender kapaciteten
              const availability =
                event?.capacity != null
                  ? getAvailabilityStatus(
                      getAvailableSpots(event, totalRegistered),
                      event.capacity,
                    )
                  : null;

              return (
                <div key={eventId} className={styles.group}>
                  <h2 className={styles.groupTitle}>
                    {event?.title ?? "Ukendt event"}
                  </h2>
                  <p className={styles.groupMeta}>
                    <span>{formatEventDate(event?.date)}</span>
                    <span>{event?.venue?.name}</span>
                    <span>{groupRows.length} tilmeldte</span>
                    {availability && (
                      <span className={availability.className}>
                        {availability.label}
                      </span>
                    )}
                  </p>

                  <RegistrationList
                    registrations={groupRows}
                    onConfirm={handleConfirm}
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
