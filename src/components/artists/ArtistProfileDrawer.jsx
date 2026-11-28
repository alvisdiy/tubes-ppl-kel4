import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, Feather, RefreshCw, X } from 'lucide-react';
import {
  fetchArtistById,
  fetchArtworksByArtist,
} from '../../services/artistService';
import ArtworkCard from '../ArtworkCard';
import {
  formatArtistLifespan,
  getArtistBiography,
} from './artistHelpers';

function isAbortError(error) {
  return (
    error?.name === 'CanceledError' ||
    error?.name === 'AbortError' ||
    error?.code === 'ERR_CANCELED'
  );
}

function formatSingleYear(year) {
  if (year === null || year === undefined || year === '') return 'Unrecorded';
  const num = Number(year);
  if (Number.isNaN(num)) return String(year);
  return num < 0 ? `${Math.abs(num)} BCE` : String(num);
}

export default function ArtistProfileDrawer({
  artistId,
  initialArtist = null,
  onClose,
}) {
  const closeButtonRef = useRef(null);

  const [artist, setArtist] = useState(initialArtist);
  const [artistLoading, setArtistLoading] = useState(false);
  const [artistError, setArtistError] = useState('');

  const [artworks, setArtworks] = useState([]);
  const [worksTotal, setWorksTotal] = useState(null);
  const [worksLoading, setWorksLoading] = useState(false);
  const [worksError, setWorksError] = useState('');
  const [retryToken, setRetryToken] = useState(0);

  const isOpen = Boolean(artistId);

  useEffect(() => {
    setArtist(initialArtist);
  }, [initialArtist, artistId]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const loadArtistBundle = useCallback(
    async (signal) => {
      if (!artistId) return;

      setArtistLoading(true);
      setArtistError('');
      setWorksLoading(true);
      setWorksError('');

      try {
        const [profileResult, worksResult] = await Promise.allSettled([
          fetchArtistById(artistId, { signal }),
          fetchArtworksByArtist(artistId, { page: 1, limit: 8, signal }),
        ]);

        if (signal?.aborted) return;

        if (profileResult.status === 'fulfilled' && profileResult.value) {
          setArtist(profileResult.value);
        } else if (profileResult.status === 'rejected' && !isAbortError(profileResult.reason)) {
          if (!initialArtist) {
            setArtistError(
              profileResult.reason?.message ||
                'Unable to load this artist profile.'
            );
          }
        }

        if (worksResult.status === 'fulfilled') {
          setArtworks(worksResult.value.artworks || []);
          setWorksTotal(worksResult.value.pagination?.total ?? 0);
        } else if (worksResult.status === 'rejected' && !isAbortError(worksResult.reason)) {
          setWorksError(
            worksResult.reason?.message ||
              'Unable to load works attributed to this artist.'
          );
          setArtworks([]);
          setWorksTotal(null);
        }
      } finally {
        if (!signal?.aborted) {
          setArtistLoading(false);
          setWorksLoading(false);
        }
      }
    },
    [artistId, initialArtist]
  );

  useEffect(() => {
    if (!artistId) return undefined;
    const controller = new AbortController();
    loadArtistBundle(controller.signal);
    return () => controller.abort();
  }, [artistId, loadArtistBundle, retryToken]);

  if (!isOpen) return null;

  const displayName = artist?.title || 'Artist Profile';
  const lifespan = formatArtistLifespan(artist?.birth_date, artist?.death_date);
  const biography = getArtistBiography(artist?.description);
  const totalWorksLabel =
    worksTotal === null
      ? 'Archiving...'
      : Number(worksTotal).toLocaleString('en-US');

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#181210]/70 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="artist-drawer-title"
        className="relative z-10 flex h-full w-full max-w-3xl flex-col overflow-y-auto bg-ivory text-charcoal shadow-2xl"
      >
        <div
          data-surface="dark"
          className="border-b border-[#B79A6A]/25 bg-[#261211] px-5 py-6 text-[#F5F0E7] sm:px-8 sm:py-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9B38C]">
                Artist Archive
              </p>
              <h2
                id="artist-drawer-title"
                className="mt-2 font-serif text-[2rem] font-normal leading-[1.12] text-[#F5F0E7] sm:text-[2.6rem]"
              >
                {displayName}
              </h2>
              <p className="mt-2 text-sm tabular-nums text-[#E2DACD]">
                {lifespan}
              </p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close artist profile"
              className="inline-flex min-h-[45px] min-w-[45px] shrink-0 items-center justify-center rounded-sm border border-[#F5F0E7]/25 text-[#F5F0E7] transition-colors hover:border-[#C9B38C] hover:bg-[#F5F0E7]/10"
            >
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div data-surface="light" className="flex-1 px-5 py-7 sm:px-8 sm:py-8">
          {artistLoading && !artist ? (
            <div role="status" aria-live="polite" className="space-y-4">
              <span className="sr-only">Loading artist biography...</span>
              <div className="h-4 w-28 animate-pulse bg-gesso" />
              <div className="h-4 w-full animate-pulse bg-limestone" />
              <div className="h-4 w-5/6 animate-pulse bg-limestone" />
              <div className="h-4 w-3/4 animate-pulse bg-limestone" />
            </div>
          ) : artistError ? (
            <div
              role="alert"
              className="border border-[#E7CACA] bg-[#F9ECEC] p-6 text-center"
            >
              <AlertCircle
                className="mx-auto h-8 w-8 text-[#8B2626]"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <p className="mt-3 font-serif text-xl text-charcoal">
                Unable to load artist details
              </p>
              <p className="mt-1.5 text-sm text-stone">{artistError}</p>
              <button
                type="button"
                onClick={() => setRetryToken((prev) => prev + 1)}
                className="mt-5 inline-flex min-h-[45px] items-center justify-center gap-2 bg-burgundy px-5 text-sm font-medium text-ivory transition-colors hover:bg-burgundy-hover"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try Again
              </button>
            </div>
          ) : (
            <>
              <dl className="grid grid-cols-2 gap-5 border-y border-gesso py-5 sm:grid-cols-4">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">
                    Born
                  </dt>
                  <dd className="mt-1 text-sm tabular-nums text-charcoal">
                    {formatSingleYear(artist?.birth_date)}
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">
                    Died
                  </dt>
                  <dd className="mt-1 text-sm tabular-nums text-charcoal">
                    {formatSingleYear(artist?.death_date)}
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">
                    Archive ID
                  </dt>
                  <dd className="mt-1 text-sm tabular-nums text-charcoal">
                    #{artist?.id}
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">
                    Archived Works
                  </dt>
                  <dd className="mt-1 text-sm tabular-nums text-charcoal">
                    {totalWorksLabel}
                  </dd>
                </div>
              </dl>

              <section aria-labelledby="artist-biography-heading" className="mt-7">
                <h3
                  id="artist-biography-heading"
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze"
                >
                  Curatorial Biography
                </h3>
                <div className="mt-3 max-w-[65ch] whitespace-pre-line text-[15px] leading-[1.75] text-charcoal">
                  {biography}
                </div>
              </section>

              <section
                aria-labelledby="artist-works-heading"
                className="mt-10 border-t border-gesso pt-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                      Collection Holdings
                    </p>
                    <h3
                      id="artist-works-heading"
                      className="mt-1 font-serif text-2xl font-normal text-charcoal"
                    >
                      Associated Artworks
                    </h3>
                  </div>

                  {worksTotal !== null && (
                    <span className="text-xs tabular-nums text-stone">
                      Showing {artworks.length} of{' '}
                      {Number(worksTotal).toLocaleString('en-US')}
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  {worksLoading ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                    >
                      <span className="sr-only">
                        Loading artworks attributed to this artist...
                      </span>
                      {Array.from({ length: 4 }, (_, index) => (
                        <div
                          key={index}
                          className="animate-pulse border border-mat-border bg-limestone p-4"
                          aria-hidden="true"
                        >
                          <div className="aspect-[4/5] bg-gesso" />
                          <div className="mt-4 h-5 w-4/5 bg-gesso" />
                          <div className="mt-2 h-3 w-1/2 bg-gesso" />
                        </div>
                      ))}
                    </div>
                  ) : worksError ? (
                    <div
                      role="alert"
                      className="border border-[#E7CACA] bg-[#F9ECEC] p-6 text-center"
                    >
                      <p className="text-sm text-stone">{worksError}</p>
                      <button
                        type="button"
                        onClick={() => setRetryToken((prev) => prev + 1)}
                        className="mt-4 inline-flex min-h-[45px] items-center justify-center gap-2 bg-burgundy px-5 text-sm font-medium text-ivory transition-colors hover:bg-burgundy-hover"
                      >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        Try Again
                      </button>
                    </div>
                  ) : artworks.length === 0 ? (
                    <div className="border border-gesso bg-warm-white px-6 py-10 text-center">
                      <Feather
                        className="mx-auto h-8 w-8 text-bronze-rule"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                      <p className="mt-3 font-serif text-xl text-charcoal">
                        No catalogued artworks linked
                      </p>
                      <p className="mt-1.5 text-sm text-stone">
                        The Art Institute of Chicago API does not list digitized works linked directly to this creator record.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {artworks.map((work) => (
                        <ArtworkCard key={work.id} artwork={work} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
