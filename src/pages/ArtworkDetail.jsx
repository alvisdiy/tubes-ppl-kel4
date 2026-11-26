import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Frame, RefreshCw, X } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ArtworkCard from '../components/ArtworkCard';
import ArtworkLabel from '../components/ArtworkLabel';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import {
  fetchArtworkById,
  fetchRelatedArtworks,
} from '../services/artworkService';
import { getArtworkDetailUrl } from '../utils/imageHelper';

function isCancelError(err) {
  return err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED';
}

function buildArtworkAlt(artwork) {
  const title = artwork?.title || 'Untitled Work';
  const artist = artwork?.artist_title;
  return artist
    ? `${title} by ${artist}`
    : `${title}, Art Institute of Chicago`;
}

function DetailSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14"
    >
      <span className="sr-only">
        Loading artwork details from the museum archive...
      </span>

      <div className="lg:col-span-7">
        <div className="aspect-[4/3] animate-pulse rounded-sm border-2 border-[#B79A6A]/25 bg-[#17110F]" />
      </div>

      <div className="space-y-5 lg:col-span-5">
        <div className="h-3 w-32 animate-pulse rounded-xs bg-ivory/15" />
        <div className="h-11 w-4/5 animate-pulse rounded-xs bg-ivory/15" />
        <div className="h-5 w-1/2 animate-pulse rounded-xs bg-ivory/10" />
        <div className="space-y-2.5 pt-2">
          <div className="h-4 w-full animate-pulse rounded-xs bg-ivory/10" />
          <div className="h-4 w-full animate-pulse rounded-xs bg-ivory/10" />
          <div className="h-4 w-3/4 animate-pulse rounded-xs bg-ivory/10" />
        </div>
        <div className="grid grid-cols-2 gap-6 border-y border-ivory/15 py-5">
          <div className="h-10 animate-pulse rounded-xs bg-ivory/10" />
          <div className="h-10 animate-pulse rounded-xs bg-ivory/10" />
          <div className="h-10 animate-pulse rounded-xs bg-ivory/10" />
          <div className="h-10 animate-pulse rounded-xs bg-ivory/10" />
        </div>
      </div>
    </div>
  );
}

