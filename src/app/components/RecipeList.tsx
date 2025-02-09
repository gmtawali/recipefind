import RecipeCard from "./RecipeCard"

interface Recipe {
  id: number
  name: string
  cuisine: string
  prepTime: string
}

interface RecipeListProps {
  recipes: Recipe[]
  isLoading: boolean
}

export default function RecipeList({ recipes, isLoading }: RecipeListProps) {
  if (isLoading) {
    return <div className="text-center">Searching for recipes...</div>
  }

  if (recipes.length === 0) {
    return <div className="text-center">No recipes found. Try different search terms.</div>
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Found Recipes</h3>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  )
}

