import SEO from '../components/SEO';
import Card from '../components/ui/Card';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import StaggerGroup from '../components/ui/StaggerGroup';
import StaggerObserver from '../components/ui/StaggerObserver';
import CtaBanner from '../components/CtaBanner';
import product from '../content/product.json';
import { buildProductSchema } from '../seo/siteMeta';

export default function Product() {
  const jsonLd = [buildProductSchema(product.productSchema)];

  return (
    <>
      <SEO
        title="Product — DigitalHeros Platform"
        description={product.hero.subtitle}
        path="/product"
        jsonLd={jsonLd}
      />

      <PageHero
        badge="Product"
        title={product.hero.title}
        titleId="product-heading"
        subtitle={product.hero.subtitle}
      />

      <section className="section" aria-labelledby="capabilities-heading">
        <div className="container">
          <Reveal variant="fade-up">
            <SectionHeader
              title={product.capabilities.title}
              subtitle={product.capabilities.subtitle}
              titleId="capabilities-heading"
            />
          </Reveal>
          <StaggerObserver>
            <StaggerGroup className="capability-grid" stagger={100}>
              {product.capabilities.items.map((capability, index) => (
                <Card key={capability.title} className="capability-card" hover>
                  <span className="capability-card__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </Card>
              ))}
            </StaggerGroup>
          </StaggerObserver>
        </div>
      </section>

      <section className="product-showcase" aria-labelledby="showcase-heading">
        <div className="container product-showcase__grid">
          <Reveal variant="slide-right">
            <div>
              <h2 id="showcase-heading">{product.showcase.title}</h2>
              <p className="text-muted">{product.showcase.description}</p>
            </div>
          </Reveal>
          <Reveal variant="slide-left" delay={120}>
            <figure>
              <img
                src="/product-workflow.svg"
                alt="Diagram showing teams working together in DigitalHeros"
                width="520"
                height="360"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={product.cta.title}
        subtitle={product.cta.subtitle}
        primary={product.cta.primary}
        secondary={product.cta.secondary}
      />
    </>
  );
}
