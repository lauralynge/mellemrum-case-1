import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      <header>
        <h1 className="not-found-title">404</h1>
      </header>
      <main className="not-found">
        <p>Siden, du leder efter, findes ikke.</p>
        <Link to="/" className="not-found-link">
          Gå til forsiden
        </Link>
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
        <p className="footer-meta">© 2026 Mellemrum</p>
      </footer>
    </>
  );
}
