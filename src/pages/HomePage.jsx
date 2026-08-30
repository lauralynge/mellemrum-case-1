import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import EventGrid from "../components/EventGrid";
import Filters from "../components/Filters";
import styles from "./HomePage.module.css";
import { getEvents } from "../services/events";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setError("Kunne ikke hente events. Prøv igen senere."));
  }, []);

  const categories = [
    "Alle",
    ...new Set(events.map((event) => event.category)),
  ];

  const filteredEvents = events.filter((event) => {
    const searchText =
      `${event.title} ${event.summary} ${event.venueName}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  function formatEventDate(eventDate) {
    const date = new Date(eventDate);
    const formattedDate = date.toLocaleDateString("da-DK", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return (
    <>
      {/*Hero section*/}
      <Hero
        eyebrow="Kultur i Aarhus"
        title="Find plads til noget nyt."
        text="Koncerter, talks og workshops samlet ét sted. Find dit næste event, og tilmeld dig på få minutter."
        backgroundImage="https://images.unsplash.com/photo-1595146463222-19603449c6af?q=80&w=3872&auto=format&fit=crop"
        linkText="Se kommende events ↓"
        linkHref="#events"
      />
      {/*Title section*/}
      <main id="events">
        <section className={styles.sectionHeading}>
          <div>
            <p className="eyebrow eyebrowDark">Det sker</p>
            <h2>Kommende events</h2>
          </div>
          <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
        </section>

        {/* Fejlmeddelelse */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/*Filter section*/}
        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
        {/*EventGrid section med EventCard komponenter*/}
        <EventGrid events={filteredEvents} formatEventDate={formatEventDate} />
      </main>
    </>
  );
}
