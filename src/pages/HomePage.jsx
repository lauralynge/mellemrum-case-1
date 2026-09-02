import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import EventGrid from "../components/EventGrid";
import Filters from "../components/Filters";
import styles from "./HomePage.module.css";
import { getEvents } from "../services/events";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setError("Kunne ikke hente events. Prøv igen senere."))
      .finally(() => setIsLoading(false));
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

  return (
    <>
      {/*Hero section*/}
      <Hero
        eyebrow="Kultur i Aarhus"
        title="Find plads til noget nyt."
        text="Koncerter, talks og workshops samlet ét sted. Find dit næste event, og tilmeld dig på få minutter."
        backgroundImage="https://images.unsplash.com/photo-1595146463222-19603449c6af?w=2200&h=1300&q=70&auto=format&fit=crop"
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

        {/* Loading-tilstand */}
        {isLoading && <LoadingMessage>Indlæser events...</LoadingMessage>}

        {/*EventGrid section med EventCard komponenter*/}
        <EventGrid events={filteredEvents} />
      </main>
    </>
  );
}
