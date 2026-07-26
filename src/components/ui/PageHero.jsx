import Badge from './Badge';
import Reveal from './Reveal';

export default function PageHero({ badge, title, titleId, subtitle }) {
  return (
    <section className="page-hero" aria-labelledby={titleId}>
      <div className="page-hero__pattern" aria-hidden="true" />
      <div className="container page-hero__inner">
        <div className="page-hero__stack">
          {badge && (
            <Reveal variant="fade-up" delay={0}>
              <Badge>{badge}</Badge>
            </Reveal>
          )}
          <Reveal variant="fade-up" delay={80}>
            <h1 id={titleId}>{title}</h1>
          </Reveal>
          {subtitle && (
            <Reveal variant="fade-up" delay={160}>
              <p className="page-hero__subtitle">{subtitle}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
