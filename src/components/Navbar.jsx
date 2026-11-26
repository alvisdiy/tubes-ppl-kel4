import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const NAV_ITEMS = [
  { label: 'Home', to: '/', matchPath: '/' },
  { label: 'Artworks', to: '/artworks', matchPath: '/artworks' },
  { label: 'Artists', to: '/artists', matchPath: '/artists' },
  { label: 'Departments', to: '/#departments', matchHash: '#departments' },
];

export default function Navbar({ variant = 'default' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef(null);
  const searchTriggerRef = useRef(null);
  const mobileMenuTriggerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (isSearchOpen) {
        setIsSearchOpen(false);
        searchTriggerRef.current?.focus();
      } else if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isMobileMenuOpen]);

  const isOverlayMode = variant === 'overlay';
  const useTransparentHeroBar =
    isOverlayMode && !isScrolled && !isMobileMenuOpen && !isSearchOpen;

  const isNavItemActive = (item) => {
    if (item.matchHash) {
      return (
        location.pathname === '/' &&
        (location.hash === item.matchHash || location.hash === '#collections')
      );
    }
    if (item.matchPath === '/') {
      return (
        location.pathname === '/' &&
        location.hash !== '#departments' &&
        location.hash !== '#collections'
      );
    }
    return location.pathname.startsWith(item.matchPath);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/artworks?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/artworks');
    }
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (event, to) => {
    if (to.startsWith('/#') && location.pathname === '/') {
      const targetId = to.slice(2);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', to);
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      data-surface={useTransparentHeroBar ? 'dark' : 'light'}
      className={[
        isOverlayMode ? 'fixed top-0 right-0 left-0 z-50' : 'sticky top-0 z-50 w-full',
        'transition-colors duration-250',
        useTransparentHeroBar
          ? 'bg-transparent text-ivory'
          : 'border-b border-gesso bg-ivory/95 text-charcoal backdrop-blur-md',
      ].join(' ')}
    >
      <div className="mx-auto flex h-[80px] max-w-[1340px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="group inline-flex min-h-[45px] items-center gap-3.5 py-1"
          aria-label="ARTORA, Art Collection Explorer home"
        >
          <span
            className={[
              'font-serif text-[1.65rem] font-normal leading-none tracking-[0.06em] transition-colors sm:text-[1.8rem]',
              useTransparentHeroBar
                ? 'text-[#F5F0E7] group-hover:text-white'
                : 'text-charcoal group-hover:text-burgundy',
            ].join(' ')}
          >
            ARTORA
          </span>
          <span
            className={[
              'hidden text-[13px] font-normal tracking-[0.01em] lg:inline',
              useTransparentHeroBar ? 'text-[#D8CFC2]' : 'text-stone',
            ].join(' ')}
          >
            Art Collection Explorer
          </span>
        </Link>

        <nav
          aria-label="Primary museum navigation"
          className="hidden items-center gap-7 md:flex lg:gap-10"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(item);
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={(event) => handleNavClick(event, item.to)}
                aria-current={active ? 'page' : undefined}
                className={[
                  'relative inline-flex min-h-[45px] items-center px-0.5 text-[14px] transition-colors duration-150',
                  active
                    ? useTransparentHeroBar
                      ? 'font-medium text-[#F5F0E7] after:absolute after:right-0 after:bottom-2 after:left-0 after:h-[1.5px] after:bg-[#E2DACD]'
                      : 'font-medium text-burgundy after:absolute after:right-0 after:bottom-2 after:left-0 after:h-[1.5px] after:bg-burgundy'
                    : useTransparentHeroBar
                      ? 'font-normal text-[#E5DDD0] hover:text-white hover:underline hover:underline-offset-8'
                      : 'font-normal text-stone hover:text-charcoal hover:underline hover:underline-offset-8',
                ].join(' ')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex lg:gap-4">
          <button
            ref={searchTriggerRef}
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Search artworks"
            aria-expanded={isSearchOpen}
            aria-controls="navbar-search-panel"
            className={[
              'inline-flex h-[45px] w-[45px] items-center justify-center rounded-full transition-colors duration-150',
              useTransparentHeroBar
                ? 'text-[#F5F0E7] hover:bg-ivory/12 active:bg-ivory/20'
                : 'text-charcoal hover:bg-limestone active:bg-gesso',
            ].join(' ')}
          >
            <Search className="h-[19px] w-[19px]" strokeWidth={1.65} aria-hidden="true" />
          </button>

          <Link
            to="/artworks"
            className={[
              'inline-flex min-h-[45px] items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-medium transition-all duration-200 active:translate-y-px',
              useTransparentHeroBar
                ? 'bg-[#EFE9DC] text-[#211D19] hover:bg-white'
                : 'bg-burgundy text-ivory hover:bg-burgundy-hover',
            ].join(' ')}
          >
            Explore Collection
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            ref={mobileMenuTriggerRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-museum-drawer"
            className={[
              'inline-flex min-h-[45px] min-w-[45px] items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors',
              useTransparentHeroBar
                ? 'border-[#E2DACD]/40 bg-[#1A1614]/55 text-ivory hover:border-ivory hover:bg-[#1A1614]/80'
                : 'border-bronze-rule bg-warm-white text-charcoal hover:border-burgundy active:bg-limestone',
            ].join(' ')}
          >
            {isMobileMenuOpen ? (
              <>
                <X className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div
          id="navbar-search-panel"
          data-surface="light"
          className="hidden border-t border-gesso bg-ivory px-5 py-4 text-charcoal shadow-sm md:block sm:px-8 lg:px-12"
        >
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-3xl flex-wrap items-end gap-3"
          >
            <div className="min-w-0 flex-1">
              <label
                htmlFor="global-artwork-search"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-bronze"
              >
                Search Museum Archive
              </label>
              <div className="relative flex items-center">
                <Search
                  className="pointer-events-none absolute left-3.5 h-4 w-4 text-ash"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  id="global-artwork-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by artwork title, artist, or motif..."
                  className="min-h-[44px] w-full rounded-sm border border-bronze-rule bg-warm-white py-2 pr-10 pl-10 text-sm text-charcoal placeholder:text-ash focus:border-burgundy"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search query"
                    className="absolute right-1 inline-flex h-9 w-9 items-center justify-center rounded-sm text-stone hover:text-burgundy"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            <PrimaryButton type="submit" variant="burgundy">
              Search Artworks
            </PrimaryButton>
          </form>
        </div>
      )}

      {isMobileMenuOpen && (
        <div
          id="mobile-museum-drawer"
          data-surface="light"
          className="border-t border-gesso bg-ivory px-4 pt-4 pb-8 text-charcoal md:hidden sm:px-6"
        >
          <form role="search" onSubmit={handleSearchSubmit} className="mb-5">
            <label
              htmlFor="mobile-artwork-search"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-bronze"
            >
              Search Museum Archive
            </label>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ash"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <input
                  id="mobile-artwork-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Title, artist, or motif..."
                  className="min-h-[44px] w-full rounded-sm border border-bronze-rule bg-warm-white py-2 pr-3 pl-9 text-sm text-charcoal placeholder:text-ash focus:border-burgundy"
                />
              </div>
              <PrimaryButton type="submit" variant="burgundy" className="px-4">
                Find
              </PrimaryButton>
            </div>
          </form>

          <nav aria-label="Mobile museum navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={(event) => handleNavClick(event, item.to)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex min-h-[48px] items-center justify-between rounded-sm border-l-2 px-3 py-2.5 text-base transition-colors',
                    active
                      ? 'border-burgundy bg-limestone font-semibold text-burgundy'
                      : 'border-transparent text-charcoal hover:bg-limestone/70 hover:text-burgundy',
                  ].join(' ')}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 border-t border-gesso pt-5">
            <PrimaryButton to="/artworks" variant="burgundy" className="w-full">
              Explore Collection
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}
