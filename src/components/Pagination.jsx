import { ChevronLeft, ChevronRight } from 'lucide-react';

function buildPageRange(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) {
    pages.push('ellipsis-left');
  }

  for (let page = left; page <= right; page += 1) {
    pages.push(page);
  }

  if (right < totalPages - 1) {
    pages.push('ellipsis-right');
  }

  pages.push(totalPages);
  return pages;
}

/**
 * Centered museum pagination bar with tabular numerals and compact mobile view.
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isDisabled = false,
}) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const pageItems = buildPageRange(currentPage, totalPages);
  const isFirst = currentPage <= 1 || isDisabled;
  const isLast = currentPage >= totalPages || isDisabled;

  const handleSelect = (page) => {
    if (isDisabled || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange?.(page);
  };

  return (
    <nav
      aria-label="Exhibition pagination"
      className="mt-12 flex flex-col items-center gap-3 border-t border-gesso pt-8"
    >
      <div className="flex w-full items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handleSelect(currentPage - 1)}
          disabled={isFirst}
          aria-label="Previous page"
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-sm border border-[#C8B9A3] bg-warm-white px-4 py-2 text-sm font-medium text-charcoal transition-colors duration-250 hover:border-burgundy hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-[#C8B9A3] disabled:hover:text-charcoal"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          <span>Previous</span>
        </button>

        {/* Compact mobile summary */}
        <span className="px-3 text-sm font-medium tabular-nums text-stone sm:hidden">
          Page {currentPage.toLocaleString()} of {totalPages.toLocaleString()}
        </span>

        {/* Desktop numeric page list */}
        <div className="hidden items-center gap-1.5 sm:inline-flex">
          {pageItems.map((item) => {
            if (typeof item === 'string') {
              return (
                <span
                  key={item}
                  aria-hidden="true"
                  className="inline-flex min-h-[44px] min-w-[36px] items-center justify-center text-sm text-ash"
                >
                  &hellip;
                </span>
              );
            }

            const isActive = item === currentPage;

            return (
              <button
                key={item}
                type="button"
                onClick={() => handleSelect(item)}
                disabled={isDisabled}
                aria-label={`Page ${item}`}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-sm border px-3 text-sm font-medium tabular-nums transition-colors duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  isActive
                    ? 'border-burgundy bg-burgundy text-ivory'
                    : 'border-gesso bg-warm-white text-charcoal hover:border-gold hover:text-burgundy'
                }`}
              >
                {item.toLocaleString()}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handleSelect(currentPage + 1)}
          disabled={isLast}
          aria-label="Next page"
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-sm border border-[#C8B9A3] bg-warm-white px-4 py-2 text-sm font-medium text-charcoal transition-colors duration-250 hover:border-burgundy hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-[#C8B9A3] disabled:hover:text-charcoal"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <p className="hidden text-xs tabular-nums text-ash sm:block">
        Page {currentPage.toLocaleString()} of {totalPages.toLocaleString()}
      </p>
    </nav>
  );
}