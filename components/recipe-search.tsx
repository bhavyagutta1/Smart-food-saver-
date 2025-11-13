"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface RecipeSearchProps {
  onSearch: (query: string) => void
  onFilter: (category: string) => void
}

export default function RecipeSearch({ onSearch, onFilter }: RecipeSearchProps) {
  const [query, setQuery] = useState("")

  const categories = [
    { id: "all", label: "All Recipes" },
    { id: "fresh", label: "Fresh Items" },
    { id: "spoiling", label: "Use Soon" },
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilter(cat.id)}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 font-medium transition"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
