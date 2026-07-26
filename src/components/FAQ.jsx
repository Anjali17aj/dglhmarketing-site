import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';

export default function FAQ({ faqs }) {
  return (
    <section className="faq" aria-labelledby="faq-heading">
      <Reveal variant="fade-up">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Clear answers about plans, billing, and getting started."
          titleId="faq-heading"
        />
      </Reveal>
      <div className="faq__list">
        {faqs.map((faq, index) => (
          <Reveal key={faq.question} variant="fade-up" delay={index * 60}>
            <details className="faq__item">
              <summary>
                <span className="faq__question">{faq.question}</span>
              </summary>
              <div className="faq__answer">
                <div className="faq__answer-inner">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
