import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
  burgundy:
    'bg-burgundy text-ivory border border-burgundy hover:bg-burgundy-hover hover:border-burgundy-hover active:bg-burgundy-active active:translate-y-px',
  ivory:
    'bg-ivory text-charcoal border border-ivory hover:bg-white hover:border-white active:bg-limestone active:translate-y-px',
};

export default function PrimaryButton({
  children,
  to,
  href,
  type = 'button',
  variant = 'burgundy',
  pill = false,
  disabled = false,
  className = '',
  ...props
}) {
  const radiusClass = pill ? 'rounded-full px-5 py-2.5' : 'rounded-sm px-6 py-3';
  const baseClass = [
    'inline-flex min-h-[45px] items-center justify-center gap-2 text-sm font-medium tracking-[0.01em] transition-all duration-200',
    'disabled:opacity-55 disabled:pointer-events-none',
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.burgundy,
    radiusClass,
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
