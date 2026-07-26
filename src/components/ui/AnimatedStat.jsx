import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useAnimations';

function parseStatValue(value) {
  const match = String(value).match(/^([^0-9.-]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: value, decimals: 0 };

  const [, prefix, num, suffix] = match;
  const number = parseFloat(num);
  const decimals = num.includes('.') ? num.split('.')[1].length : 0;

  return { prefix, number, suffix, decimals };
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

export default function AnimatedStat({ value, duration = 1400 }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });
  const { prefix, number, suffix, decimals } = parseStatValue(value);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || hasAnimated.current) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(number);
      hasAnimated.current = true;
      return undefined;
    }

    hasAnimated.current = true;
    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(number * easeOutCubic(progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, number, duration]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
