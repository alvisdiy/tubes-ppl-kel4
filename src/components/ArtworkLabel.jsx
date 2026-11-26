import { Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stripHtml } from '../utils/imageHelper';
import SecondaryButton from './SecondaryButton';

function formatCategories(categoryTitles) {
  if (!Array.isArray(categoryTitles) || categoryTitles.length === 0) {
    return null;
  }
  const cleaned = categoryTitles.filter(Boolean);
  return cleaned.length > 0 ? cleaned.join(', ') : null;
}

export default function ArtworkLabel({
  artwork,
  hasImage = false,
  onOpenFullscreen,
}) {
  if (!artwork) return null;

  const curatorialText = stripHtml(
    artwork.description || artwork.short_description
  );
  const categoriesText = formatCategories(artwork.category_titles);

  const primaryMetadata = [
    { label: 'Medium', value: artwork.medium_display },
    { label: 'Dimensions', value: artwork.dimensions },
    { label: 'Department', value: artwork.department_title },
    { label: 'Categories', value: categoriesText },
  ].filter((item) => Boolean(item.value));

  const secondaryMetadata = [
    { label: 'Origin', value: artwork.place_of_origin },
    { label: 'Credit Line', value: artwork.credit_line },
  ].filter((item) => Boolean(item.value));

  const eyebrowText =
    artwork.department_title || artwork.classification_title || 'Artwork';

  return (
    <div className="flex flex-col">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9B38C]">
        {eyebrowText}
      </p>

      <h1 className="mt-3 font-serif text-[2.25rem] font-normal leading-[1.1] tracking-[-0.01em] text-[#F5F0E7] sm:text-[3rem]">
        {artwork.title || 'Untitled Work'}
      </h1>

      {(artwork.artist_display || artwork.artist_title) && (
        <p className="mt-3 whitespace-pre-line text-base font-medium leading-relaxed text-[#E5DDD0]">
          {artwork.artist_display || artwork.artist_title}
        </p>
      )}

      {artwork.date_display && (
        <p className="mt-1 text-sm tabular-nums text-[#C9C0B3]">
          {artwork.date_display}
        </p>
      )}

      <div className="mt-6 max-w-[65ch] whitespace-pre-line text-sm leading-[1.7] text-[#E2DACD] sm:text-[15px]">
        {curatorialText ||
          'Curatorial description is not currently archived for this artwork.'}
      </div>

      {(primaryMetadata.length > 0 || secondaryMetadata.length > 0) && (
        <dl className="mt-7 border-y border-ivory/15 py-5 text-xs">
          {primaryMetadata.length > 0 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {primaryMetadata.map((item) => (
                <div key={item.label}>
                  <dt className="font-semibold uppercase tracking-[0.16em] text-[#C9B38C]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#F5F0E7]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>
          )}

          {secondaryMetadata.length > 0 && (
            <div
              className={[
                'grid grid-cols-1 gap-4',
                primaryMetadata.length > 0
                  ? 'mt-5 border-t border-ivory/10 pt-4'
                  : '',
              ].join(' ')}
            >
              {secondaryMetadata.map((item) => (
                <div key={item.label}>
                  <dt className="font-semibold uppercase tracking-[0.16em] text-[#C9B38C]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#E2DACD]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>
          )}
        </dl>
      )}

      {(hasImage || artwork.department_id) && (
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {hasImage && onOpenFullscreen && (
            <SecondaryButton
              variant="onDark"
              onClick={onOpenFullscreen}
              aria-label={`View ${artwork.title || 'artwork'} in fullscreen`}
            >
              <Maximize2 className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              View in Fullscreen
            </SecondaryButton>
          )}

          {artwork.department_id && artwork.department_title && (
            <Link
              to={`/artworks?department=${encodeURIComponent(artwork.department_id)}`}
              className="inline-flex min-h-[45px] items-center px-2 text-sm font-medium text-[#D8CFC2] underline decoration-[#B79A6A]/50 underline-offset-4 transition-colors hover:text-[#F5F0E7] hover:decoration-[#C9B38C]"
            >
              Explore {artwork.department_title}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
