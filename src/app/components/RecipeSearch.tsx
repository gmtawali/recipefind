"use client"

import type React from "react"
import { useState } from "react"

interface SearchParams {
  query: string
}

interface RecipeSearchProps {
  onSearch: (params: SearchParams) => void
}

export default function RecipeSearch({ onSearch }: RecipeSearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ query })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="search" className="block mb-1">
            Search for recipes
          </label>
          <input
            type="search"
            id="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a dish name or ingredient..."
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Search Recipes
        </button>
      </div>
    </form>
  )
}


