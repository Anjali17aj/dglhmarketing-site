import SEO from '../components/SEO';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import CtaBanner from '../components/CtaBanner';
import Testimonials from '../components/Testimonials';
import SuccessGraph from '../components/SuccessGraph';
import DeliveryLifecycle from '../components/DeliveryLifecycle';
import Card from '../components/ui/Card';
import Icon from '../components/ui/Icon';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import StaggerGroup from '../components/ui/StaggerGroup';
import StaggerObserver from '../components/ui/StaggerObserver';
import AnimatedStat from '../components/ui/AnimatedStat';
import Badge from '../components/ui/Badge';
import TrustBar from '../components/ui/TrustBar';
import home from '../content/home.json';
import site from '../content/site.json';
import testimonials from '../content/testimonials.json';

export default function Home() {
  return (
    <>
      <SEO
        title="DigitalHeros — Simple software for B2B teams"
        description={site.description}
        path="/"
      />

      <section className="hero" aria-labelledby="home-hero-heading">
        <div className="hero__orbs" aria-hidden="true">
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
        </div>
        <div className="container hero__grid">
          <div className="hero__content">
            <Badge>B2B software</Badge>
            <h1 id="home-hero-heading">{home.hero.title}</h1>
            <p className="hero__subtitle">{home.hero.subtitle}</p>
            <div className="hero__actions">
              <Button href={home.hero.primaryCta.href} size="lg" icon={<Icon name="arrow" size={16} />}>
                {home.hero.primaryCta.label}
              </Button>
              <Button href={home.hero.secondaryCta.href} variant="secondary" size="lg">
                {home.hero.secondaryCta.label}
              </Button>
            </div>
            <TrustBar
              label="Trusted by teams at"
              companies={testimonials.trustedBy}
              className="hero__trust"
            />
          </div>
          <figure className="hero__visual">
            <div className="hero__visual-float">
              <img
                src="/hero-dashboard.svg"
                alt="DigitalHeros dashboard with team metrics and reports"
                width="560"
                height="420"
                fetchPriority="high"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="stats" aria-label="Key results">
        <StaggerObserver className="container">
          <StaggerGroup className="stats__grid" stagger={100}>
            {home.stats.map((stat) => (
              <Card key={stat.label} className="stat-card" hover>
                <div className="stat-card__icon" aria-hidden="true">
                  <Icon name="chart" size={18} />
                </div>
                <p className="stat-card__value">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="stat-card__label">{stat.label}</p>
              </Card>
            ))}
          </StaggerGroup>
        </StaggerObserver>
      </section>

      <section className="section section--muted" aria-labelledby="features-heading">
        <div className="container">
          <Reveal variant="fade-up">
            <SectionHeader
              eyebrow={home.features.eyebrow}
              title={home.features.title}
              subtitle={home.features.subtitle}
              titleId="features-heading"
            />
          </Reveal>
          <StaggerObserver>
            <StaggerGroup className="feature-grid" stagger={120}>
              {home.features.items.map((feature, index) => (
                <FeatureCard key={feature.title} {...feature} index={index} />
              ))}
            </StaggerGroup>
          </StaggerObserver>
        </div>
      </section>

      <DeliveryLifecycle {...home.lifecycle} />

      <SuccessGraph {...home.successGraph} />

      <Testimonials />

      <CtaBanner
        title={home.cta.title}
        subtitle={home.cta.subtitle}
        primary={home.cta.button}
      />
    </>
  );
}
