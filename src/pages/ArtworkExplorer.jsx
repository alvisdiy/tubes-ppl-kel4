import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtworkCard from '../components/ArtworkCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import ArtworkGridSkeleton from '../components/explorer/ArtworkGridSkeleton';
import ExplorerEmptyState from '../components/explorer/ExplorerEmptyState';
import ExplorerErrorState from '../components/explorer/ExplorerErrorState';
import { fetchCategoryTerms, searchArtworks } from '../services/artworkService';

const PAGE_LIMIT = 12;

function isAbortError(error) {
  return (
    error?.name === 'CanceledError' ||
    error?.name === 'AbortError' ||
    error?.code === 'ERR_CANCELED'
  );
}

function normalizeTerms(terms = []) {
  const seen = new Map();
  for (const term of terms) {
    if (term?.id && term?.title && !seen.has(term.id)) {
      seen.set(term.id, { id: String(term.id), title: term.title });
    }
  }
  return Array.from(seen.values()).sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

/**
 * Artwork Explorer — Exhibition Hall (/artworks).
 * Browse, search, filter by department/category, and paginate Art Institute of Chicago works.
 */
export default function ArtworkExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const departmentId = searchParams.get('department') || '';
  const categoryId = searchParams.get('category') || '';
  const parsedPage = Number.parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const [artworks, setArtworks] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
    limit: PAGE_LIMIT,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTick, setReloadTick] = useState(0);

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingTerms, setIsLoadingTerms] = useState(true);

  const updateParams = useCallback(
    (updates, { resetPage = true } = {}) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        for (const [key, val] of Object.entries(updates)) {
          if (val) {
            next.set(key, String(val));
          } else {
            next.delete(key);
          }
        }

        if (resetPage) {
          next.delete('page');
        }

        return next;
      });
    },
    [setSearchParams]
  );

  // Fetch official Department and Category filter options once on mount
  useEffect(() => {
    const controller = new AbortController();

    async function loadFilterTerms() {
      setIsLoadingTerms(true);
      const [deptResult, catResult] = await Promise.allSettled([
        fetchCategoryTerms({
          subtype: 'department',
          limit: 100,
          signal: controller.signal,
        }),
        fetchCategoryTerms({
          subtype: 'category',
          limit: 100,
          signal: controller.signal,
        }),
      ]);

      if (controller.signal.aborted) return;

      if (deptResult.status === 'fulfilled') {
        setDepartments(normalizeTerms(deptResult.value.terms));
      }
      if (catResult.status === 'fulfilled') {
        setCategories(normalizeTerms(catResult.value.terms));
      }

      setIsLoadingTerms(false);
    }

    loadFilterTerms();

    return () => {
      controller.abort();
    };
  }, []);

  // Fetch artworks whenever URL search/filter/page state or manual retry changes
  useEffect(() => {
    const controller = new AbortController();

    async function loadArtworks() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await searchArtworks({
          query,
          departmentId,
          categoryId,
          page: currentPage,
          limit: PAGE_LIMIT,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setArtworks(result.artworks || []);
        setPagination(
          result.pagination || {
            current_page: currentPage,
            total_pages: 1,
            total: 0,
            limit: PAGE_LIMIT,
          }
        );
      } catch (err) {
        if (isAbortError(err) || controller.signal.aborted) return;
        setError(
          err?.message ||
            'Unable to retrieve artworks from the archive at this moment.'
        );
        setArtworks([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadArtworks();

    return () => {
      controller.abort();
    };
  }, [query, departmentId, categoryId, currentPage, reloadTick]);

  const handleSearch = (nextQuery) => {
    updateParams({ q: nextQuery }, { resetPage: true });
  };

  const handleDepartmentChange = (nextDepartmentId) => {
    updateParams({ department: nextDepartmentId }, { resetPage: true });
  };

  const handleCategoryChange = (nextCategoryId) => {
    updateParams({ category: nextCategoryId }, { resetPage: true });
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const handlePageChange = (nextPage) => {
    updateParams(
      { page: nextPage > 1 ? String(nextPage) : '' },
      { resetPage: false }
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setReloadTick((prev) => prev + 1);
  };

  const hasActiveFilters = Boolean(query || departmentId || categoryId);
  const totalCount =
    typeof pagination.total === 'number' ? pagination.total : artworks.length;

  return (
    <main className="min-h-screen bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Exhibition Header */}
        <header className="border-b border-gesso pb-8 sm:pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
            The Art Institute of Chicago
          </p>

          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-[2rem] leading-[1.12] font-semibold tracking-[-0.015em] text-charcoal sm:text-[2.5rem] lg:text-5xl">
                Exhibition Hall
              </h1>
              <p className="mt-3 max-w-[65ch] text-base leading-[1.6] text-stone sm:text-lg">
                Browse paintings, sculpture, prints, and historical artifacts from
                the permanent collection and curatorial wings.
              </p>
            </div>

            <div
              aria-live="polite"
              className="shrink-0 text-sm font-medium tabular-nums text-ash"
            >
              {isLoading ? (
                <span>Updating collection&hellip;</span>
              ) : error ? (
                <span>Archive temporarily unavailable</span>
              ) : (
                <span>
                  {totalCount.toLocaleString()}{' '}
                  {totalCount === 1 ? 'artwork' : 'artworks'} in archive
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Search & Filter Toolbar */}
        <section
          aria-label="Search and filter artworks"
          className="mt-8 rounded-sm border border-gesso bg-warm-white p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            <div className="w-full lg:max-w-md">
              <SearchBar value={query} onSearch={handleSearch} />
            </div>

            <div className="flex-1">
              <FilterPanel
                departments={departments}
                categories={categories}
                selectedDepartment={departmentId}
                selectedCategory={categoryId}
                activeQuery={query}
                onDepartmentChange={handleDepartmentChange}
                onCategoryChange={handleCategoryChange}
                onClearQuery={() => handleSearch('')}
                onResetAll={handleResetFilters}
                isLoadingTerms={isLoadingTerms}
              />
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section aria-label="Exhibition artworks" className="mt-8 sm:mt-10">
          {isLoading ? (
            <ArtworkGridSkeleton count={PAGE_LIMIT} />
          ) : error ? (
            <ExplorerErrorState message={error} onRetry={handleRetry} />
          ) : artworks.length === 0 ? (
            <ExplorerEmptyState
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>

              <Pagination
                currentPage={pagination.current_page || currentPage}
                totalPages={pagination.total_pages || 1}
                onPageChange={handlePageChange}
                isDisabled={isLoading}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}