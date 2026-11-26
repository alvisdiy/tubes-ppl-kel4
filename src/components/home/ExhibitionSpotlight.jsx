import { AlertCircle, ArrowRight, Frame } from 'lucide-react';
import { stripHtml } from '../../utils/imageHelper';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import ArtworkFrameImage, { formatArtistName } from './ArtworkFrameImage';

export default function ExhibitionSpotlight({
  artwork = null,
  isLoading = false,
  error = null,
  onRetry,
}) {
  const curatorialText = artwork ? stripHtml(artwork.short_description) : '';
  const departmentHref = artwork?.department_id
    ? `/artworks?department=${encodeURIComponent(artwork.department_id)}`
    : '/artworks';
  const primaryCategory = artwork?.category_titles?.[0] || null;

  return (
    <section
      id="spotlight"
      data-surface="dark"
      aria-labelledby="curatorial-spotlight-heading"
      className="relative overflow-hidden border-y border-ivory/10 bg-[#261211] py-16 text-ivory lg:py-24"
    >
      {/* Subtle museum track-lighting radial warmth matching the Private Viewing room aesthetic. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 28% 50%, rgba(92, 39, 39, 0.34) 0%, rgba(26, 14, 13, 0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center"
          >
            <div className="aspect-[4/3] animate-pulse rounded-sm bg-gallery-dark lg:col-span-7" />
            <div className="space-y-4 lg:col-span-5">
              <p className="text-sm text-[#C9C0B3]">
                Preparing private viewing spotlight from the gallery archive...
              </p>
              <div className="h-10 w-3/4 animate-pulse rounded-xs bg-ivory/10" />
              <div className="h-24 w-full animate-pulse rounded-xs bg-ivory/10" />
              <div className="h-11 w-48 animate-pulse rounded-sm bg-ivory/10" />
            </div>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mx-auto max-w-md rounded-sm border border-ivory/18 bg-gallery-dark p-8 text-center"
          >
            <AlertCircle
              className="mx-auto h-8 w-8 text-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2
              id="curatorial-spotlight-heading"
              className="mt-4 font-serif text-2xl font-semibold text-ivory"
            >
              Spotlight Temporarily Unavailable
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#C9C0B3]">
              {error}
            </p>
            {onRetry && (
              <div className="mt-6">
                <SecondaryButton variant="onDark" onClick={onRetry}>
                  Try Again
                </SecondaryButton>
              </div>
            )}
          </div>
        ) : !artwork ? (
          <div className="mx-auto max-w-md py-10 text-center">
            <Frame
              className="mx-auto h-9 w-9 text-gold"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <h2
              id="curatorial-spotlight-heading"
              className="mt-4 font-serif text-2xl font-semibold text-ivory"
            >
              No Spotlight Work Archived
            </h2>
            <p className="mt-2 text-sm text-[#C9C0B3]">
              Reload this gallery feature wall to retrieve a highlighted work.
            </p>
            {onRetry && (
              <div className="mt-6">
                <SecondaryButton variant="onDark" onClick={onRetry}>
                  Reload Spotlight
                </SecondaryButton>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Framed canvas stage placed first so the artwork leads before metadata (DESIGN.md Art First). */}
            <div className="group lg:col-span-7">
              <div className="rounded-sm border-2 border-[#B79A6A]/55 bg-[#17110F] p-3 shadow-[0_22px_54px_rgba(8,5,4,0.58)] sm:p-5">
                <ArtworkFrameImage
                  artwork={artwork}
                  highRes
                  darkStage
                  aspectClass="aspect-[4/3] min-h-[260px] sm:min-h-[370px]"
                  paddingClass="p-4 sm:p-7"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9B38C]">
                Private Viewing Spotlight
              </p>

              <h2
                id="curatorial-spotlight-heading"
                className="mt-3 font-serif text-[2rem] font-normal leading-[1.12] tracking-[-0.01em] text-[#F5F0E7] sm:text-[2.75rem]"
              >
                {artwork.title || 'Untitled Work'}
              </h2>

              <p className="mt-2.5 text-base font-medium text-[#E5DDD0]">
                {formatArtistName(artwork)}
              </p>
              <p className="mt-0.5 text-sm tabular-nums text-[#C9C0B3]">
                {artwork.date_display || 'Date unknown'}
              </p>

              <p className="mt-5 max-w-[58ch] line-clamp-4 text-sm leading-[1.7] text-[#E2DACD] sm:text-[15px]">
                {curatorialText ||
                  'Curatorial description is not currently archived for this artwork.'}
              </p>

              {/* 2x2 structured museum placard metadata grid matching the Private Viewing design language. */}
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-ivory/14 py-5 text-xs">
                {artwork.medium_display && (
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[#C9B38C]">
                      Medium
                    </dt>
                    <dd className="mt-1 line-clamp-2 text-sm text-[#F5F0E7]">
                      {artwork.medium_display}
                    </dd>
                  </div>
                )}

                {artwork.department_title && (
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[#C9B38C]">
                      Department
                    </dt>
                    <dd className="mt-1 line-clamp-2 text-sm text-[#F5F0E7]">
                      {artwork.department_title}
                    </dd>
                  </div>
                )}

                {primaryCategory && (
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.16em] text-[#C9B38C]">
                      Category
                    </dt>
                    <dd className="mt-1 line-clamp-2 text-sm text-[#F5F0E7]">
                      {primaryCategory}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="font-semibold uppercase tracking-[0.16em] text-[#C9B38C]">
                    Archive ID
                  </dt>
                  <dd className="mt-1 text-sm tabular-nums text-[#F5F0E7]">
                    AIC #{artwork.id}
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <PrimaryButton to={`/artworks/${artwork.id}`} variant="ivory">
                  <span>Inspect Artwork</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </PrimaryButton>

                <SecondaryButton to={departmentHref} variant="onDark">
                  {artwork.department_title
                    ? `More in ${artwork.department_title}`
                    : 'Explore Wing'}
                </SecondaryButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
