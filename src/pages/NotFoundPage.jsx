import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <>
      <header>
        <h1 className={styles.notFoundTitle}>404</h1>
      </header>
      <main className={styles.notFound}>
        <p>Siden, du leder efter, findes ikke.</p>
        <Link to="/" className={styles.notFoundLink}>
          Gå til forsiden
        </Link>
      </main>
    </>
  );
}
