export default function RegistrationForm({
  name,
  email,
  setName,
  setEmail,
  onSubmit,
}) {
  return (
    <section className="signup-panel">
      <div>
        <p className="eyebrow dark">Tilmelding</p>
        <h2>Reserver din plads</h2>
        <p>Udfyld formularen, så sender vi din tilmelding til arrangøren.</p>
      </div>

      <form onSubmit={onSubmit}>
        <label>
          Navn
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          E-mail
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dig@example.com"
          />
        </label>

        <button type="submit">Tilmeld mig</button>
      </form>
    </section>
  );
}
