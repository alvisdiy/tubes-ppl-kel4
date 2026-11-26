
import { ArrowRight, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArtworkThumbnailUrl } from '../utils/imageHelper';

export default function ArtworkCard({ artwork }) {
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
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
      >
        <div className="overflow-hidden border border-mat-border bg-[#EDE6DA] p-3 shadow-[0_3px_12px_rgba(33,29,25,0.07)] sm:p-4">
          <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#EDE6DA]">
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
                className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#E5DCCF] px-5 text-center text-stone"
              >
                <ImageOff
                  className="h-9 w-9"
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
            <h2 className="line-clamp-2 font-serif text-xl leading-tight text-charcoal transition-colors group-hover:text-burgundy sm:text-[1.35rem]">
              {artwork.title || 'Untitled'}
            </h2>

            <p className="mt-1.5 line-clamp-1 text-sm text-stone">
              {artwork.artist_title || 'Artist unknown'}
            </p>

            <p className="mt-1 text-xs tabular-nums text-ash">
              {artwork.date_display || 'Date unrecorded'}
            </p>
          </div>

          <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gesso text-stone transition-all duration-200 group-hover:translate-x-1 group-hover:border-burgundy group-hover:text-burgundy">
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
