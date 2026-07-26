const icons = {
  chart: (
    <path d="M4 19V5M4 19h16M8 17V11M12 17V7M16 17v-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  ),
  shield: (
    <path d="M12 3l7 3v6c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
  ),
  mail: (
    <path d="M4 6h16v12H4V6zm0 0 8 6 8-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  ),
  phone: (
    <path d="M8 4h2l1 4-2.5 1.5a11 11 0 0 0 5 5L15 12l4 1v2a2 2 0 0 1-2 2A13 13 0 0 1 6 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  ),
  clock: (
    <path d="M12 8v4l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  ),
  location: (
    <>
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </>
  ),
  check: (
    <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevronUp: (
    <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  moon: (
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
  ),
  arrow: (
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  ),
  quote: (
    <path
      d="M10.2 17.5c-2.4 0-4.2-1.9-4.2-4.3 0-2.6 1.9-4.9 4.6-6.4l.7 1.1c-1.7 1-2.7 2.2-2.9 3.5.4-.3.9-.4 1.5-.4 1.7 0 3 1.2 3 2.9 0 1.9-1.3 3.6-2.7 3.6zm7.8 0c-2.4 0-4.2-1.9-4.2-4.3 0-2.6 1.9-4.9 4.6-6.4l.7 1.1c-1.7 1-2.7 2.2-2.9 3.5.4-.3.9-.4 1.5-.4 1.7 0 3 1.2 3 2.9 0 1.9-1.3 3.6-2.7 3.6z"
      fill="currentColor"
    />
  ),
  layers: (
    <path d="M12 3 3 8l9 5 9-5-9-5zm0 18 9-5v-4.5L12 16 3 11.5V16l9 5z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
  ),
  plan: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  design: (
    <>
      <path d="M12 20h8M15.2 4.8a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 10.2-10.2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  build: (
    <>
      <path d="M8 8.5 4.5 12 8 15.5M16 8.5 19.5 12 16 15.5M13.2 6.5 10.8 17.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  test: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8.5 12.2 11 14.7 15.5 9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  launch: (
    <>
      <path d="M12 19c-3.2-.4-6-3.2-6.5-6.5C7 7 12 4 12 4s5 3 6.5 8.5C18 15.8 15.2 18.6 12 19z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 19v3M9.5 14.5 7 17M14.5 14.5 17 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="11" r="1.4" fill="currentColor" />
    </>
  ),
  improve: (
    <>
      <path d="M4 19V9M9 19V5M14 19v-7M19 19V8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 9l5-4 5 3 6-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  linkedin: (
    <>
      <path d="M6.5 9.5v9M6.5 6.5v.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M10.5 18.5v-5.2c0-2.4 1.3-3.8 3.4-3.8 1.5 0 2.6.9 2.6 3.2v5.8M10.5 11.2V18.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M10.5 9.2v5.6L15.5 12l-5-2.8z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </>
  ),
};

export default function Icon({ name, size = 20, className = '', label }) {
  const content = icons[name];
  if (!content) return null;

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {content}
    </svg>
  );
}
