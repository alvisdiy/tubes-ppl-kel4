import { useEffect, useId, useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Museum-styled keyword search bar that submits search queries
 * and syncs cleanly with URL query state (?q=...).
 */
export default function SearchBar({
  value = '',
  onSearch,
  placeholder = 'Search artworks, artists, or mediums...',
  label = 'Search artworks',
  className = '',
}) {
  const inputId = useId();
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onSearch?.('');
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex w-full items-center gap-2 ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>

      <div className="relative flex min-h-[44px] flex-1 items-center rounded-sm border border-[#C8B9A3] bg-warm-white transition-colors duration-150 focus-within:border-burgundy focus-within:ring-2 focus-within:ring-gold">
        <Search
          className="pointer-events-none ml-3.5 h-4 w-4 shrink-0 text-ash"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="min-h-[44px] w-full bg-transparent px-3 py-2 text-sm text-charcoal placeholder:text-ash focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {inputValue ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="mr-1.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-ash transition-colors duration-150 hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <button
        type="submit"
        className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center rounded-sm bg-burgundy px-5 py-2.5 text-sm font-medium text-ivory transition-colors duration-250 hover:bg-burgundy-hover active:bg-[#311313] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Search
      </button>
    </form>
  );
}