import { apiGet } from './api';
import { ARTWORK_CARD_FIELDS } from './artworkService';

export const ARTIST_FIELDS = [
  'id',
  'title',
  'is_artist',
  'birth_date',
  'death_date',
  'description',
].join(',');

/**
 * Search artists via GET /agents/search with is_artist=true.
 */
export async function searchArtists({
  query = '',
  page = 1,
  limit = 12,
  signal,
} = {}) {
  const params = {
    'query[term][is_artist]': true,
    page,
    limit,
    fields: ARTIST_FIELDS,
  };

  const trimmed = query.trim();
  if (trimmed) {
    params.q = trimmed;
  }

  const data = await apiGet('/agents/search', params, signal);

  return {
    artists: data.data || [],
    pagination: data.pagination || {
      current_page: page,
      total_pages: 1,
      total: 0,
      limit,
    },
  };
}

/**
 * Fetch a single artist/agent profile by ID via GET /agents/{id}.
 */
export async function fetchArtistById(id, { signal } = {}) {
  const data = await apiGet(
    `/agents/${id}`,
    {
      fields: ARTIST_FIELDS,
    },
    signal
  );
  return data.data;
}

/**
 * Fetch artworks attributed to a specific artist ID via GET /artworks/search.
 */
export async function fetchArtworksByArtist(
  artistId,
  { page = 1, limit = 8, signal } = {}
) {
  const data = await apiGet(
    '/artworks/search',
    {
      'query[term][artist_id]': artistId,
      page,
      limit,
      fields: ARTWORK_CARD_FIELDS,
    },
    signal
  );

  return {
    artworks: data.data || [],
    pagination: data.pagination || {
      current_page: page,
      total_pages: 1,
      total: 0,
      limit,
    },
  };
}
