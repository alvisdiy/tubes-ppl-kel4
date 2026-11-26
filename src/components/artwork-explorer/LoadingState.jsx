
import ArtworkSkeleton from './ArtworkSkeleton';

export default function LoadingState({ count = 12 }) {
  return (
    <div aria-label="Loading artworks" aria-busy="true">
      <p className="sr-only" role="status">
        Loading artworks from the museum collection...
      </p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <ArtworkSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
