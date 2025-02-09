"use client"

import type React from "react"
import { useState } from "react"

interface Recipe {
  id: number
  name: string
  ingredients: string
  instructions: string
}

interface EditRecipeProps {
  recipe: Recipe
  onSave: (recipe: Recipe) => void
  onCancel: () => void
}

export default function EditRecipe({ recipe, onSave, onCancel }: EditRecipeProps) {
  const [name, setName] = useState(recipe.name)
  const [ingredients, setIngredients] = useState(recipe.ingredients)
  const [instructions, setInstructions] = useState(recipe.instructions)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ id: recipe.id, name, ingredients, instructions })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Edit Recipe: {recipe.name}</h3>
      <div className="mb-2">
        <label htmlFor="edit-name" className="block mb-1">
          Recipe Name
        </label>
        <input
          type="text"
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="edit-ingredients" className="block mb-1">
          Ingredients
        </label>
        <textarea
          id="edit-ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="edit-instructions" className="block mb-1">
          Instructions
        </label>
        <textarea
          id="edit-instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </form>
  )
}

