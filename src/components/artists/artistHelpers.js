import { stripHtml } from '../../utils/imageHelper';

function formatYear(value) {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return num < 0 ? `${Math.abs(num)} BCE` : String(num);
}

/**
 * Formats an artist lifespan string using an en dash for numeric ranges.
 */
export function formatArtistLifespan(birthDate, deathDate) {
  const birth = formatYear(birthDate);
  const death = formatYear(deathDate);

  if (birth && death) {
    return `${birth} \u2013 ${death}`;
  }
  if (birth) {
    return `Born ${birth}`;
  }
  if (death) {
    return `Died ${death}`;
  }
  return 'Dates unrecorded';
}

/**
 * Extracts up to two uppercase initials from an artist title for monogram plates.
 */
export function getArtistInitials(title) {
  if (!title || typeof title !== 'string') return 'AR';
  const words = title
    .replace(/[^a-zA-Z\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return 'AR';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

/**
 * Returns cleaned artist biography text or an archival fallback.
 */
export function getArtistBiography(description) {
  const cleaned = stripHtml(description);
  if (cleaned) return cleaned;
  return 'Biographical notes are not currently archived for this creator.';
}
