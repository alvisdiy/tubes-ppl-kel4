import { Frame } from 'lucide-react';

/**
 * Empty state displayed when search or department/category filters return zero works.
 */
export default function ExplorerEmptyState({
  hasActiveFilters = false,
  onResetFilters,
}) {
  return (
    <div className="rounded-sm border border-gesso bg-warm-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-limestone">
        <Frame
          className="h-7 w-7 text-gold"
          strokeWidth={1.35}
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-5 font-serif text-2xl font-semibold text-charcoal">
        No Artworks Found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone">
        {hasActiveFilters
          ? 'No works in the collection match your current search or filter selection. Try broadening your keywords or resetting the active filters.'
          : 'No artworks are currently available in this exhibition view.'}
      </p>

      {hasActiveFilters && onResetFilters ? (
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm border border-[#C8B9A3] bg-warm-white px-5 py-2.5 text-sm font-medium text-charcoal transition-colors duration-250 hover:border-burgundy hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Reset Filters
        </button>
      ) : null}
    </div>
  );
}