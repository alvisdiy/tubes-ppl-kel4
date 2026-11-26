
import { SearchX } from 'lucide-react';

export default function EmptyState({
  onReset,
  hasCriteria = false,
}) {
  return (
    <section className="mx-auto max-w-xl px-6 py-16 text-center">
      <SearchX
        className="mx-auto h-10 w-10 text-bronze-rule"
        strokeWidth={1.2}
        aria-hidden="true"
      />

      <h2 className="mt-4 font-serif text-2xl text-charcoal">
        No artworks found
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-stone">
        {hasCriteria
          ? 'No works match your current search or filters. Try changing your keywords or clearing the filters.'
          : 'There are no artworks to display at the moment.'}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex min-h-[45px] items-center justify-center border border-bronze-rule px-5 text-sm font-medium text-burgundy transition-colors hover:border-burgundy hover:bg-limestone"
      >
        Reset Filters
      </button>
    </section>
  );
}
