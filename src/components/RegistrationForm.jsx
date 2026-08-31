import styles from "./RegistrationForm.module.css";
import ErrorMessage from "./ErrorMessage";

export default function RegistrationForm({
  name,
  email,
  setName,
  setEmail,
  onSubmit,
  submitStatus,
}) {
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

        {submitStatus === "success" && (
          <p role="status">Du er nu tilmeldt eventet!</p>
        )}
        {submitStatus === "duplicate" && (
          <p role="status">Du er allerede tilmeldt dette event.</p>
        )}
        {submitStatus === "error" && (
          <ErrorMessage>Noget gik galt. Prøv igen senere.</ErrorMessage>
        )}
      </form>
    </section>
  );
}
