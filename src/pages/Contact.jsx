import { useRef, useState } from 'react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import FormField from '../components/ui/FormField';
import Icon from '../components/ui/Icon';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import contact from '../content/contact.json';

const initialForm = { name: '', email: '', company: '', message: '' };

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your full name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.company.trim()) {
    errors.company = 'Company name is required.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please tell us how we can help.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);

  const errors = validate(form);
  const showError = (field) => touched[field] && errors[field];

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setSubmitted(false);
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, company: true, message: true });

    if (Object.keys(errors).length > 0) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
    setForm(initialForm);
    setTouched({});
    window.requestAnimationFrame(() => {
      successRef.current?.focus();
    });
  };

  return (
    <>
      <SEO
        title="Contact — Talk to our team"
        description={contact.hero.subtitle}
        path="/contact"
      />

      <PageHero
        badge="Contact"
        title={contact.hero.title}
        titleId="contact-heading"
        subtitle={contact.hero.subtitle}
      />

      <section className="section" aria-labelledby="contact-form-heading">
        <div className="container contact-grid">
          <Reveal variant="slide-right" className="contact-info">
            <h2 id="contact-form-heading">Reach our team</h2>
            <p>We typically respond within one business day.</p>

            <dl className="contact-details">
              <div className="contact-details__item">
                <div className="contact-details__icon" aria-hidden="true">
                  <Icon name="mail" size={18} />
                </div>
                <div>
                  <dt>Email</dt>
                  <dd><a href={`mailto:${contact.contact.email}`}>{contact.contact.email}</a></dd>
                </div>
              </div>
              <div className="contact-details__item">
                <div className="contact-details__icon" aria-hidden="true">
                  <Icon name="phone" size={18} />
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd><a href={`tel:${contact.contact.phone.replace(/\s/g, '')}`}>{contact.contact.phone}</a></dd>
                </div>
              </div>
              <div className="contact-details__item">
                <div className="contact-details__icon" aria-hidden="true">
                  <Icon name="clock" size={18} />
                </div>
                <div>
                  <dt>Hours</dt>
                  <dd>{contact.contact.hours}</dd>
                </div>
              </div>
            </dl>

            <address className="contact-office">
              <div className="contact-office__icon" aria-hidden="true">
                <Icon name="location" size={20} />
              </div>
              <div>
                <strong>{contact.office.name}</strong>
                <span>{contact.office.address}</span>
                <span>{contact.office.city}</span>
              </div>
            </address>
          </Reveal>

          <Reveal variant="slide-left" delay={120}>
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="contact-message-heading"
          >
            <h3 id="contact-message-heading" className="contact-form__title">
              Send us a message
            </h3>

            <FormField
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              error={showError('name') && errors.name}
              required
              autoComplete="name"
              placeholder="Anjali Sharma"
            />

            <FormField
              label="Work email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              error={showError('email') && errors.email}
              helper="We'll use this email to follow up with you."
              required
              autoComplete="email"
              placeholder="anjali@company.com"
            />

            <FormField
              label="Company"
              name="company"
              value={form.company}
              onChange={handleChange('company')}
              onBlur={handleBlur('company')}
              error={showError('company') && errors.company}
              required
              autoComplete="organization"
              placeholder="CDACINDIA."
            />

            <FormField
              label="How can we help?"
              name="message"
              type="textarea"
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              onBlur={handleBlur('message')}
              error={showError('message') && errors.message}
              required
              placeholder="Tell us about your team size, current tools, and goals..."
            />

            <Button type="submit" loading={loading}>
              {contact.form.submitLabel}
            </Button>

            {submitted && (
              <p
                ref={successRef}
                className="form-success"
                role="status"
                aria-live="polite"
                tabIndex={-1}
              >
                <Icon name="check" size={18} />
                {contact.form.successMessage}
              </p>
            )}
          </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
