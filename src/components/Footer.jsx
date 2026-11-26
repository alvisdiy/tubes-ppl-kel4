import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Museum Entrance', to: '/' },
  { label: 'Exhibition Hall', to: '/artworks' },
  { label: 'Artist Archive', to: '/artists' },
  { label: 'Departments & Categories', to: '/#collections' },
];

export default function Footer() {
  return (
    <footer
      data-surface="light"
      className="border-t border-gesso bg-limestone text-charcoal"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
          <div>
            <Link
              to="/"
              className="inline-flex min-h-[44px] flex-col justify-center"
            >
              <span className="font-serif text-2xl font-semibold tracking-[0.08em] text-charcoal">
                ARTORA
              </span>
              <span className="mt-1 font-serif text-base italic text-burgundy">
                Discover Art. Explore Stories.
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
              An editorial digital museum dedicated to unhurried viewing,
              authentic provenance, and curatorial records from public museum
              holdings.
            </p>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
              Museum Wings
            </h2>
            <ul className="mt-3 flex flex-col gap-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-[45px] items-center text-sm text-stone transition-colors hover:text-burgundy hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bronze">
              Institutional Attribution
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              Data and imagery courtesy of the Art Institute of Chicago Public
              API and its IIIF Image Service. Public-domain works are presented
              under Creative Commons Zero (CC0) designations.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href="https://api.artic.edu/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-burgundy underline underline-offset-4 transition-colors hover:text-burgundy-hover"
              >
                <span>AIC API Documentation</span>
                <ExternalLink
                  className="h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.artic.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-stone underline underline-offset-4 transition-colors hover:text-burgundy"
              >
                <span>Art Institute of Chicago</span>
                <ExternalLink
                  className="h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-gesso pt-6 text-xs text-stone sm:flex-row sm:items-center">
          <p>ARTORA Digital Collection Explorer. Non-commercial educational archive.</p>
          <p>Powered by Art Institute of Chicago Open Access</p>
        </div>
      </div>
    </footer>
  );
}
