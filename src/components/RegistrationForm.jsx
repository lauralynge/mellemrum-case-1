import { Link } from "react-router";
import styles from "./RegistrationForm.module.css";
import ErrorMessage from "./ErrorMessage";

export default function RegistrationForm({
  name,
  email,
  setName,
  setEmail,
  onSubmit,
  submitStatus,
  eventTitle,
  eventDateFormatted,
}) {
  if (submitStatus === "success") {
    return (
      <section className={styles.signupPanel}>
        <div className={styles.confirmationFull}>
          <p className={styles.confirmationTitle}>Din plads er reserveret</p>
          <p className={styles.confirmationDetails}>
            {eventTitle} <span className={styles.separator}>·</span>{" "}
            {eventDateFormatted}
          </p>
          <Link to="/" className={styles.confirmationLink}>
            Se andre events →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.signupPanel}>
      <div>
        <p className="eyebrow eyebrowDark">Tilmelding</p>
        <h2>Reserver din plads</h2>
        <p>Udfyld formularen, så sender vi din tilmelding til arrangøren.</p>
      </div>

      <form onSubmit={onSubmit}>
        <label className="formLabel">
          Navn
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label className="formLabel">
          E-mail
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dig@example.com"
          />
        </label>

        <button type="submit">Tilmeld mig</button>

        {submitStatus === "duplicate" && (
          <p className={styles.duplicateMessage} role="status">
            Du er allerede tilmeldt dette event.
          </p>
        )}
        {submitStatus === "error" && (
          <ErrorMessage>Noget gik galt. Prøv igen senere.</ErrorMessage>
        )}
      </form>
    </section>
  );
}
