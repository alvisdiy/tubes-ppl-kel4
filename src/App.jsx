
import { useEffect } from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Home from './pages/Home';
import ArtworkExplorer from './pages/ArtworkExplorer';
import ArtworkDetail from './pages/ArtworkDetail';
import ArtistExplorer from './pages/ArtistExplorer';
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
          element={<ArtistExplorer />}
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
