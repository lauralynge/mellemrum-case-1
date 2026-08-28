import styles from "./Hero.module.css";

export default function Hero({
  eyebrow,
  title,
  text,
  backgroundImage,
  linkText,
  linkHref,
  dark = false,
}) {
  return (
    <header
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Global utility-klasse, da eyebrow/dark genbruges på tværs af flere komponenter */}
      <p className={`eyebrow${dark ? " eyebrowDark" : ""}`}>{eyebrow}</p>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroCopy}>{text}</p>

      {linkText && linkHref && (
        <a className={styles.heroLink} href={linkHref}>
          {linkText}
        </a>
      )}
    </header>
  );
}
