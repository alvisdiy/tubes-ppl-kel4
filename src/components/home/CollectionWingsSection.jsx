import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Landmark } from 'lucide-react';
import { getIIIFImageUrl } from '../../utils/imageHelper';
import SecondaryButton from '../SecondaryButton';

function DepartmentCard({ department }) {
  const [imgFailed, setImgFailed] = useState(false);
  const coverUrl = department.coverArtwork?.image_id
    ? getIIIFImageUrl(department.coverArtwork.image_id, 600)
    : null;

  return (
    <Link
      to={`/artworks?department=${encodeURIComponent(department.id)}`}
      data-surface="dark"
      className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-md border border-gesso bg-[#241513] p-6 text-ivory transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-[240px]"
    >
      {coverUrl && !imgFailed && (
        <img
          src={coverUrl}
          alt={
            department.coverArtwork?.title
              ? `${department.coverArtwork.title}, representative work from ${department.title}`
              : `${department.title} gallery preview`
          }
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className="artwork-hover-zoom pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      {/* Deep bottom architectural scrim guarantees >=8:1 WCAG AA contrast for department title & count. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20, 14, 12, 0.14) 0%, rgba(20, 14, 12, 0.56) 52%, rgba(18, 12, 10, 0.92) 100%)',
        }}
      />

      <div className="relative z-10">
        <h3 className="font-serif text-[1.45rem] font-medium leading-[1.2] text-[#F5F0E7] group-hover:underline group-hover:underline-offset-4 sm:text-[1.6rem]">
          {department.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[#D8CFC2]">
          {typeof department.artworkCount === 'number' ? (
            <span className="tabular-nums">
              {department.artworkCount.toLocaleString()} artworks
            </span>
          ) : (
            <span>Browse department</span>
          )}
          <ArrowRight
            className="h-3.5 w-3.5 shrink-0 text-[#C9B38C] transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

export default function CollectionWingsSection({
  departments = [],
  categories = [],
  isLoading = false,
  error = null,
  onRetry,
}) {
  return (
    <section
      id="collections"
      data-surface="light"
      aria-labelledby="collections-wings-heading"
      className="bg-ivory py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="departments" className="max-w-2xl scroll-mt-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
            Departments
          </p>
          <h2
            id="collections-wings-heading"
            className="mt-2 font-serif text-[1.875rem] font-normal leading-[1.15] tracking-[-0.01em] text-charcoal sm:text-[2.5rem]"
          >
            Explore by Department
          </h2>
          <p className="mt-2.5 text-base leading-[1.6] text-stone">
            Browse the collection through curated museum departments, from
            painting and sculpture to photography, textiles, and Asian arts.
          </p>
        </div>

        {isLoading ? (
          <div role="status" aria-live="polite" className="mt-10">
            <p id="categories" className="mb-5 text-sm text-stone">
              Loading curatorial departments and representative artworks...
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="h-[230px] animate-pulse rounded-md border border-gesso bg-limestone"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mx-auto mt-10 max-w-md rounded-sm border border-gesso bg-warm-white p-8 text-center"
          >
            <div id="categories" className="scroll-mt-24">
              <AlertCircle
                className="mx-auto h-8 w-8 text-venetian"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
                Unable to Load Curatorial Departments
              </h3>
              <p className="mt-2 text-sm text-stone">{error}</p>
              {onRetry && (
                <div className="mt-6">
                  <SecondaryButton onClick={onRetry}>Try Again</SecondaryButton>
                </div>
              )}
            </div>
          </div>
        ) : departments.length === 0 && categories.length === 0 ? (
          <div
            id="categories"
            className="mt-10 rounded-sm border border-gesso bg-warm-white px-6 py-14 text-center"
          >
            <Landmark
              className="mx-auto h-9 w-9 text-gold"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <h3 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
              No Curatorial Classifications Found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone">
              Department and category records could not be retrieved right now.
            </p>
            {onRetry && (
              <div className="mt-6">
                <SecondaryButton onClick={onRetry}>Reload Index</SecondaryButton>
              </div>
            )}
          </div>
        ) : (
          <>
            {departments.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {departments.map((dept) => (
                  <DepartmentCard key={dept.id} department={dept} />
                ))}
              </div>
            )}

            {categories.length > 0 && (
              <div
                id="categories"
                className="mt-14 scroll-mt-24 border-t border-gesso pt-10"
              >
                <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-bronze">
                      Thematic Categories
                    </h3>
                    <p className="mt-1 text-sm text-stone">
                      Jump directly into a pre-filtered subject or medium in the
                      Exhibition Hall.
                    </p>
                  </div>
                  <Link
                    to="/artworks"
                    className="inline-flex min-h-[45px] items-center text-sm font-medium text-burgundy underline underline-offset-4 hover:text-burgundy-hover"
                  >
                    Open Exhibition Hall Filters
                  </Link>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/artworks?category=${encodeURIComponent(cat.id)}`}
                      className="inline-flex min-h-[45px] items-center rounded-sm border border-bronze-rule bg-warm-white px-4 py-2 text-sm text-charcoal transition-colors duration-150 hover:border-burgundy hover:text-burgundy active:bg-limestone"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
