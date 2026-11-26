import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
  default:
    'bg-warm-white text-charcoal border border-bronze-rule hover:border-burgundy hover:text-burgundy hover:bg-white active:bg-limestone active:translate-y-px',
  onDark:
    'bg-transparent text-ivory border border-[#C9C0B3]/60 hover:border-ivory hover:bg-ivory/10 active:bg-ivory/15 active:translate-y-px',
};

export default function SecondaryButton({
  children,
  to,
  href,
  type = 'button',
  variant = 'default',
  disabled = false,
  className = '',
  ...props
}) {
  const baseClass = [
    'inline-flex min-h-[45px] items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium tracking-[0.01em] transition-all duration-200',
    'disabled:opacity-55 disabled:pointer-events-none',
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.default,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to && !disabled) {
    return (
      <Link to={to} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={baseClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={baseClass} {...props}>
      {children}
    </button>
  );
}
