import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.siteNav}>
      <NavLink className={styles.brand} to="/">
        mellemrum<span>.</span>
      </NavLink>
      <div className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.active : undefined
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/om"
          className={({ isActive }) =>
            isActive ? styles.active : undefined
          }
        >
          Om Mellemrum
        </NavLink>
      </div>
    </nav>
  );
}