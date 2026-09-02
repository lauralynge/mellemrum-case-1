import { Link } from "react-router";
import Hero from "../components/Hero";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <>
      <Hero
        className="about-hero"
        eyebrow="Om Mellemrum"
        title="Vi skaber mellemrum i kalenderen."
        text="Udvalgte kulturoplevelser og nye perspektiver på Aarhus."
        backgroundImage="https://images.unsplash.com/photo-1553376482-e96b68bd1e11?w=2200&h=1300&q=70&auto=format&fit=crop"
      />

      <main className={styles.aboutPage}>
        <section
          className={styles.aboutIntro}
          aria-labelledby="about-intro-title"
        >
          <div>
            <p className="eyebrowDark">Idéen</p>
            <h2 id="about-intro-title">
              En enkel vej til det, der sker tæt på.
            </h2>
          </div>

          <div className={styles.aboutIntroCopy}>
            <p className="lead">
              Mellemrum samler koncerter, talks, workshops og fællesskaber, så
              du lettere kan opdage noget, du ikke allerede kendte.
            </p>
            <p>
              Vi gør det lokale kulturliv mere overskueligt og skaber en kort
              vej fra nysgerrighed til en plads i kalenderen.
            </p>
          </div>
        </section>

        <section
          className={styles.aboutAudiences}
          aria-labelledby="about-audiences-title"
        >
          <div className={styles.aboutSectionHeading}>
            <p className="eyebrow">Målgrupper</p>
            <h2 id="about-audiences-title">
              Mellemrum forbinder oplevelser med mennesker.
            </h2>
          </div>

          <div className={styles.aboutAudienceSplit}>
            <article className={styles.primaryAudience}>
              <span>Primær målgruppe</span>
              <h3>For dig, der vil opdage byen</h3>
              <p>
                Find lokale oplevelser, få det vigtigste overblik, og tilmeld
                dig uden unødige omveje.
              </p>
              <Link to="/">Udforsk kommende events →</Link>
            </article>

            <article className={styles.organizerAudience}>
              <span>For arrangører</span>
              <h3>Gør oplevelsen synlig</h3>
              <p>
                Del events med et nysgerrigt publikum, og få overblik over de
                mennesker, der tilmelder sig.
              </p>
              <a href="mailto:hej@mellemrum.dk">Tal med os om et event →</a>
            </article>
          </div>
        </section>

        <section
          className={styles.aboutFlowSection}
          aria-labelledby="about-flow-title"
        >
          <div className={styles.aboutSectionHeading}>
            <p className="eyebrowDark">Sådan hænger det sammen</p>
            <h2 id="about-flow-title">Fra idé til plads i kalenderen.</h2>
          </div>

          <ol className={styles.aboutFlowList}>
            <li>
              <span>01</span>
              <strong>Arrangører deler events</strong>
              <p>Oplevelsen får en tydelig plads på platformen.</p>
            </li>
            <li>
              <span>02</span>
              <strong>Brugere opdager</strong>
              <p>Søgning, kategorier og kuratering gør det lettere at vælge.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Brugere tilmelder sig</strong>
              <p>Fra interesse til tilmelding i ét sammenhængende flow.</p>
            </li>
          </ol>
        </section>

        <section
          className={styles.aboutCity}
          aria-labelledby="about-city-title"
        >
          <figure className={styles.aboutCityFigure}>
            <img
              src="https://images.unsplash.com/photo-1532370778713-1400f3d62094?w=1000&q=60&auto=format&fit=crop"
              alt="Moderne arkitektur med lyse facader og turkise altaner"
            />
            <figcaption className={styles.aboutCityCaption}>
              Byrum, arkitektur og nye perspektiver.
            </figcaption>
          </figure>

          <div className={styles.aboutCityContent}>
            <p className="eyebrowDark">Aarhus tæt på</p>
            <h2 id="about-city-title">Find plads til noget nyt.</h2>
            <p>
              Mellemrum peger på steder, idéer og fællesskaber på tværs af byen
              — fra små scener til store tanker.
            </p>
            <Link className={styles.aboutCta} to="/">
              Se kommende events →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
