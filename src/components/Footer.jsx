import { Link } from "react-router";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerTop}>
        <div className={styles.footerIntro}>
          <p className={styles.footerBrand}>
            mellemrum<span>.</span>
          </p>
          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>
        <nav className={styles.footerLinks} aria-label="Footer">
          <div className={styles.footerLinkGroup}>
            <p className={styles.footerHeading}>Udforsk</p>
            <Link to="/">Events</Link>
            <Link to="/om">Om Mellemrum</Link>
          </div>
          <div className={styles.footerLinkGroup}>
            <p className={styles.footerHeading}>For arrangører</p>
            <Link to="/tilmeldinger">Se tilmeldinger</Link>
            <a href="mailto:hej@mellemrum.dk">Kontakt os</a>
          </div>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 Mellemrum</p>
        <p>Aarhus, Danmark</p>
      </div>
    </footer>
  );
}
