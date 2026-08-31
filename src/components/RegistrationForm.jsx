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
  fieldErrors = {},
  isSubmitting,
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

      <form onSubmit={onSubmit} noValidate>
        <label className="formLabel">
          <span className={styles.labelRow}>
            Navn
            {fieldErrors.name && (
              <span className={styles.fieldError}>* {fieldErrors.name}</span>
            )}
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldErrors.name ? styles.inputError : undefined}
          />
        </label>

        <label className="formLabel">
          <span className={styles.labelRow}>
            E-mail
            {fieldErrors.email && (
              <span className={styles.fieldError}>* {fieldErrors.email}</span>
            )}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dig@example.com"
            className={fieldErrors.email ? styles.inputError : undefined}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Tilmelder..." : "Tilmeld mig"}
        </button>

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
