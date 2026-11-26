import { useId } from 'react';
import { ChevronDown, RotateCcw, X } from 'lucide-react';

function resolveTermTitle(terms, id) {
  const match = terms.find((item) => String(item.id) === String(id));
  return match?.title || id;
}

/**
 * Museum exhibition filter toolbar for Department (department_id)
 * and Category (category_ids), with removable active filter chips.
 */
export default function FilterPanel({
  departments = [],
  categories = [],
  selectedDepartment = '',
  selectedCategory = '',
  activeQuery = '',
  onDepartmentChange,
  onCategoryChange,
  onClearQuery,
  onResetAll,
  isLoadingTerms = false,
}) {
  const departmentSelectId = useId();
  const categorySelectId = useId();

  const hasActiveFilters = Boolean(
    activeQuery || selectedDepartment || selectedCategory
  );

  const activeChips = [];
  if (activeQuery) {
    activeChips.push({
      key: 'query',
      label: `Search: "${activeQuery}"`,
      onRemove: () => onClearQuery?.(),
    });
  }
  if (selectedDepartment) {
    activeChips.push({
      key: 'department',
      label: `Department: ${resolveTermTitle(departments, selectedDepartment)}`,
      onRemove: () => onDepartmentChange?.(''),
    });
  }
  if (selectedCategory) {
    activeChips.push({
      key: 'category',
      label: `Category: ${resolveTermTitle(categories, selectedCategory)}`,
      onRemove: () => onCategoryChange?.(''),
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:w-auto sm:min-w-[220px] sm:flex-1">
          <label htmlFor={departmentSelectId} className="sr-only">
            Filter by Department
          </label>
          <select
            id={departmentSelectId}
            aria-label="Filter by Department"
            value={selectedDepartment}
            disabled={isLoadingTerms && departments.length === 0}
            onChange={(e) => onDepartmentChange?.(e.target.value)}
            className="min-h-[44px] w-full cursor-pointer appearance-none rounded-sm border border-[#C8B9A3] bg-warm-white py-2 pr-10 pl-3.5 text-sm text-charcoal transition-colors duration-150 hover:border-gold focus:border-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {isLoadingTerms && departments.length === 0
                ? 'Loading Departments...'
                : 'All Departments'}
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.title}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ash"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>

        <div className="relative w-full sm:w-auto sm:min-w-[220px] sm:flex-1">
          <label htmlFor={categorySelectId} className="sr-only">
            Filter by Category
          </label>
          <select
            id={categorySelectId}
            aria-label="Filter by Category"
            value={selectedCategory}
            disabled={isLoadingTerms && categories.length === 0}
            onChange={(e) => onCategoryChange?.(e.target.value)}
            className="min-h-[44px] w-full cursor-pointer appearance-none rounded-sm border border-[#C8B9A3] bg-warm-white py-2 pr-10 pl-3.5 text-sm text-charcoal transition-colors duration-150 hover:border-gold focus:border-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {isLoadingTerms && categories.length === 0
                ? 'Loading Categories...'
                : 'All Categories'}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ash"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => onResetAll?.()}
            className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-transparent px-3 py-2 text-sm font-medium text-burgundy transition-colors duration-150 hover:text-burgundy-hover hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:justify-start"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        ) : null}
      </div>

      {activeChips.length > 0 ? (
        <div
          className="flex flex-wrap items-center gap-2 pt-1"
          aria-label="Active filters"
        >
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 rounded-sm border border-gesso bg-ivory px-3 py-1 text-xs font-medium text-charcoal"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={chip.onRemove}
                aria-label={`Remove ${chip.label}`}
                className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm text-stone transition-colors duration-150 hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}