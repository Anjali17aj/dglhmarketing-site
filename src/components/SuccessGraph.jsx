import { useId, useRef, useState } from 'react';
import AnimatedStat from './ui/AnimatedStat';
import Reveal from './ui/Reveal';
import SectionHeader from './ui/SectionHeader';

export default function SuccessGraph({
  eyebrow,
  title,
  subtitle,
  years,
  titleId = 'success-graph-heading',
}) {
  const [activeYear, setActiveYear] = useState(years[years.length - 1]?.year);
  const tabId = useId();
  const tabRefs = useRef([]);
  const active = years.find((entry) => entry.year === activeYear) || years[years.length - 1];
  const maxBar = Math.max(...active.byCountry.map((item) => item.value), 1);

  const selectYear = (year, index) => {
    setActiveYear(year);
    tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event, index) => {
    if (!years.length) return;

    let nextIndex = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % years.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + years.length) % years.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = years.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectYear(years[nextIndex].year, nextIndex);
  };

  return (
    <section className="section success-graph" aria-labelledby={titleId}>
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

        <Reveal variant="fade-up" delay={40}>
          <div className="success-graph__years" role="tablist" aria-label="Select a year">
            {years.map((entry, index) => {
              const selected = entry.year === active.year;
              return (
                <button
                  key={entry.year}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${tabId}-${entry.year}`}
                  aria-selected={selected}
                  aria-controls={`${tabId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={`success-graph__year${selected ? ' success-graph__year--active' : ''}`}
                  onClick={() => selectYear(entry.year, index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  {entry.year}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          className="success-graph__panel"
          role="tabpanel"
          id={`${tabId}-panel`}
          aria-labelledby={`${tabId}-${active.year}`}
        >
          <div className="success-graph__metrics">
            <article className="success-graph__metric">
              <p className="success-graph__metric-value">
                <AnimatedStat key={`${active.year}-countries`} value={String(active.countries)} />
              </p>
              <p className="success-graph__metric-label">Countries</p>
            </article>
            <article className="success-graph__metric">
              <p className="success-graph__metric-value">
                <AnimatedStat
                  key={`${active.year}-products`}
                  value={String(active.productsDelivered)}
                />
              </p>
              <p className="success-graph__metric-label">Products delivered</p>
            </article>
            <article className="success-graph__metric">
              <p className="success-graph__metric-value">
                <AnimatedStat key={`${active.year}-teams`} value={String(active.teams)} />
              </p>
              <p className="success-graph__metric-label">Teams served</p>
            </article>
          </div>

          <div
            className="success-graph__chart"
            role="img"
            aria-label={`Products delivered by country in ${active.year}`}
          >
            <p className="success-graph__chart-title" aria-hidden="true">
              Products delivered by country · {active.year}
            </p>
            <ul className="success-graph__bars" aria-hidden="true">
              {active.byCountry.map((item) => {
                const width = Math.max(8, Math.round((item.value / maxBar) * 100));
                return (
                  <li key={`${active.year}-${item.country}`} className="success-graph__bar-row">
                    <span className="success-graph__bar-label">{item.country}</span>
                    <div className="success-graph__bar-track">
                      <div
                        className="success-graph__bar-fill"
                        style={{ '--bar-width': `${width}%` }}
                      />
                    </div>
                    <span className="success-graph__bar-value">{item.value}</span>
                  </li>
                );
              })}
            </ul>
            <p className="visually-hidden">
              {active.byCountry
                .map((item) => `${item.country}: ${item.value} products`)
                .join('. ')}
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
