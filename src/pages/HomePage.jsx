import { useEffect, useState } from "react";
import { Link } from "react-router";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      console.log("Loading:", loading);
      const response = await fetch(`${SUPABASE_URL}/events?order=date.asc`, { headers });
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    }

    getEvents();
  }, []);

  const categories = ["Alle", ...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const searchText = `${event.title} ${event.summary} ${event.venueName}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Kultur i Aarhus</p>
        <h1>Find plads til noget nyt.</h1>
        <p className="hero-copy">
          Koncerter, talks og workshops samlet ét sted. Find dit næste event, og tilmeld dig på få minutter.
        </p>
        <a className="hero-link" href="#events">
          Se kommende events ↓
        </a>
      </header>

      <main id="events">
        <section className="section-heading">
          <div>
            <p className="eyebrow dark">Det sker</p>
            <h2>Kommende events</h2>
          </div>
          <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
        </section>

        <section className="filters">
          <label>
            Søg
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Søg efter titel eller sted"
            />
          </label>
          <label>
            Kategori
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="event-grid">
          {filteredEvents.map((event) => {
            const date = new Date(event.date);
            return (
              <article className="event-card" key={event.id}>
                <img src={event.image} alt="" />
                <div className="event-card-content">
                  <p className="event-category">{event.category}</p>
                  <h3>{event.title}</h3>
                  <p>{event.summary}</p>
                  <div className="event-meta">
                    <span>{date.toLocaleDateString("da-DK", { day: "numeric", month: "short" })}</span>
                    <span>{event.venueName}</span>
                  </div>
                  <Link className="card-link" to={`/events/${event.id}`}>
                    Læs mere
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="internal-link">
          <span>For arrangører</span>
          <Link to="/tilmeldinger">Se tilmeldinger</Link>
        </aside>
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
