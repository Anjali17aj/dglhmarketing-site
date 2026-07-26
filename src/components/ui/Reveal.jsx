import { useScrollReveal } from '../../hooks/useAnimations';

export default function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
}) {
  const { ref, visible } = useScrollReveal();

  const classes = [
    'reveal',
    `reveal--${variant}`,
    'reveal--slow',
    visible && 'reveal--visible',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}
