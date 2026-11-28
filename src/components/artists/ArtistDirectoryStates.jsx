import { AlertCircle, Feather, RefreshCw } from 'lucide-react';

function ArtistSkeletonCard() {
  return (
    <div
      className="animate-pulse border border-gesso bg-warm-white"
      aria-hidden="true"
    >
      <div className="aspect-square border-b border-gesso bg-limestone" />
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-16 bg-gesso" />
          <div className="h-3 w-20 bg-gesso" />
        </div>
        <div className="mt-3 h-6 w-3/4 bg-gesso" />
        <div className="mt-3 h-4 w-full bg-limestone" />
        <div className="mt-1.5 h-4 w-5/6 bg-limestone" />
        <div className="mt-5 flex items-center justify-between border-t border-gesso pt-3.5">
          <div className="h-3 w-28 bg-gesso" />
          <div className="h-8 w-8 rounded-full bg-gesso" />
        </div>
      </div>
    </div>
  );
}

export function ArtistLoadingState({ count = 12 }) {
  return (
    <div aria-label="Loading artists" aria-busy="true">
      <p className="sr-only" role="status">
        Loading artists from the museum archive...
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <ArtistSkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

export function ArtistErrorState({ message, onRetry }) {
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

      <h3 className="mt-4 font-serif text-2xl text-charcoal">
        The artist archive could not be loaded
      </h3>

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

export function ArtistEmptyState({ query = '', onReset }) {
  const hasQuery = Boolean(query.trim());

  return (
    <section className="mx-auto max-w-xl border border-gesso bg-warm-white px-6 py-16 text-center">
      <Feather
        className="mx-auto h-10 w-10 text-bronze-rule"
        strokeWidth={1.25}
        aria-hidden="true"
      />

      <h3 className="mt-4 font-serif text-2xl text-charcoal">
        No artists found
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-stone">
        {hasQuery
          ? `No creator records matched "${query}". Try another name or reset the search.`
          : 'There are no creator records to display at the moment.'}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex min-h-[45px] items-center justify-center border border-bronze-rule px-5 text-sm font-medium text-burgundy transition-colors hover:border-burgundy hover:bg-limestone"
      >
        {hasQuery ? 'Reset Search' : 'Reload Archive'}
      </button>
    </section>
  );
}
