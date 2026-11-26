
import { useEffect } from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { Frame } from 'lucide-react';

import MainLayout from './layouts/MainLayout';

import PrimaryButton from './components/PrimaryButton';
import SecondaryButton from './components/SecondaryButton';

import Home from './pages/Home';
import ArtworkExplorer from './pages/ArtworkExplorer';
import ArtworkDetail from './pages/ArtworkDetail';
import NotFound from './pages/NotFound';

function ScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    }
  }, [pathname, hash]);

  return null;
}

function PendingTeamWing({
  wingTitle,
  branchName,
  description,
}) {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const activeQuery = searchParams.toString();

  return (
    <MainLayout>
      <section
        aria-labelledby="pending-wing-heading"
        className="
          mx-auto max-w-2xl
          rounded-sm
          border border-gesso
          bg-warm-white
          p-8
          text-center
          sm:p-12
        "
      >
        <Frame
          className="mx-auto h-9 w-9 text-gold"
          strokeWidth={1.25}
          aria-hidden="true"
        />

        <p className="
          mt-4
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.2em]
          text-bronze
        ">
          Coming Soon · Scheduled for Branch Integration
        </p>

        <h1
          id="pending-wing-heading"
          className="
            mt-3
            font-serif
            text-[2rem]
            font-semibold
            text-charcoal
            sm:text-[2.75rem]
          "
        >
          {wingTitle}
        </h1>

        <p className="
          mx-auto mt-3
          max-w-lg
          text-base
          leading-relaxed
          text-stone
        ">
          {description} This wing is developed independently on{' '}
          <code className="
            rounded-xs
            bg-limestone
            px-1.5 py-0.5
            text-sm text-burgundy
          ">
            {branchName}
          </code>{' '}
          and connects here when its Pull Request merges into main.
        </p>

        {(params.id || activeQuery) && (
          <div className="
            mx-auto mt-6
            max-w-md
            rounded-sm
            border border-gesso
            bg-ivory
            px-4 py-3
            text-left text-xs text-stone
          ">
            <p className="
              font-semibold
              uppercase
              tracking-[0.14em]
              text-bronze
            ">
              Verified Route Handoff
            </p>

            {params.id && (
              <p className="mt-1 tabular-nums">
                Artwork ID: {params.id}
              </p>
            )}

            {activeQuery && (
              <p className="mt-1 break-all">
                Query: ?{activeQuery}
              </p>
            )}
          </div>
        )}

        <div className="
          mt-8
          flex flex-wrap
          items-center justify-center
          gap-3
        ">
          <PrimaryButton to="/" variant="burgundy">
            Back to Museum Entrance
          </PrimaryButton>

          <SecondaryButton to="/#curated-highlights">
            View Curated Highlights
          </SecondaryButton>
        </div>
      </section>
    </MainLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ARTWORK EXPLORER - RISA */}
        <Route
          path="/artworks"
          element={<ArtworkExplorer />}
        />

        {/* ARTWORK DETAIL - NISFA */}
        <Route
          path="/artworks/:id"
          element={<ArtworkDetail />}
        />

        {/* ARTIST EXPLORER - IMELDA */}
        <Route
          path="/artists"
          element={
            <PendingTeamWing
              wingTitle="Artist Archive"
              branchName="feature/artist-explorer"
              description="Biographical directory, lifespan records, and works attributed to each creator."
            />
          }
        />

        {/* NOT FOUND */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
