import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.notFound}>
      <h1 className={styles.notFoundTitle}>404 Fejl</h1>
      <p>Siden, du leder efter, findes ikke.</p>
      <Link to="/" className={styles.notFoundLink}>
        Gå til forsiden →
      </Link>
    </main>
  );
}
