import Button from './Button';
import Icon from './ui/Icon';
import Reveal from './ui/Reveal';

export default function CtaBanner({
  title,
  subtitle,
  primary,
  secondary,
  titleId = 'cta-heading',
}) {
  return (
    <section className="cta-banner" aria-labelledby={titleId}>
      <div className="container">
        <Reveal variant="blur-up">
          <div className="cta-banner__inner">
            <h2 id={titleId}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
            <div className="cta-banner__actions">
              {primary && (
                <Button
                  href={primary.href}
                  size="lg"
                  icon={<Icon name="arrow" size={16} />}
                >
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
