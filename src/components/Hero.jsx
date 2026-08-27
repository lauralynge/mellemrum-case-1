export default function Hero({
  eyebrow,
  title,
  text,
  backgroundImage,
  linkText,
  linkHref,
}) {
  return (
    <header
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <p className="hero-eyebrow">{eyebrow}</p>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-copy">{text}</p>

      {linkText && linkHref && (
        <a className="hero-link" href={linkHref}>
          {linkText}
        </a>
      )}
    </header>
  );
}
