
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = [];

  const start = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4)
  );

  const end = Math.min(
    totalPages,
    Math.max(5, currentPage + 2)
  );

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  const buttonBase =
    'inline-flex h-10 min-w-10 items-center justify-center border text-sm tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav
      aria-label="Artwork pages"
      className="mt-14 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${buttonBase} border-gesso px-3 text-stone hover:border-burgundy hover:text-burgundy`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1 hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {start > 1 && (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className={`${buttonBase} border-gesso text-stone hover:border-burgundy hover:text-burgundy`}
            >
              1
            </button>

            {start > 2 && (
              <span className="px-1 text-ash">…</span>
            )}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={
              page === currentPage ? 'page' : undefined
            }
            className={`${buttonBase} ${
              page === currentPage
                ? 'border-burgundy bg-burgundy text-ivory'
                : 'border-gesso text-stone hover:border-burgundy hover:text-burgundy'
            } ${
              Math.abs(page - currentPage) > 1
                ? 'hidden sm:inline-flex'
                : ''
            }`}
          >
            {page}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="px-1 text-ash">…</span>
            )}

            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={`${buttonBase} hidden border-gesso text-stone hover:border-burgundy hover:text-burgundy sm:inline-flex`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <span className="px-1 text-xs tabular-nums text-ash sm:hidden">
        {currentPage}/{totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${buttonBase} border-gesso px-3 text-stone hover:border-burgundy hover:text-burgundy`}
        aria-label="Next page"
      >
        <span className="mr-1 hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
