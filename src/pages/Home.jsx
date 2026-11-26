import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/home/HeroSection';
import FeaturedHighlights from '../components/home/FeaturedHighlights';
import ExhibitionSpotlight from '../components/home/ExhibitionSpotlight';
import CollectionWingsSection from '../components/home/CollectionWingsSection';
import {
  fetchArtworks,
  fetchCategoryTerms,
  searchArtworks,
} from '../services/artworkService';

function isCancelError(err) {
  return err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED';
}

export default function Home() {
  const location = useLocation();

  const [highlights, setHighlights] = useState([]);
  const [totalCollectionCount, setTotalCollectionCount] = useState(null);
  const [highlightsLoading, setHighlightsLoading] = useState(true);
  const [highlightsError, setHighlightsError] = useState(null);

  const [spotlightArtwork, setSpotlightArtwork] = useState(null);
  const [spotlightLoading, setSpotlightLoading] = useState(true);
  const [spotlightError, setSpotlightError] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wingsLoading, setWingsLoading] = useState(true);
  const [wingsError, setWingsError] = useState(null);

  const loadHighlights = useCallback(async (signal) => {
    setHighlightsLoading(true);
    setHighlightsError(null);
    try {
      const { artworks, pagination } = await fetchArtworks({
        page: 1,
        limit: 12,
        signal,
      });
      const withImages = artworks.filter((item) => Boolean(item.image_id));
      const prioritized = [
        ...withImages.filter((item) => Boolean(item.short_description)),
        ...withImages.filter((item) => !item.short_description),
      ];
      setHighlights(
        prioritized.length > 0 ? prioritized.slice(0, 4) : artworks.slice(0, 4)
      );
      setTotalCollectionCount(
        typeof pagination?.total === 'number' ? pagination.total : null
      );
    } catch (err) {
      if (isCancelError(err)) return;
      setHighlightsError(
        err.message || 'Unable to load curated artworks from the museum archive.'
      );
    } finally {
      if (!signal?.aborted) {
        setHighlightsLoading(false);
      }
    }
  }, []);

  const loadSpotlight = useCallback(async (signal) => {
    setSpotlightLoading(true);
    setSpotlightError(null);
    try {
      const { artworks } = await searchArtworks({
        query: 'Impressionism',
        page: 1,
        limit: 8,
        signal,
      });
      const candidate =
        artworks.find((item) => item.image_id && item.short_description) ||
        artworks.find((item) => item.image_id) ||
        artworks[0] ||
        null;
      setSpotlightArtwork(candidate);
    } catch (err) {
      if (isCancelError(err)) return;
      setSpotlightError(
        err.message || 'Unable to load the exhibition spotlight.'
      );
    } finally {
      if (!signal?.aborted) {
        setSpotlightLoading(false);
      }
    }
  }, []);

  const loadCollectionWings = useCallback(async (signal) => {
    setWingsLoading(true);
    setWingsError(null);
    try {
      const [deptRes, catRes] = await Promise.all([
        fetchCategoryTerms({ subtype: 'department', limit: 6, signal }),
        fetchCategoryTerms({ subtype: 'category', limit: 12, signal }),
      ]);

      const rawDepartments = deptRes.terms || [];
      const previewResults = await Promise.allSettled(
        rawDepartments.map((dept) =>
          searchArtworks({ departmentId: dept.id, page: 1, limit: 4, signal })
        )
      );

      const enrichedDepartments = rawDepartments.map((dept, index) => {
        const result = previewResults[index];
        if (result?.status === 'fulfilled') {
          const { artworks = [], pagination } = result.value;
          const coverArtwork =
            artworks.find((item) => Boolean(item.image_id)) || null;
          const artworkCount =
            typeof pagination?.total === 'number' ? pagination.total : null;
          return {
            ...dept,
            coverArtwork,
            artworkCount,
          };
        }
        return {
          ...dept,
          coverArtwork: null,
          artworkCount: null,
        };
      });

      if (!signal?.aborted) {
        setDepartments(enrichedDepartments);
        setCategories(catRes.terms || []);
      }
    } catch (err) {
      if (isCancelError(err)) return;
      setWingsError(
        err.message || 'Unable to load department and category classifications.'
      );
    } finally {
      if (!signal?.aborted) {
        setWingsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadHighlights(controller.signal);
    loadSpotlight(controller.signal);
    loadCollectionWings(controller.signal);
    return () => controller.abort();
  }, [loadHighlights, loadSpotlight, loadCollectionWings]);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <MainLayout heroOverlay fullBleed>
      <HeroSection />

      <FeaturedHighlights
        artworks={highlights}
        totalCount={totalCollectionCount}
        isLoading={highlightsLoading}
        error={highlightsError}
        onRetry={() => loadHighlights()}
      />

      <ExhibitionSpotlight
        artwork={spotlightArtwork}
        isLoading={spotlightLoading}
        error={spotlightError}
        onRetry={() => loadSpotlight()}
      />

      <CollectionWingsSection
        departments={departments}
        categories={categories}
        isLoading={wingsLoading}
        error={wingsError}
        onRetry={() => loadCollectionWings()}
      />
    </MainLayout>
  );
}
