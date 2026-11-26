import { useState } from 'react';
import { Frame } from 'lucide-react';
import {
  getArtworkDetailUrl,
  getArtworkThumbnailUrl,
} from '../../utils/imageHelper';

export function formatArtistName(artwork) {
  if (artwork?.artist_title) return artwork.artist_title;
  if (artwork?.artist_display) {
    const firstLine = artwork.artist_display.split('\n')[0]?.trim();
    if (firstLine) return firstLine;
  }
  return 'Unknown Artist';
}

export function buildArtworkAlt(artwork) {
  const title = artwork?.title || 'Untitled Work';
  const artist = artwork?.artist_title;
  return artist
    ? `${title} by ${artist}`
    : `${title}, Art Institute of Chicago`;
}

export default function ArtworkFrameImage({
  artwork,
  highRes = false,
  eager = false,
  darkStage = false,
  aspectClass = 'aspect-[4/3]',
  paddingClass = 'p-4 sm:p-6',
}) {
  const [hasError, setHasError] = useState(false);
  const src = highRes
    ? getArtworkDetailUrl(artwork?.image_id)
    : getArtworkThumbnailUrl(artwork?.image_id);

  const intrinsicWidth = highRes ? 843 : 400;
  const intrinsicHeight = highRes ? 632 : 300;

  return (
    <div
      className={[
        'relative flex w-full items-center justify-center overflow-hidden border',
        aspectClass,
        paddingClass,
        darkStage
          ? 'border-ivory/12 bg-gallery-dark'
          : 'border-mat-border bg-limestone',
      ].join(' ')}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={buildArtworkAlt(artwork)}
          width={intrinsicWidth}
          height={intrinsicHeight}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setHasError(true)}
          className="artwork-hover-zoom max-h-full max-w-full object-contain"
        />
      ) : (
        <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
          <Frame
            className="h-9 w-9 text-gold"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <span
            className={[
              'mt-2.5 text-xs',
              darkStage ? 'text-[#C9C0B3]' : 'text-stone',
            ].join(' ')}
          >
            Archival image unavailable
          </span>
        </div>
      )}
    </div>
  );
}
