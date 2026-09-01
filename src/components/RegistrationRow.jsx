import { Check } from "lucide-react";
import styles from "./RegistrationRow.module.css";
import { formatEventDate } from "../utils/formatDate";

export default function RegistrationRow({ registration, onConfirm }) {
  return (
    <div className={styles.registrationRow}>
      <div>
        <strong>{registration.name}</strong>
        <small>{registration.email}</small>
      </div>

      <span>{registration.events.title}</span>

      <span>{formatEventDate(registration.events.date)}</span>

      <div className={styles.statusCell}>
        <span
          className={`${styles.status} ${
            registration.status === "Bekræftet"
              ? styles.statusConfirmed
              : styles.statusNew
          }`}
        >
          {registration.status}
        </span>

        {registration.status === "Ny" && (
          <button
            className={styles.confirmButton}
            onClick={() => onConfirm(registration.id)}
            aria-label="Bekræft tilmelding"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
