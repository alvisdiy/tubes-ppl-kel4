import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Frame } from 'lucide-react';
import { getArtworkThumbnailUrl } from '../utils/imageHelper';

/**
 * Museum-style framed artwork card for exhibition grids.
 * Preserves aspect ratio with object-contain inside a Limestone Tint mat
 * and never overlays text or badges on top of the artwork image.
 */
export default function ArtworkCard({ artwork }) {
  const [failedImageId, setFailedImageId] = useState(null);

  if (!artwork) return null;

  const title = artwork.title || 'Untitled Work';
  const artistName =
    artwork.artist_title ||
    (artwork.artist_display ? artwork.artist_display.split('\n')[0].trim() : '') ||
    'Unknown Artist';
  const dateDisplay = artwork.date_display || 'Date unknown';
  const departmentTitle = artwork.department_title || null;

  const imageUrl = getArtworkThumbnailUrl(artwork.image_id);
  const showFallback = !imageUrl || failedImageId === artwork.image_id;
  const altText =
    artistName !== 'Unknown Artist'
      ? `${title} by ${artistName}`
      : `${title}, Art Institute of Chicago`;

  return (
    <Link
      to={`/artworks/${artwork.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-gesso bg-warm-white transition-colors duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b border-[#DDD4C5] bg-limestone p-4">
        {showFallback ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Frame
              className="h-8 w-8 text-gold"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <span className="text-xs text-ash">Archival image unavailable</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={altText}
            loading="lazy"
            onError={() => setFailedImageId(artwork.image_id)}
            className="max-h-full max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <h3 className="line-clamp-2 font-serif text-[1.375rem] leading-[1.3] font-semibold text-charcoal transition-colors duration-250 group-hover:text-burgundy">
            {title}
          </h3>
          <p className="mt-1.5 line-clamp-1 text-sm font-medium text-stone">
            {artistName}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gesso pt-3 text-xs">
          <span className="shrink-0 tabular-nums text-ash">{dateDisplay}</span>
          {departmentTitle ? (
            <span className="line-clamp-1 text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-bronze">
              {departmentTitle}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}