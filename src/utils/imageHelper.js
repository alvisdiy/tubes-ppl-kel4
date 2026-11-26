const IIIF_BASE_URL =
  import.meta.env.VITE_AIC_IIIF_BASE_URL || '/api/iiif';

/**
 * Builds an Art Institute of Chicago IIIF image URL for a given image_id.
 * Returns null when imageId is missing so callers can render a graceful fallback.
 *
 * @param {string | null | undefined} imageId
 * @param {number} width
 * @returns {string | null}
 */
export function getIIIFImageUrl(imageId, width = 400) {
  if (!imageId) return null;
  return `${IIIF_BASE_URL}/${imageId}/full/${width},/0/default.jpg`;
}

/**
 * Standard 400px-wide IIIF thumbnail URL for artwork cards.
 */
export function getArtworkThumbnailUrl(imageId) {
  return getIIIFImageUrl(imageId, 400);
}

/**
 * High-resolution 843px-wide IIIF URL for artwork detail views.
 */
export function getArtworkDetailUrl(imageId) {
  return getIIIFImageUrl(imageId, 843);
}

/**
 * Strips HTML tags and decodes common entities from AIC description strings.
 *
 * @param {string | null | undefined} html
 * @returns {string}
 */
export function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&ndash;|&#8211;/g, '–')
    .replace(/&mdash;|&#8212;/g, ' - ')
    .replace(/\s+\n/g, '\n')
    .trim();
}
