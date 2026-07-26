import SEO from '../components/SEO';
import PricingCard from '../components/PricingCard';
import FAQ from '../components/FAQ';
import PageHero from '../components/ui/PageHero';
import StaggerGroup from '../components/ui/StaggerGroup';
import StaggerObserver from '../components/ui/StaggerObserver';
import pricing from '../content/pricing.json';
import { buildFAQSchema } from '../seo/siteMeta';

export default function Pricing() {
  const jsonLd = [buildFAQSchema(pricing.faqs)];

  return (
    <>
      <SEO
        title="Pricing — Plans for every stage"
        description={pricing.intro.subtitle}
        path="/pricing"
        jsonLd={jsonLd}
      />

      <PageHero
        badge="Pricing"
        title={pricing.intro.title}
        titleId="pricing-heading"
        subtitle={pricing.intro.subtitle}
      />

      <section className="section" aria-labelledby="plans-heading">
        <div className="container">
          <h2 id="plans-heading" className="visually-hidden">Pricing plans</h2>
          <StaggerObserver>
            <StaggerGroup className="pricing-grid" stagger={120} variant="scale">
              {pricing.plans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </StaggerGroup>
          </StaggerObserver>
          {pricing.footnote && (
            <p className="pricing-footnote">{pricing.footnote}</p>
          )}
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <FAQ faqs={pricing.faqs} />
        </div>
      </section>
    </>
  );
}
