export default function RegistrationRow({ registration }) {
  return (
    <div className="registration-row">
      <div>
        <strong>{registration.name}</strong>
        <small>{registration.email}</small>
      </div>

      <span>{registration.eventTitle}</span>

      <span>
        {new Date(registration.eventDate).toLocaleDateString("da-DK")}
      </span>

      <span className="status">{registration.status}</span>
    </div>
  );
}
