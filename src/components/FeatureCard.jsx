import Card from './ui/Card';
import Icon from './ui/Icon';

const featureIcons = ['chart', 'layers', 'shield'];

export default function FeatureCard({ title, description, index = 0 }) {
  const iconName = featureIcons[index] || 'chart';

  return (
    <Card className="feature-card" hover>
      <span className="feature-card__step" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="feature-card__icon" aria-hidden="true">
        <Icon name={iconName} size={22} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
