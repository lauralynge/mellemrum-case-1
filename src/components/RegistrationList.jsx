import RegistrationRow from "./RegistrationRow";
import rowStyles from "./RegistrationRow.module.css";
import styles from "./RegistrationList.module.css";

export default function RegistrationList({ registrations, onConfirm }) {
  return (
    <div className={styles.registrationList}>
      <div
        className={`${rowStyles.registrationRow} ${styles.registrationLabels}`}
      >
        <span>Navn</span>
        <span>Email</span>
        <span>Status</span>
      </div>
      {registrations.map((registration) => (
        <RegistrationRow
          key={registration.id}
          registration={registration}
          onConfirm={onConfirm}
        />
      ))}
    </div>
  );
}
