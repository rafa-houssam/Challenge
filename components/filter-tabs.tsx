"use client"

interface FilterTabsProps {
  filters: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function FilterTabs({ filters, activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeFilter === filter
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  )
}
