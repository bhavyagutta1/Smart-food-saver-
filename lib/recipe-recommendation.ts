import { dbStore } from "./db"
import type { Recipe } from "./types"

interface InventoryItem {
  name: string
  status: "fresh" | "spoiling" | "spoiled"
}

export function recommendRecipes(items: InventoryItem[], urgency?: "high" | "medium" | "low"): Recipe[] {
  // Prioritize recipes for spoiling items
  const spoilingItems = items.filter((i) => i.status === "spoiling").map((i) => i.name.toLowerCase())
  const freshItems = items.filter((i) => i.status === "fresh").map((i) => i.name.toLowerCase())

  // Score recipes based on matching ingredients
  const scoredRecipes = dbStore.recipes.map((recipe) => {
    let score = 0
    let matchedIngredients = 0

    recipe.ingredients.forEach((ingredient) => {
      const ingredientLower = ingredient.toLowerCase()

      // High priority: recipe uses spoiling items
      if (spoilingItems.some((item) => ingredientLower.includes(item) || item.includes(ingredientLower))) {
        score += 100
        matchedIngredients++
      }

      // Medium priority: recipe uses fresh items
      if (freshItems.some((item) => ingredientLower.includes(item) || item.includes(ingredientLower))) {
        score += 50
        matchedIngredients++
      }
    })

    return {
      recipe,
      score,
      matchedIngredients,
    }
  })

  // Sort by score and return top recommendations
  return scoredRecipes
    .filter((r) => r.matchedIngredients > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.recipe)
}

export function filterRecipesByCategory(category: "fresh" | "spoiling"): Recipe[] {
  return dbStore.recipes.filter((r) => r.category === category)
}

export function searchRecipes(query: string): Recipe[] {
  const queryLower = query.toLowerCase()
  return dbStore.recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(queryLower) ||
      r.ingredients.some((ing) => ing.toLowerCase().includes(queryLower)) ||
      r.instructions.some((inst) => inst.toLowerCase().includes(queryLower)),
  )
}
