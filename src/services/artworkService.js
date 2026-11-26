import { apiGet } from './api';

export const ARTWORK_CARD_FIELDS = [
  'id',
  'title',
  'artist_title',
  'artist_display',
  'date_display',
  'department_title',
  'department_id',
  'category_titles',
  'category_ids',
  'image_id',
].join(',');

export const ARTWORK_DETAIL_FIELDS = [
  'id',
  'title',
  'artist_id',
  'artist_title',
  'artist_display',
  'date_display',
  'medium_display',
  'dimensions',
  'department_title',
  'department_id',
  'category_titles',
  'category_ids',
  'classification_title',
  'style_title',
  'place_of_origin',
  'credit_line',
  'description',
  'short_description',
  'is_public_domain',
  'image_id',
  'thumbnail',
].join(',');

/**
 * Fetch paginated artworks from GET /artworks.
 */
export async function fetchArtworks({ page = 1, limit = 12, signal } = {}) {
  const data = await apiGet(
    '/artworks',
    {
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

/**
 * Search and/or filter artworks using GET /artworks/search.
 * Falls back to GET /artworks when no query or filter is active.
 */
export async function searchArtworks({
  query = '',
  departmentId = '',
  categoryId = '',
  page = 1,
  limit = 12,
  signal,
} = {}) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery && !departmentId && !categoryId) {
    return fetchArtworks({ page, limit, signal });
  }

  const params = {
    page,
    limit,
    fields: ARTWORK_CARD_FIELDS,
  };

  if (trimmedQuery) {
    params.q = trimmedQuery;
  }
  if (departmentId) {
    params['query[term][department_id]'] = departmentId;
  }
  if (categoryId) {
    params['query[term][category_ids]'] = categoryId;
  }

  const data = await apiGet('/artworks/search', params, signal);

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

/**
 * Fetch a single artwork by ID via GET /artworks/{id}.
 */
export async function fetchArtworkById(id, { signal } = {}) {
  const data = await apiGet(
    `/artworks/${id}`,
    {
      fields: ARTWORK_DETAIL_FIELDS,
    },
    signal
  );
  return data.data;
}

/**
 * Fetch related artworks in the same department, excluding the current artwork.
 */
export async function fetchRelatedArtworks({
  departmentId,
  excludeId,
  limit = 4,
  signal,
} = {}) {
  if (!departmentId) return [];

  const data = await apiGet(
    '/artworks/search',
    {
      'query[term][department_id]': departmentId,
      limit: limit + 1,
      fields: ARTWORK_CARD_FIELDS,
    },
    signal
  );

  return (data.data || [])
    .filter((item) => String(item.id) !== String(excludeId))
    .slice(0, limit);
}

/**
 * Fetch official department or category terms from GET /category-terms/search.
 */
export async function fetchCategoryTerms({
  subtype = 'department',
  page = 1,
  limit = 25,
  signal,
} = {}) {
  const params = {
    page,
    limit,
    fields: 'id,title,subtype',
  };

  if (subtype) {
    params['query[term][subtype]'] = subtype;
  }

  const data = await apiGet('/category-terms/search', params, signal);

  return {
    terms: data.data || [],
    pagination: data.pagination || {
      current_page: page,
      total_pages: 1,
      total: 0,
      limit,
    },
  };
}
