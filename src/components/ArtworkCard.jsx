
import { ArrowRight, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArtworkThumbnailUrl } from '../utils/imageHelper';

export default function ArtworkCard({ artwork, variant = 'default' }) {
  const isDark = variant === 'onDark';
  const imageUrl = getArtworkThumbnailUrl(artwork.image_id);

  const imageAlt = `${artwork.title || 'Untitled artwork'} by ${
    artwork.artist_title || 'Unknown artist'
  }`;

  return (
    <article className="group min-w-0">
      <Link
        to={`/artworks/${artwork.id}`}
        aria-label={`View ${artwork.title || 'untitled artwork'} by ${
          artwork.artist_title || 'unknown artist'
        }`}
        className={[
          'block focus-visible:outline-2 focus-visible:outline-offset-4',
          isDark
            ? 'focus-visible:outline-[#B79A6A]'
            : 'focus-visible:outline-burgundy',
        ].join(' ')}
      >
        <div
          className={[
            'overflow-hidden border p-3 sm:p-4',
            isDark
              ? 'border-[#B79A6A]/45 bg-[#17110F] shadow-[0_12px_30px_rgba(8,5,4,0.45)]'
              : 'border-mat-border bg-[#EDE6DA] shadow-[0_3px_12px_rgba(33,29,25,0.07)]',
          ].join(' ')}
        >
          <div
            className={[
              'flex aspect-[4/5] items-center justify-center overflow-hidden',
              isDark ? 'bg-[#17110F]' : 'bg-[#EDE6DA]',
            ].join(' ')}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt}
                width="400"
                height="500"
                loading="lazy"
                className="artwork-hover-zoom h-full w-full object-contain"
              />
            ) : (
              <div
                role="img"
                aria-label={`${artwork.title || 'Artwork'} image unavailable`}
                className={[
                  'flex h-full w-full flex-col items-center justify-center gap-3 px-5 text-center',
                  isDark
                    ? 'bg-[#1A1614] text-[#C9C0B3]'
                    : 'bg-[#E5DCCF] text-stone',
                ].join(' ')}
              >
                <ImageOff
                  className="h-9 w-9 text-[#B79A6A]"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <span className="font-serif text-lg">
                  Image not available
                </span>
                <span className="text-xs">
                  This work has no digitized image
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 pt-4">
          <div className="min-w-0 flex-1">
            <h2
              className={[
                'line-clamp-2 font-serif text-xl leading-tight transition-colors sm:text-[1.35rem]',
                isDark
                  ? 'text-[#F5F0E7] group-hover:text-[#C9B38C]'
                  : 'text-charcoal group-hover:text-burgundy',
              ].join(' ')}
            >
              {artwork.title || 'Untitled'}
            </h2>

            <p
              className={[
                'mt-1.5 line-clamp-1 text-sm',
                isDark ? 'text-[#C9C0B3]' : 'text-stone',
              ].join(' ')}
            >
              {artwork.artist_title || 'Artist unknown'}
            </p>

            <p
              className={[
                'mt-1 text-xs tabular-nums',
                isDark ? 'text-[#C9B38C]' : 'text-ash',
              ].join(' ')}
            >
              {artwork.date_display || 'Date unrecorded'}
            </p>
          </div>

          <span
            className={[
              'mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200 group-hover:translate-x-1',
              isDark
                ? 'border-ivory/20 text-[#C9C0B3] group-hover:border-[#C9B38C] group-hover:text-[#F5F0E7]'
                : 'border-gesso text-stone group-hover:border-burgundy group-hover:text-burgundy',
            ].join(' ')}
          >
            <ArrowRight
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
