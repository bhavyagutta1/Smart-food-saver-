"use client"

import { Clock, Users, ChefHat } from "lucide-react"

interface RecipeCardProps {
  recipe: {
    id: number
    name: string
    ingredients: string[]
    prepTime: string
    cookTime: string
    difficulty: string
    servings: number
    image: string
    description: string
  }
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const difficultyColors = {
    Easy: "bg-emerald-100 text-emerald-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition">
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-full object-cover" />
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[recipe.difficulty as keyof typeof difficultyColors]}`}
        >
          {recipe.difficulty}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{recipe.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>{recipe.prepTime} prep</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4 text-emerald-600" />
            <span>{recipe.cookTime} cook</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ing) => (
              <span
                key={ing}
                className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition">
          View Recipe
        </button>
      </div>
    </div>
  )
}
