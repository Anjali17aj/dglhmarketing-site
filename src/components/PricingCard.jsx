import Button from './Button';
import Card from './ui/Card';
import Icon from './ui/Icon';

export default function PricingCard({ plan }) {
  const priceLabel = plan.price === null ? 'Custom' : `$${plan.price}`;

  return (
    <Card
      className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
      variant={plan.featured ? 'featured' : 'default'}
      hover={!plan.featured}
    >
      {plan.featured && <p className="pricing-card__badge">Most popular</p>}
      <h3>{plan.name}</h3>
      <p className="pricing-card__price">
        <span className="pricing-card__amount">{priceLabel}</span>
        {plan.price !== null && <span className="pricing-card__period">/{plan.period}</span>}
      </p>
      <p className="pricing-card__description">{plan.description}</p>
      <ul className="pricing-card__features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Icon name="check" size={16} className="pricing-card__check" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="pricing-card__cta">
        <Button href="/contact" variant={plan.featured ? 'primary' : 'secondary'}>
          {plan.cta}
        </Button>
      </div>
    </Card>
  );
}
