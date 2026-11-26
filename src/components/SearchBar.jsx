
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SearchBar({ query = '', onSearch }) {
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <label htmlFor="artwork-explorer-search" className="sr-only">
        Search artworks by title, artist, or subject
      </label>

      <div className="flex min-h-[48px] items-center gap-2 border border-transparent bg-[#EFE9DC] px-3 text-[#211D19] transition-colors focus-within:border-[#C9B38C] sm:px-4">
        <Search
          className="h-5 w-5 shrink-0 text-[#5C554C]"
          strokeWidth={1.6}
          aria-hidden="true"
        />

        <input
          id="artwork-explorer-search"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search artworks, artists, or subjects..."
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#211D19] outline-none placeholder:text-[#756E63]"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              setValue('');
              onSearch('');
            }}
            aria-label="Clear search"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-[#5C554C] hover:text-[#451D1D]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        <button
          type="submit"
          className="min-h-[40px] shrink-0 bg-[#451D1D] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#F5F0E7] transition-colors hover:bg-[#5C2727] sm:px-5"
        >
          Search
        </button>
      </div>
    </form>
  );
}
