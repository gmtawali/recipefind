const BASE_URL = "https://www.themealdb.com/api/json/v1/1"

export const searchRecipes = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error("Failed to fetch recipes")
    }
    const data = await response.json()
    return (
      data.meals?.map((meal: any) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        cuisine: meal.strArea,
        category: meal.strCategory,
        image: meal.strMealThumb,
      })) || []
    )
  } catch (error) {
    console.error("Error fetching recipes:", error)
    throw error
  }
}

export const getRecipeById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch recipe details")
    }
    const data = await response.json()
    const meal = data.meals?.[0]
    if (!meal) {
      throw new Error("Recipe not found")
    }
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      cuisine: meal.strArea,
      category: meal.strCategory,
      image: meal.strMealThumb,
      instructions: meal.strInstructions,
      youtubeUrl: meal.strYoutube,
      ingredients: Object.keys(meal)
        .filter((key) => key.startsWith("strIngredient") && meal[key])
        .map((key) => ({
          ingredient: meal[key],
          measure: meal[`strMeasure${key.slice(13)}`],
        })),
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error)
    throw error
  }
}

