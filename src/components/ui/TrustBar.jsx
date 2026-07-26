export default function TrustBar({ label, companies, className = '' }) {
  if (!companies?.length) return null;

  return (
    <div
      className={`trust-bar${className ? ` ${className}` : ''}`}
      aria-label={label}
    >
      <p className="trust-bar__label">{label}</p>
      <ul className="trust-bar__list">
        {companies.map((company) => (
          <li key={company}>{company}</li>
        ))}
      </ul>
    </div>
  );
}
