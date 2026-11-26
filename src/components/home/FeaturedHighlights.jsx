import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Frame } from 'lucide-react';
import { stripHtml } from '../../utils/imageHelper';
import SecondaryButton from '../SecondaryButton';
import ArtworkFrameImage, { formatArtistName } from './ArtworkFrameImage';

function HighlightsSkeleton() {
  return (
    <div role="status" aria-live="polite" className="mt-10">
      <p className="mb-6 text-sm text-stone">
        Curating featured works from the Art Institute of Chicago...
      </p>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        <div className="aspect-[4/3] animate-pulse rounded-sm border border-gesso bg-limestone lg:col-span-7" />
        <div className="flex flex-col justify-between rounded-sm border border-gesso bg-warm-white p-6 sm:p-8 lg:col-span-5">
          <div className="space-y-4">
            <div className="h-3 w-32 animate-pulse rounded-xs bg-limestone" />
            <div className="h-8 w-4/5 animate-pulse rounded-xs bg-limestone" />
            <div className="h-4 w-1/2 animate-pulse rounded-xs bg-limestone" />
            <div className="h-20 w-full animate-pulse rounded-xs bg-limestone" />
          </div>
          <div className="mt-8 h-11 w-44 animate-pulse rounded-sm bg-limestone" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="rounded-sm border border-gesso bg-warm-white p-3.5"
          >
            <div className="aspect-[4/3] animate-pulse bg-limestone" />
            <div className="mt-4 h-6 w-3/4 animate-pulse rounded-xs bg-limestone" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded-xs bg-limestone" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedHighlights({
  artworks = [],
  totalCount = null,
  isLoading = false,
  error = null,
  onRetry,
}) {
  const leadArtwork = artworks[0] || null;
  const companionArtworks = artworks.slice(1, 4);
  const leadEssay = leadArtwork
    ? stripHtml(leadArtwork.short_description)
    : '';

  return (
    <section
      id="curated-highlights"
      data-surface="light"
      aria-labelledby="curated-highlights-heading"
      className="scroll-mt-20 bg-ivory py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-gesso pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              Collection Highlights
            </p>
            <h2
              id="curated-highlights-heading"
              className="mt-2 font-serif text-[1.875rem] font-normal leading-[1.14] tracking-[-0.01em] text-charcoal sm:text-[2.5rem]"
            >
              Masterpieces on View
            </h2>
            <p className="mt-2 max-w-2xl text-base text-stone">
              Selected works from the permanent galleries, framed with original
              aspect ratios and archival provenance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {typeof totalCount === 'number' && totalCount > 0 && (
              <p className="text-xs font-medium tabular-nums text-stone">
                {totalCount.toLocaleString()} archived works
              </p>
            )}
            <SecondaryButton to="/artworks">
              <span>View All Artworks</span>
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            </SecondaryButton>
          </div>
        </div>

        {isLoading ? (
          <HighlightsSkeleton />
        ) : error ? (
          <div
            role="alert"
            className="mx-auto mt-12 max-w-md rounded-sm border border-gesso bg-warm-white p-8 text-center"
          >
            <AlertCircle
              className="mx-auto h-8 w-8 text-venetian"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h3 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
              Unable to Load Featured Gallery
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{error}</p>
            {onRetry && (
              <div className="mt-6">
                <SecondaryButton onClick={onRetry}>Try Again</SecondaryButton>
              </div>
            )}
          </div>
        ) : !leadArtwork ? (
          <div className="mt-12 rounded-sm border border-gesso bg-warm-white px-6 py-16 text-center">
            <Frame
              className="mx-auto h-10 w-10 text-gold"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <h3 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
              No Featured Works Returned
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone">
              The museum archive returned an empty selection for this gallery
              room. Reload to request the current holdings again.
            </p>
            {onRetry && (
              <div className="mt-6">
                <SecondaryButton onClick={onRetry}>
                  Reload Selection
                </SecondaryButton>
              </div>
            )}
          </div>
        ) : (
          <>
            <article className="group mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
              <Link
                to={`/artworks/${leadArtwork.id}`}
                aria-label={`Inspect ${leadArtwork.title || 'Untitled Work'} by ${formatArtistName(leadArtwork)}`}
                className="block rounded-sm border border-[#C9B38C]/55 bg-[#241614] p-3 transition-colors duration-250 hover:border-burgundy sm:p-4 lg:col-span-7"
              >
                <ArtworkFrameImage
                  artwork={leadArtwork}
                  highRes
                  darkStage
                  aspectClass="aspect-[4/3] h-full min-h-[280px] sm:min-h-[380px]"
                  paddingClass="p-4 sm:p-7 lg:p-9"
                />
              </Link>

              <div className="flex flex-col justify-between rounded-sm border border-gesso bg-warm-white p-6 sm:p-8 lg:col-span-5">
                <div>
                  {leadArtwork.department_title && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
                      {leadArtwork.department_title}
                    </p>
                  )}

                  <h3 className="mt-3 font-serif text-2xl font-medium leading-[1.16] text-charcoal sm:text-[2rem]">
                    <Link
                      to={`/artworks/${leadArtwork.id}`}
                      className="transition-colors hover:text-burgundy hover:underline hover:underline-offset-4"
                    >
                      {leadArtwork.title || 'Untitled Work'}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm font-medium text-stone">
                    {formatArtistName(leadArtwork)}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-4 border-y border-gesso py-4 text-xs">
                    <div>
                      <p className="font-semibold uppercase tracking-[0.14em] text-ash">
                        Date
                      </p>
                      <p className="mt-1 text-sm tabular-nums text-charcoal">
                        {leadArtwork.date_display || 'Date unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase tracking-[0.14em] text-ash">
                        Medium
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-charcoal">
                        {leadArtwork.medium_display || 'Not recorded'}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-[65ch] line-clamp-4 text-sm leading-[1.7] text-stone">
                    {leadEssay ||
                      'Curatorial description is not currently archived for this artwork.'}
                  </p>
                </div>

                <div className="mt-7 pt-2">
                  <SecondaryButton to={`/artworks/${leadArtwork.id}`}>
                    <span>Inspect Masterpiece</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </SecondaryButton>
                </div>
              </div>
            </article>

            {companionArtworks.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {companionArtworks.map((artwork) => (
                  <article key={artwork.id} className="h-full">
                    <Link
                      to={`/artworks/${artwork.id}`}
                      className="group flex h-full flex-col overflow-hidden rounded-sm border border-gesso bg-warm-white transition-colors duration-250 hover:border-bronze-rule"
                    >
                      <div className="border-b border-gesso bg-[#E8DFD1] p-2.5">
                        <div className="border border-[#B79A6A]/55 bg-limestone">
                          <ArtworkFrameImage
                            artwork={artwork}
                            aspectClass="aspect-[4/3]"
                            paddingClass="p-3.5"
                          />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <h3 className="line-clamp-1 font-serif text-[1.3rem] font-semibold leading-[1.25] text-charcoal transition-colors group-hover:text-burgundy">
                            {artwork.title || 'Untitled Work'}
                          </h3>
                          <p className="mt-1 line-clamp-1 text-sm text-stone">
                            {formatArtistName(artwork)}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 pt-2 text-xs text-ash">
                          <span className="tabular-nums">
                            {artwork.date_display || 'Date unknown'}
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-stone transition-transform duration-200 group-hover:translate-x-1 group-hover:text-burgundy"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
