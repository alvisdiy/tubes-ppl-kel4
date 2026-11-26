/**
 * Skeleton placeholder grid matching ArtworkCard proportions for Exhibition Hall loading state.
 */
export default function ArtworkGridSkeleton({ count = 12 }) {
  return (
    <div
      role="status"
      aria-label="Loading artworks"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
    >
      <span className="sr-only">Loading exhibition artworks...</span>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="flex flex-col overflow-hidden rounded-sm border border-gesso bg-warm-white"
        >
          <div className="aspect-[4/3] w-full animate-pulse border-b border-[#DDD4C5] bg-limestone p-4">
            <div className="h-full w-full rounded-sm bg-[#E4DDD0]" />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-4 p-5">
            <div className="space-y-2.5">
              <div className="h-5 w-4/5 animate-pulse rounded-sm bg-limestone" />
              <div className="h-5 w-3/5 animate-pulse rounded-sm bg-limestone" />
              <div className="h-4 w-1/2 animate-pulse rounded-sm bg-limestone" />
            </div>
            <div className="flex items-center justify-between border-t border-gesso pt-3">
              <div className="h-3.5 w-20 animate-pulse rounded-sm bg-limestone" />
              <div className="h-3.5 w-24 animate-pulse rounded-sm bg-limestone" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}