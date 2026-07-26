import Icon from './ui/Icon';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';
import StaggerGroup from './ui/StaggerGroup';
import StaggerObserver from './ui/StaggerObserver';

export default function DeliveryLifecycle({
  eyebrow,
  title,
  subtitle,
  stages,
  titleId = 'lifecycle-heading',
}) {
  return (
    <section className="section section--muted delivery-lifecycle" aria-labelledby={titleId}>
      <div className="container">
        <Reveal variant="fade-up">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            titleId={titleId}
            align="center"
          />
        </Reveal>

        <StaggerObserver>
          <StaggerGroup className="delivery-lifecycle__track" stagger={90} as="ol">
            {stages.map((stage, index) => (
              <li key={stage.title} className="delivery-lifecycle__stage">
                <div className="delivery-lifecycle__top">
                  <span className="delivery-lifecycle__icon" aria-hidden="true">
                    <Icon name={stage.icon} size={20} />
                  </span>
                  <span className="delivery-lifecycle__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </StaggerGroup>
        </StaggerObserver>
      </div>
    </section>
  );
}
