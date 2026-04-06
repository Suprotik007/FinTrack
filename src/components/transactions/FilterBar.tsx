"use client"

import { useFinanceStore } from "@/src/store/useFinanceStore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown, ArrowUp, ArrowDown, X } from "lucide-react"
import { Category } from "@/src/types"


const CATEGORIES: (Category | "all")[] = [
  "all", "Salary", "Freelance", "Food", "Transport",
  "Rent", "Entertainment", "Healthcare", "Shopping", "Utilities", "Other"
]

export default function FilterBar() {
  const { filters, setFilter, resetFilters } = useFinanceStore()

  const toggleSort = (field: "date" | "amount") => {
    if (filters.sortBy === field) {
      setFilter("sortOrder", filters.sortOrder === "desc" ? "asc" : "desc")
    } else {
      setFilter("sortBy", field)
      setFilter("sortOrder", "desc")
    }
  }

  const SortIcon = ({ field }: { field: "date" | "amount" }) => {
    if (filters.sortBy !== field) return <ArrowUpDown size={14} />
    return filters.sortOrder === "desc" ? <ArrowDown size={14} /> : <ArrowUp size={14} />
  }

  const isFiltered =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.type !== "all"

  return (
    <div className="space-y-3">
      {/* Search + Reset */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="pl-9 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="border-border text-muted-foreground hover:text-foreground"
          >
            <X size={14} className="mr-1" /> Reset
          </Button>
        )}
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "income", "expense"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter("type", type)}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all
              ${filters.type === type
                ? type === "income"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : type === "expense"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            {type === "all" ? "All Types" : type}
          </button>
        ))}

        <div className="w-px bg-border mx-1" />

        {/* Sort buttons */}
        <button
          onClick={() => toggleSort("date")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all
            ${filters.sortBy === "date"
              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
              : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
        >
          <SortIcon field="date" /> Date
        </button>

        <button
          onClick={() => toggleSort("amount")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all
            ${filters.sortBy === "amount"
              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
              : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
        >
          <SortIcon field="amount" /> Amount
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter("category", cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all border
              ${filters.category === cat
                ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                : "bg-card border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            {cat === "all" ? "All Categories" : cat}
          </button>
        ))}
      </div>
    </div>
  )
}