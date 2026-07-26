import { Link } from 'react-router-dom';

const variants = {
  primary: 'btn btn--primary',
  secondary: 'btn btn--secondary',
};

const sizes = {
  default: '',
  lg: 'btn--lg',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'default',
  className = '',
  loading = false,
  icon,
  type = 'button',
  ...props
}) {
  const classes = [
    variants[variant],
    sizes[size],
    loading && 'btn--loading',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && icon}
      {children}
    </>
  );

  const isExternal = href?.startsWith('http');

  if (href && !isExternal) {
    return (
      <Link to={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href && isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      {...props}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
