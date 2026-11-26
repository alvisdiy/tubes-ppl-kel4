
import { RotateCcw, X } from 'lucide-react';

export default function FilterPanel({
  departments = [],
  categories = [],
  departmentId = '',
  categoryId = '',
  onDepartmentChange,
  onCategoryChange,
  onReset,
}) {
  const activeDepartment = departments.find(
    (term) => String(term.id) === String(departmentId)
  );

  const activeCategory = categories.find(
    (term) => String(term.id) === String(categoryId)
  );

  const hasFilters = Boolean(departmentId || categoryId);

  const selectClass =
    'min-h-[45px] w-full appearance-none border border-[#C9B38C]/40 bg-[#2F1816] px-3 text-sm text-[#F5F0E7] outline-none transition-colors focus:border-[#C9B38C] sm:min-w-[190px] sm:w-auto';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

        {/* Department Filter */}
        <div className="min-w-0 flex-1 sm:flex-none">
          <label
            htmlFor="department-filter"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9B38C]"
          >
            Department
          </label>

          <select
            id="department-filter"
            value={departmentId}
            onChange={(event) =>
              onDepartmentChange(event.target.value)
            }
            className={selectClass}
          >
            <option value="">All departments</option>

            {departments.map((term) => (
              <option
                key={term.id}
                value={term.id}
                className="bg-[#2F1816] text-[#F5F0E7]"
              >
                {term.title}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="min-w-0 flex-1 sm:flex-none">
          <label
            htmlFor="category-filter"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C9B38C]"
          >
            Category
          </label>

          <select
            id="category-filter"
            value={categoryId}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
            className={selectClass}
          >
            <option value="">All categories</option>

            {categories.map((term) => (
              <option
                key={term.id}
                value={term.id}
                className="bg-[#2F1816] text-[#F5F0E7]"
              >
                {term.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasFilters && (
        <div
          className="flex flex-wrap items-center gap-2"
          aria-live="polite"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9C0B3]">
            Active filters
          </span>

          {activeDepartment && (
            <button
              type="button"
              onClick={() => onDepartmentChange('')}
              className="inline-flex min-h-[30px] items-center gap-1.5 border border-[#C9B38C]/40 bg-[#3A211E] px-2.5 py-1 text-xs text-[#F5F0E7] hover:border-[#C9B38C]"
            >
              {activeDepartment.title}
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}

          {activeCategory && (
            <button
              type="button"
              onClick={() => onCategoryChange('')}
              className="inline-flex min-h-[30px] items-center gap-1.5 border border-[#C9B38C]/40 bg-[#3A211E] px-2.5 py-1 text-xs text-[#F5F0E7] hover:border-[#C9B38C]"
            >
              {activeCategory.title}
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-[30px] items-center gap-1.5 px-2 text-xs text-[#E2DACD] underline underline-offset-4 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
