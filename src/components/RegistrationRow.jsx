import styles from "./RegistrationRow.module.css";

export default function RegistrationRow({ registration }) {
  return (
    <div className={styles.registrationRow}>
      <div>
        <strong>{registration.name}</strong>
        <small>{registration.email}</small>
      </div>

      <span>{registration.events.title}</span>

      <span>
        {new Date(registration.events.date).toLocaleDateString("da-DK")}
      </span>

      <span className={styles.status}>{registration.status}</span>
    </div>
  );
}
