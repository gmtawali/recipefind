"use client"

import { useState } from "react"

interface Recipe {
  id: number
  name: string
  cuisine: string
  prepTime: string
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border p-4 rounded shadow">
      <h4 className="font-semibold">{recipe.name}</h4>
      <p>Cuisine: {recipe.cuisine}</p>
      <p>Prep Time: {recipe.prepTime}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`details-${recipe.id}`}
        className="mt-2 text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        {isExpanded ? "Hide Details" : "Show Details"}
      </button>
      {isExpanded && (
        <div id={`details-${recipe.id}`}>
          <p className="mt-2">This is where the recipe details and instructions would go.</p>
        </div>
      )}
    </div>
  )
}

