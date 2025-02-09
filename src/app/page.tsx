"use client"

import { useState } from "react"
import RecipeSearch from "./components/RecipeSearch"
import RecipeList from "./components/RecipeList"
import IntroSection from "./components/IntroSection"
import SavedRecipes from "./components/SavedRecipes"
import { searchRecipes } from "./utils/api"

interface Recipe {
  id: string
  name: string
  cuisine: string
  category: string
  image: string
}

interface SearchParams {
  query: string
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const results = await searchRecipes(params.query)
      setRecipes(results)
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <IntroSection />
      <h2 className="text-xl font-semibold mb-4">Find Your Next Delicious Meal</h2>
      <RecipeSearch onSearch={handleSearch} />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <RecipeList recipes={recipes} isLoading={isLoading} />
      <SavedRecipes />
    </div>
  )
}

