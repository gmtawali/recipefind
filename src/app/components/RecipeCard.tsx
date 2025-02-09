"use client"

import { useState } from "react"
import Image from "next/image"
import { getRecipeById } from "../utils/api"

interface Recipe {
  id: string
  name: string
  cuisine: string
  category: string
  image: string
}

interface RecipeDetails extends Recipe {
  instructions: string
  youtubeUrl: string
  ingredients: { ingredient: string; measure: string }[]
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [details, setDetails] = useState<RecipeDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleDetails = async () => {
    if (!isExpanded && !details) {
      setIsLoading(true)
      try {
        const recipeDetails = await getRecipeById(recipe.id)
        setDetails(recipeDetails)
      } catch (error) {
        console.error("Failed to fetch recipe details:", error)
      } finally {
        setIsLoading(false)
      }
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="border p-4 rounded shadow">
      <Image
        src={recipe.image || "/placeholder.svg"}
        alt={recipe.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h4 className="font-semibold">{recipe.name}</h4>
      <p>Cuisine: {recipe.cuisine}</p>
      <p>Category: {recipe.category}</p>
      <button
        onClick={handleToggleDetails}
        aria-expanded={isExpanded}
        aria-controls={`details-${recipe.id}`}
        className="mt-2 text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        {isExpanded ? "Hide Details" : "Show Details"}
      </button>
      {isExpanded && (
        <div id={`details-${recipe.id}`} className="mt-4">
          {isLoading ? (
            <p>Loading details...</p>
          ) : details ? (
            <>
              <h5 className="font-semibold mb-2">Ingredients:</h5>
              <ul className="list-disc list-inside mb-4">
                {details.ingredients.map((item, index) => (
                  <li key={index}>
                    {item.measure} {item.ingredient}
                  </li>
                ))}
              </ul>
              <h5 className="font-semibold mb-2">Instructions:</h5>
              <p className="mb-4">{details.instructions}</p>
              {details.youtubeUrl && (
                <a
                  href={details.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Watch Video Tutorial
                </a>
              )}
            </>
          ) : (
            <p>Failed to load recipe details. Please try again.</p>
          )}
        </div>
      )}
    </div>
  )
}

