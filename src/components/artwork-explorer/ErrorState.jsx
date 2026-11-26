
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <section
      role="alert"
      className="mx-auto max-w-xl border border-[#E7CACA] bg-[#F9ECEC] px-6 py-12 text-center"
    >
      <AlertCircle
        className="mx-auto h-9 w-9 text-[#8B2626]"
        strokeWidth={1.4}
        aria-hidden="true"
      />

      <h2 className="mt-4 font-serif text-2xl text-charcoal">
        The collection could not be loaded
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-stone">
        {message ||
          'Something went wrong while connecting to the museum archive.'}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex min-h-[45px] items-center justify-center gap-2 bg-burgundy px-5 text-sm font-medium text-ivory transition-colors hover:bg-burgundy-hover"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try Again
      </button>
    </section>
  );
}
