"use client"

import type React from "react"
import { useState } from "react"

interface SearchParams {
  searchType: string
  query: string
  cuisine: string
  dietaryRestrictions: string[]
}

interface RecipeSearchProps {
  onSearch: (params: SearchParams) => void
}

export default function RecipeSearch({ onSearch }: RecipeSearchProps) {
  const [searchType, setSearchType] = useState("ingredients")
  const [query, setQuery] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ searchType, query, cuisine, dietaryRestrictions })
  }

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions((prev) =>
      prev.includes(restriction) ? prev.filter((r) => r !== restriction) : [...prev, restriction],
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">Search by:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="ingredients"
                checked={searchType === "ingredients"}
                onChange={(e) => setSearchType(e.target.value)}
                className="mr-1"
              />
              Ingredients
            </label>
            <label>
              <input
                type="radio"
                value="dish"
                checked={searchType === "dish"}
                onChange={(e) => setSearchType(e.target.value)}
                className="mr-1"
              />
              Dish Name
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="search" className="block mb-1">
            {searchType === "ingredients" ? "Enter ingredients" : "Enter dish name"}
          </label>
          <input
            type="search"
            id="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === "ingredients" ? "E.g., chicken, pasta..." : "E.g., Spaghetti Carbonara"}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="cuisine" className="block mb-1">
            Cuisine (optional)
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All Cuisines</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="indian">Indian</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Dietary Restrictions (optional)</label>
          <div className="flex flex-wrap gap-2">
            {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map((restriction) => (
              <label key={restriction} className="flex items-center">
                <input
                  type="checkbox"
                  checked={dietaryRestrictions.includes(restriction)}
                  onChange={() => toggleDietaryRestriction(restriction)}
                  className="mr-1"
                />
                {restriction}
              </label>
            ))}
          </div>
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

