"use client"

import type React from "react"
import { useState } from "react"

interface AddRecipeProps {
  onSave: (recipe: { name: string; ingredients: string; instructions: string }) => void
}

export default function AddRecipe({ onSave }: AddRecipeProps) {
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, ingredients, instructions })
    setName("")
    setIngredients("")
    setInstructions("")
    setIsAdding(false)
  }

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add New Recipe
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Add New Recipe</h3>
      <div className="mb-2">
        <label htmlFor="name" className="block mb-1">
          Recipe Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="ingredients" className="block mb-1">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="instructions" className="block mb-1">
          Instructions
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Save Recipe
        </button>
      </div>
    </form>
  )
}