export default function ArtworkDetail() {
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [relatedArtworks, setRelatedArtworks] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const dialogRef = useRef(null);

  const loadArtwork = useCallback(
    async (signal) => {
      setIsLoading(true);
      setError(null);
      setArtwork(null);
      setRelatedArtworks([]);
      setImageError(false);

      try {
        const data = await fetchArtworkById(id, { signal });
        if (!data) {
          throw new Error(
            'The requested record could not be found in the archive.'
          );
        }
        setArtwork(data);
      } catch (err) {
        if (isCancelError(err)) return;
        setError(
          err.message || 'Unable to load this artwork from the museum archive.'
        );
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [id]
  );

  useEffect(() => {
    const controller = new AbortController();
    setIsFullscreenOpen(false);
    loadArtwork(controller.signal);
    return () => controller.abort();
  }, [loadArtwork]);

  useEffect(() => {
    if (!artwork?.department_id) {
      setRelatedArtworks([]);
      return undefined;
    }

    const controller = new AbortController();
    setRelatedLoading(true);

    fetchRelatedArtworks({
      departmentId: artwork.department_id,
      excludeId: artwork.id,
      limit: 4,
      signal: controller.signal,
    })
      .then((items) => {
        setRelatedArtworks(items);
      })
      .catch((err) => {
        if (isCancelError(err)) return;
        setRelatedArtworks([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setRelatedLoading(false);
        }
      });

    return () => controller.abort();
  }, [artwork?.id, artwork?.department_id]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isFullscreenOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isFullscreenOpen && dialog.open) {
      dialog.close();
    }
  }, [isFullscreenOpen]);

  const detailImageUrl = getArtworkDetailUrl(artwork?.image_id);
  const hasValidImage = Boolean(detailImageUrl && !imageError);
  const isNotFound = Boolean(
    error && error.toLowerCase().includes('not be found')
  );

  return (
    <MainLayout heroOverlay fullBleed>
      <section
        data-surface="dark"
        className="relative min-h-[80vh] overflow-x-clip bg-[#261211] pt-24 pb-20 text-ivory sm:pt-28 lg:pb-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 30% 35%, rgba(92, 39, 39, 0.34) 0%, rgba(26, 14, 13, 0) 72%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <Link
              to="/artworks"
              className="inline-flex min-h-[45px] items-center gap-2 text-sm font-medium text-[#D8CFC2] transition-colors hover:text-[#F5F0E7]"
            >
              <ArrowLeft
                className="h-4 w-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              Back to Exhibition
            </Link>
          </div>

          {isLoading ? (
            <DetailSkeleton />
          ) : error ? (
            <div
              role="alert"
              className="mx-auto mt-10 max-w-xl rounded-sm border border-ivory/18 bg-[#17110F] p-8 text-center sm:p-10"
            >
              {isNotFound ? (
                <Frame
                  className="mx-auto h-9 w-9 text-[#B79A6A]"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              ) : (
                <AlertCircle
                  className="mx-auto h-9 w-9 text-[#B79A6A]"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              )}

              <h1 className="mt-4 font-serif text-3xl font-normal text-[#F5F0E7]">
                {isNotFound ? 'Artwork Not Found' : 'Unable to Load Artwork'}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-[#C9C0B3]">
                {error}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <SecondaryButton
                  variant="onDark"
                  onClick={() => loadArtwork()}
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Try Again
                </SecondaryButton>

                <PrimaryButton to="/artworks" variant="ivory">
                  Return to Exhibition
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                <div className="lg:col-span-7">
                  <div className="rounded-sm border-2 border-[#B79A6A]/55 bg-[#17110F] p-4 shadow-[0_24px_60px_rgba(8,5,4,0.6)] sm:p-6">
                    <div className="flex min-h-[260px] items-center justify-center overflow-hidden border border-ivory/12 bg-gallery-dark p-3 sm:min-h-[400px] sm:p-6">
                      {hasValidImage ? (
                        <img
                          src={detailImageUrl}
                          alt={buildArtworkAlt(artwork)}
                          width={843}
                          height={632}
                          loading="eager"
                          decoding="async"
                          onError={() => setImageError(true)}
                          className="max-h-[58vh] w-auto max-w-full object-contain sm:max-h-[75vh]"
                        />
                      ) : (
                        <div
                          role="img"
                          aria-label={`${artwork.title || 'Artwork'} archival image unavailable`}
                          className="flex flex-col items-center justify-center px-6 py-14 text-center"
                        >
                          <Frame
                            className="h-10 w-10 text-[#B79A6A]"
                            strokeWidth={1.25}
                            aria-hidden="true"
                          />
                          <p className="mt-3 font-serif text-xl text-[#F5F0E7]">
                            Archival image unavailable
                          </p>
                          <p className="mt-1 text-xs text-[#C9C0B3]">
                            This work has no digitized image in the archive
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <ArtworkLabel
                    artwork={artwork}
                    hasImage={hasValidImage}
                    onOpenFullscreen={() => setIsFullscreenOpen(true)}
                  />
                </div>
              </div>

              {(relatedLoading || relatedArtworks.length > 0) && (
                <section
                  aria-labelledby="related-artworks-heading"
                  className="mt-16 border-t border-ivory/12 pt-14"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9B38C]">
                    More from this Wing
                  </p>
                  <h2
                    id="related-artworks-heading"
                    className="mt-2 font-serif text-[1.875rem] font-normal leading-[1.15] text-[#F5F0E7] sm:text-[2.25rem]"
                  >
                    {artwork.department_title
                      ? `Related in ${artwork.department_title}`
                      : 'Related Artworks'}
                  </h2>

                  {relatedLoading ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      <span className="sr-only">
                        Loading related artworks...
                      </span>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div
                          key={index}
                          className="aspect-[4/5] animate-pulse rounded-sm border border-ivory/10 bg-[#17110F]"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {relatedArtworks.map((item) => (
                        <ArtworkCard
                          key={item.id}
                          artwork={item}
                          variant="onDark"
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </div>
      </section>

      <dialog
        ref={dialogRef}
        aria-label={
          artwork?.title
            ? `Fullscreen view of ${artwork.title}`
            : 'Fullscreen artwork view'
        }
        onClose={() => setIsFullscreenOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            setIsFullscreenOpen(false);
          }
        }}
        className="m-auto max-h-[96vh] max-w-[96vw] border border-[#B79A6A]/45 bg-[#17110F] p-0 text-[#F5F0E7] shadow-2xl backdrop:bg-black/85"
      >
        <div className="flex flex-col p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 pb-3">
            <div className="min-w-0">
              <p className="truncate font-serif text-lg text-[#F5F0E7]">
                {artwork?.title || 'Untitled Work'}
              </p>
              {artwork?.artist_title && (
                <p className="truncate text-xs text-[#C9C0B3]">
                  {artwork.artist_title}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreenOpen(false)}
              aria-label="Close fullscreen view"
              className="inline-flex min-h-[45px] min-w-[45px] shrink-0 items-center justify-center rounded-sm border border-ivory/25 text-[#F5F0E7] transition-colors hover:border-[#C9B38C] hover:bg-ivory/10"
            >
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          {hasValidImage && (
            <div className="flex items-center justify-center overflow-hidden bg-gallery-dark p-2 sm:p-4">
              <img
                src={detailImageUrl}
                alt={buildArtworkAlt(artwork)}
                width={843}
                height={632}
                className="max-h-[80vh] w-auto max-w-[90vw] object-contain"
              />
            </div>
          )}
        </div>
      </dialog>
    </MainLayout>
  );
}
