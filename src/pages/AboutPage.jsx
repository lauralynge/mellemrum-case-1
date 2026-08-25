export default function AboutPage() {
  return (
    <>
      <header className="page-header about-header">
        <p className="eyebrow">Om platformen</p>
        <h1>Vi skaber mellemrum i kalenderen.</h1>
      </header>
      <main className="narrow-page">
        <p className="lead">
          Mellemrum samler udvalgte kulturoplevelser i Aarhus og gør det lettere at opdage noget, du ikke allerede
          kendte.
        </p>
        <h2>En enkel vej til lokale oplevelser</h2>
        <p>
          Platformen er udviklet som en første prototype for et lille kulturteam. Målet er at skabe et overskueligt
          sted, hvor arrangører kan dele events, og hvor brugere hurtigt kan finde og tilmelde sig en oplevelse.
        </p>
      </main>
      <footer className="site-footer">
        <div>
          <p className="footer-brand">
            mellemrum<span>.</span>
          </p>
          <p>Udvalgte kulturoplevelser i Aarhus.</p>
        </div>
        <div>
          <p className="footer-heading">Kontakt</p>
          <a href="mailto:hej@mellemrum.dk">hej@mellemrum.dk</a>
          <p>Aarhus, Danmark</p>
        </div>
        <p className="footer-meta">© 2024 Mellemrum</p>
      </footer>
    </>
  );
}
