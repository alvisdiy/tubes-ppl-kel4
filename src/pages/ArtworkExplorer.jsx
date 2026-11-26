
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useSearchParams } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import ArtworkCard from '../components/ArtworkCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';

import LoadingState from '../components/artwork-explorer/LoadingState';
import ErrorState from '../components/artwork-explorer/ErrorState';
import EmptyState from '../components/artwork-explorer/EmptyState';

import {
  fetchCategoryTerms,
  searchArtworks,
} from '../services/artworkService';

const PAGE_LIMIT = 12;

export default function ArtworkExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Parameters
  const query = searchParams.get('q') || '';

  const departmentId =
    searchParams.get('department') || '';

  const categoryId =
    searchParams.get('category') || '';

  const requestedPage = Math.max(
    1,
    Number.parseInt(searchParams.get('page') || '1', 10) || 1
  );

  // Artwork State
  const [artworks, setArtworks] = useState([]);

  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
    limit: PAGE_LIMIT,
  });

  // Filter State
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  // Request State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryToken, setRetryToken] = useState(0);

  const hasCriteria = Boolean(
    query || departmentId || categoryId
  );

  // Update URL Parameters
  const updateParams = useCallback(
    (updates, resetPage = true) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === ''
        ) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      if (resetPage) {
        next.delete('page');
      }

      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  // Reset All Search and Filters
  const resetAll = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  // Fetch Department and Category Terms
  useEffect(() => {
    const controller = new AbortController();

    async function loadTerms() {
      try {
        const [
          departmentResult,
          categoryResult,
        ] = await Promise.all([
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

        setDepartments(departmentResult.terms);
        setCategories(categoryResult.terms);

      } catch (termError) {
        if (
          termError.name !== 'CanceledError' &&
          termError.name !== 'AbortError'
        ) {
          console.error(
            'Unable to load artwork filter terms:',
            termError
          );
        }
      }
    }

    loadTerms();

    return () => controller.abort();
  }, []);

  // Fetch Artworks
  useEffect(() => {
    const controller = new AbortController();

    async function loadArtworks() {
      setLoading(true);
      setError('');

      try {
        const result = await searchArtworks({
          query,
          departmentId,
          categoryId,
          page: requestedPage,
          limit: PAGE_LIMIT,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setArtworks(result.artworks);
        setPagination(result.pagination);

      } catch (requestError) {
        if (
          controller.signal.aborted ||
          requestError.name === 'CanceledError' ||
          requestError.name === 'AbortError'
        ) {
          return;
        }

        setError(
          requestError.message ||
          'Unable to load artworks. Please try again.'
        );

        setArtworks([]);

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadArtworks();

    return () => controller.abort();

  }, [
    query,
    departmentId,
    categoryId,
    requestedPage,
    retryToken,
  ]);

  // Format Total Results
  const displayedTotal = useMemo(
    () =>
      Number(pagination.total || 0).toLocaleString('en-US'),
    [pagination.total]
  );

  // Pagination Handler
  function handlePageChange(page) {
    if (
      page < 1 ||
      page > Number(pagination.total_pages || 1)
    ) {
      return;
    }

    updateParams({ page }, false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <MainLayout fullBleed>

      {/* =====================================
          DARK OXBLOOD BANNER HEADER
      ====================================== */}

      <section className="relative overflow-hidden bg-[#261211] px-4 pb-24 pt-12 text-[#F5F0E7] sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">

        {/* Decorative Circles */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-[#C9B38C]/10" />

        <div className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border border-[#C9B38C]/10" />

        <div className="relative mx-auto max-w-7xl">

          {/* Eyebrow */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9B38C]">
            Collection
          </p>

          {/* Title and Result Count */}
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <h1 className="font-serif text-5xl font-medium leading-none tracking-tight text-[#F5F0E7] sm:text-6xl lg:text-7xl">
                Artworks
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#E2DACD] sm:text-base">
                Explore the museum collection, from historic
                masterpieces to remarkable works across
                cultures and generations.
              </p>
            </div>

            <p className="text-sm text-[#E2DACD] sm:pb-1">
              <span className="font-serif text-3xl tabular-nums text-[#F5F0E7]">
                {displayedTotal}
              </span>

              <span className="ml-2">
                works in the collection
              </span>
            </p>

          </div>

          {/* Search Bar */}
          <div className="mt-9 max-w-4xl">

            <SearchBar
              query={query}
              onSearch={(value) =>
                updateParams({ q: value })
              }
            />

            {/* Filter Panel */}
            <div className="mt-5">

              <FilterPanel
                departments={departments}
                categories={categories}
                departmentId={departmentId}
                categoryId={categoryId}

                onDepartmentChange={(value) =>
                  updateParams({ department: value })
                }

                onCategoryChange={(value) =>
                  updateParams({ category: value })
                }

                onReset={resetAll}
              />

            </div>

            {/* Clear All */}
            {hasCriteria && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={resetAll}
                  className="min-h-[36px] text-xs font-semibold uppercase tracking-[0.12em] text-[#E2DACD] underline decoration-[#C9B38C]/60 underline-offset-4 hover:text-white"
                >
                  Clear All
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* =====================================
          OVERLAPPING GALLERY GRID
      ====================================== */}

      <section className="relative mx-auto -mt-14 min-h-[420px] w-full max-w-7xl bg-[#F5F0E7] px-4 pb-16 sm:px-6 lg:px-8">

        {/* Gallery Information */}
        <div className="border border-[#E2DACD] bg-[#FAF8F3] px-4 py-5 sm:px-6">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <p className="text-xs uppercase tracking-[0.14em] text-[#5C554C]">
              Exhibition archive
            </p>

            {!loading && !error && (
              <p className="text-xs tabular-nums text-[#5C554C]">
                {displayedTotal} results
              </p>
            )}

          </div>
        </div>

        {/* =====================================
            LOADING / ERROR / EMPTY / SUCCESS
        ====================================== */}

        <div className="pt-8">

          {/* Loading State */}
          {loading ? (

            <LoadingState count={PAGE_LIMIT} />

          ) : error ? (

            /* Error State */
            <ErrorState
              message={error}
              onRetry={() =>
                setRetryToken((value) => value + 1)
              }
            />

          ) : artworks.length === 0 ? (

            /* Empty State */
            <EmptyState
              onReset={resetAll}
              hasCriteria={hasCriteria}
            />

          ) : (

            /* Artwork Gallery */
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">

                {artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                  />
                ))}

              </div>

              {/* Pagination */}
              <Pagination
                currentPage={Number(
                  pagination.current_page || requestedPage
                )}
                totalPages={Number(
                  pagination.total_pages || 1
                )}
                onPageChange={handlePageChange}
              />
            </>
          )}

        </div>
      </section>

    </MainLayout>
  );
}
