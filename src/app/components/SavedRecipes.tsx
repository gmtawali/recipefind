"use client"

import { useState } from "react"
import { Trash, Undo, Edit } from "lucide-react"
import AddRecipe from "./AddRecipe"
import EditRecipe from "./EditRecipe"

interface Recipe {
  id: number
  name: string
  ingredients: string
  instructions: string
}

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([
    {
      id: 1,
      name: "Spaghetti Carbonara",
      ingredients: "Spaghetti, eggs, bacon, parmesan cheese",
      instructions: "1. Cook pasta\n2. Fry bacon\n3. Mix eggs and cheese\n4. Combine all ingredients",
    },
    {
      id: 2,
      name: "Chicken Tikka Masala",
      ingredients: "Chicken, yogurt, tomato sauce, spices",
      instructions: "1. Marinate chicken\n2. Grill chicken\n3. Prepare sauce\n4. Combine chicken and sauce",
    },
  ])
  const [lastRemoved, setLastRemoved] = useState<Recipe | null>(null)
  const [recipeToRemove, setRecipeToRemove] = useState<Recipe | null>(null)
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null)

  const confirmRemove = (recipe: Recipe) => {
    setRecipeToRemove(recipe)
  }

  const removeRecipe = () => {
    if (recipeToRemove) {
      setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== recipeToRemove.id))
      setLastRemoved(recipeToRemove)
      setRecipeToRemove(null)
    }
  }

  const undoRemove = () => {
    if (lastRemoved) {
      setSavedRecipes([...savedRecipes, lastRemoved])
      setLastRemoved(null)
    }
  }

  const saveNewRecipe = (newRecipe: Omit<Recipe, "id">) => {
    const id = Math.max(0, ...savedRecipes.map((r) => r.id)) + 1
    setSavedRecipes([...savedRecipes, { id, ...newRecipe }])
  }

  const editRecipe = (recipe: Recipe) => {
    setRecipeToEdit(recipe)
  }

  const saveEditedRecipe = (editedRecipe: Recipe) => {
    setSavedRecipes(savedRecipes.map((recipe) => (recipe.id === editedRecipe.id ? editedRecipe : recipe)))
    setRecipeToEdit(null)
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Saved Recipes</h3>
      <ul className="space-y-2">
        {savedRecipes.map((recipe) => (
          <li key={recipe.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
            <span>{recipe.name}</span>
            <div>
              <button
                onClick={() => editRecipe(recipe)}
                className="text-blue-500 hover:text-blue-700 mr-2"
                aria-label={`Edit ${recipe.name}`}
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => confirmRemove(recipe)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove ${recipe.name}`}
              >
                <Trash size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {lastRemoved && (
        <button onClick={undoRemove} className="mt-2 flex items-center text-green-500 hover:text-green-700">
          <Undo size={18} className="mr-1" /> Undo remove {lastRemoved.name}
        </button>
      )}
      {recipeToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow">
            <p>Are you sure you want to remove {recipeToRemove.name}?</p>
            <p className="text-sm text-gray-600 mb-4">This action can be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRecipeToRemove(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button onClick={removeRecipe} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {recipeToEdit && (
        <EditRecipe recipe={recipeToEdit} onSave={saveEditedRecipe} onCancel={() => setRecipeToEdit(null)} />
      )}
      <AddRecipe onSave={saveNewRecipe} />
    </div>
  )
}

