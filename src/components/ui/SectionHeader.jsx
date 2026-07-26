import Badge from './Badge';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  titleId,
}) {
  const classes = [
    'section-header',
    align === 'center' && 'section-header--center',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      {title && <h2 id={titleId}>{title}</h2>}
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </header>
  );
}
