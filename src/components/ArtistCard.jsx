import { useEffect, useState } from 'react';
import { ArrowRight, Feather } from 'lucide-react';
import { fetchArtworksByArtist } from '../services/artistService';
import { getArtworkThumbnailUrl } from '../utils/imageHelper';
import {
  formatArtistLifespan,
  getArtistBiography,
  getArtistInitials,
} from './artists/artistHelpers';

export default function ArtistCard({
  artist,
  isSelected = false,
  onSelect,
}) {
  const [previewArtwork, setPreviewArtwork] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!artist?.id) return undefined;

    const controller = new AbortController();
    setPreviewArtwork(null);
    setImageError(false);

    fetchArtworksByArtist(artist.id, {
      limit: 1,
      signal: controller.signal,
    })
      .then((result) => {
        if (controller.signal.aborted) return;
        const firstWithImage = (result.artworks || []).find((item) => item.image_id);
        setPreviewArtwork(firstWithImage || null);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setPreviewArtwork(null);
        }
      });

    return () => controller.abort();
  }, [artist?.id]);

  if (!artist) return null;

  const artistName = artist.title || 'Unknown Creator';
  const lifespan = formatArtistLifespan(artist.birth_date, artist.death_date);
  const bioText = getArtistBiography(artist.description);
  const initials = getArtistInitials(artistName);
  const previewUrl = getArtworkThumbnailUrl(previewArtwork?.image_id);
  const hasPreviewImage = Boolean(previewUrl && !imageError);

  return (
    <article className="group min-w-0">
      <button
        type="button"
        onClick={() => onSelect?.(artist)}
        aria-pressed={isSelected}
        aria-label={`View profile and works for ${artistName}`}
        className={[
          'flex h-full w-full flex-col overflow-hidden border text-left transition-all duration-250',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy',
          isSelected
            ? 'border-burgundy bg-warm-white ring-2 ring-burgundy/25 shadow-[0_10px_28px_rgba(69,29,29,0.14)]'
            : 'border-gesso bg-warm-white shadow-[0_3px_12px_rgba(33,29,25,0.06)] hover:border-bronze-rule hover:shadow-[0_10px_26px_rgba(33,29,25,0.1)]',
        ].join(' ')}
      >
        <div className="relative aspect-square w-full overflow-hidden border-b border-gesso bg-limestone">
          {hasPreviewImage ? (
            <img
              src={previewUrl}
              alt={`${previewArtwork.title || 'Representative work'} by ${artistName}`}
              width={400}
              height={400}
              loading="lazy"
              onError={() => setImageError(true)}
              className={[
                'h-full w-full object-cover contrast-105 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isSelected
                  ? 'scale-[1.02] grayscale-0'
                  : 'grayscale group-hover:scale-[1.025] group-hover:grayscale-0',
              ].join(' ')}
            />
          ) : (
            <div
              className={[
                'flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center transition-colors duration-300',
                isSelected
                  ? 'bg-[#261211] text-[#F5F0E7]'
                  : 'bg-[#261211] text-[#F5F0E7] group-hover:bg-[#321414]',
              ].join(' ')}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#B79A6A]/45 bg-[#1A1614]/55">
                <span className="font-serif text-3xl font-normal tracking-[0.06em] text-[#F5F0E7]">
                  {initials}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9B38C]">
                <Feather className="h-3.5 w-3.5" strokeWidth={1.35} aria-hidden="true" />
                <span>Artist Archive</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze">
                {isSelected ? 'Selected Profile' : 'Creator'}
              </p>
              <span className="text-xs tabular-nums text-ash">
                {lifespan}
              </span>
            </div>

            <h3
              className={[
                'mt-2 line-clamp-2 font-serif text-[1.3rem] font-semibold leading-[1.25] transition-colors',
                isSelected
                  ? 'text-burgundy'
                  : 'text-charcoal group-hover:text-burgundy',
              ].join(' ')}
            >
              {artistName}
            </h3>

            <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-stone">
              {bioText}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-gesso pt-3.5">
            <span className="text-xs font-medium text-burgundy">
              {isSelected ? 'Viewing archive' : 'View profile & works'}
            </span>

            <span
              className={[
                'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 group-hover:translate-x-1',
                isSelected
                  ? 'border-burgundy bg-burgundy text-ivory'
                  : 'border-gesso text-stone group-hover:border-burgundy group-hover:text-burgundy',
              ].join(' ')}
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
