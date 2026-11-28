import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ArtistCard from '../components/ArtistCard';
import Pagination from '../components/Pagination';
import ArtistSearchBar from '../components/artists/ArtistSearchBar';
import ArtistProfileDrawer from '../components/artists/ArtistProfileDrawer';
import {
  ArtistEmptyState,
  ArtistErrorState,
  ArtistLoadingState,
} from '../components/artists/ArtistDirectoryStates';
import { searchArtists } from '../services/artistService';

const PAGE_LIMIT = 12;

export default function ArtistExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const selectedArtistId = searchParams.get('artist') || '';
  const requestedPage = Math.max(
    1,
    Number.parseInt(searchParams.get('page') || '1', 10) || 1
  );

  const [artists, setArtists] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
    limit: PAGE_LIMIT,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryToken, setRetryToken] = useState(0);

  const updateParams = useCallback(
    (updates, resetPage = true) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
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

  const resetSearch = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete('q');
    next.delete('page');
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadArtists() {
      setLoading(true);
      setError('');

      try {
        const result = await searchArtists({
          query,
          page: requestedPage,
          limit: PAGE_LIMIT,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setArtists(result.artists);
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
            'Unable to load artists from the museum archive. Please try again.'
        );
        setArtists([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadArtists();
    return () => controller.abort();
  }, [query, requestedPage, retryToken]);

  const displayedTotal = useMemo(
    () => Number(pagination.total || 0).toLocaleString('en-US'),
    [pagination.total]
  );

  const selectedArtist = useMemo(
    () =>
      artists.find((item) => String(item.id) === String(selectedArtistId)) ||
      null,
    [artists, selectedArtistId]
  );

  function handlePageChange(page) {
    if (page < 1 || page > Number(pagination.total_pages || 1)) {
      return;
    }

    updateParams({ page }, false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <MainLayout heroOverlay fullBleed>
      <section
        data-surface="dark"
        className="relative overflow-hidden bg-[#261211] pt-28 pb-28 text-ivory sm:pt-32 sm:pb-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-[#C9B38C]/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full border border-[#C9B38C]/10"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9B38C]">
            Artists
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-[2.25rem] font-normal leading-[1.08] tracking-[-0.01em] text-[#F5F0E7] sm:text-[3.25rem]">
                Meet the Artists
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#E2DACD] sm:text-base">
                Browse biographical records, historical dates, and archived works attributed to creators in the Art Institute of Chicago collection.
              </p>
            </div>

            <p className="text-sm text-[#E2DACD] sm:pb-1">
              <span className="font-serif text-3xl tabular-nums text-[#F5F0E7]">
                {displayedTotal}
              </span>
              <span className="ml-2">creators archived</span>
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <ArtistSearchBar
              query={query}
              onSearch={(value) => updateParams({ q: value })}
            />

            {query && (
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetSearch}
                  className="inline-flex min-h-[45px] items-center text-xs font-semibold uppercase tracking-[0.14em] text-[#E2DACD] underline decoration-[#C9B38C]/60 underline-offset-4 transition-colors hover:text-white"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section data-surface="light" className="bg-ivory pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-14 relative z-10">
            <div className="border border-gesso bg-warm-white px-4 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">
                  {query
                    ? `Creator Directory: "${query}"`
                    : 'Creator Directory'}
                </h2>

                {!loading && !error && (
                  <p className="text-xs tabular-nums text-stone">
                    {displayedTotal} results
                  </p>
                )}
              </div>
            </div>

            <div className="pt-8">
              {loading ? (
                <ArtistLoadingState count={PAGE_LIMIT} />
              ) : error ? (
                <ArtistErrorState
                  message={error}
                  onRetry={() => setRetryToken((value) => value + 1)}
                />
              ) : artists.length === 0 ? (
                <ArtistEmptyState
                  query={query}
                  onReset={() => {
                    if (query) {
                      resetSearch();
                    } else {
                      setRetryToken((value) => value + 1);
                    }
                  }}
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {artists.map((artist) => (
                      <ArtistCard
                        key={artist.id}
                        artist={artist}
                        isSelected={
                          String(artist.id) === String(selectedArtistId)
                        }
                        onSelect={(chosen) =>
                          updateParams({ artist: chosen.id }, false)
                        }
                      />
                    ))}
                  </div>

                  <Pagination
                    currentPage={Number(
                      pagination.current_page || requestedPage
                    )}
                    totalPages={Number(pagination.total_pages || 1)}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <ArtistProfileDrawer
        artistId={selectedArtistId}
        initialArtist={selectedArtist}
        onClose={() => updateParams({ artist: '' }, false)}
      />
    </MainLayout>
  );
}
