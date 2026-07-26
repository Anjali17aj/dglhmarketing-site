export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
}) {
  const classes = [
    'card',
    variant !== 'default' && `card--${variant}`,
    hover && 'card--hover',
    className,
  ].filter(Boolean).join(' ');

  return <article className={classes}>{children}</article>;
}
