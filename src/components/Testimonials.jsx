import testimonials from '../content/testimonials.json';
import Icon from './ui/Icon';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';
import StaggerGroup from './ui/StaggerGroup';
import StaggerObserver from './ui/StaggerObserver';

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ item }) {
  return (
    <figure className="testimonial-card">
      <Icon name="quote" size={22} className="testimonial-card__quote-icon" />
      <blockquote className="testimonial-card__quote">
        <p>&ldquo;{item.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="testimonial-card__author">
        <span className="testimonial-card__avatar" aria-hidden="true">
          {initials(item.author)}
        </span>
        <div className="testimonial-card__author-info">
          <cite className="testimonial-card__name">{item.author}</cite>
          <span className="testimonial-card__role">
            {item.role}, {item.company}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <Reveal variant="fade-up">
          <SectionHeader
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            subtitle={testimonials.subtitle}
            titleId="testimonials-heading"
            align="center"
          />
        </Reveal>

        <Reveal variant="fade-up" delay={60}>
          <figure className="home-quote__card testimonials__featured">
            <Icon name="quote" size={28} className="home-quote__icon" />
            <blockquote>
              <p>&ldquo;{testimonials.featured.quote}&rdquo;</p>
            </blockquote>
            <figcaption>
              <cite>{testimonials.featured.author}</cite>
              <span>
                {testimonials.featured.role}, {testimonials.featured.company}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <StaggerObserver>
          <StaggerGroup className="testimonials__grid" stagger={100}>
            {testimonials.items.map((item) => (
              <TestimonialCard key={item.author} item={item} />
            ))}
          </StaggerGroup>
        </StaggerObserver>
      </div>
    </section>
  );
}
