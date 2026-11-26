import { AlertCircle } from 'lucide-react';

/**
 * Calm museum-toned error card with retry action when API requests fail.
 */
export default function ExplorerErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="mx-auto my-12 max-w-md rounded-sm border border-gesso bg-warm-white p-8 text-center"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F9ECEC]">
        <AlertCircle
          className="h-6 w-6 text-[#8B2626]"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
        Unable to Load Exhibition
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-stone">
        {message ||
          'We encountered an issue retrieving artworks from the museum archive. Please try again.'}
      </p>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm border border-[#C8B9A3] bg-warm-white px-5 py-2.5 text-sm font-medium text-charcoal transition-colors duration-250 hover:border-burgundy hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Try Again
        </button>
      ) : null}
    </div>
  );
}