import { NextResponse } from "next/server"
import { dbStore } from "@/lib/db"
import { recommendRecipes, filterRecipesByCategory, searchRecipes } from "@/lib/recipe-recommendation"
import type { InventoryItem } from "@/lib/types"

// Mock recipe database
const recipes = [
  {
    id: 1,
    name: "Quick Banana Bread",
    ingredients: ["Banana", "Flour", "Sugar", "Egg"],
    category: "spoiling",
    prepTime: "15 min",
    cookTime: "45 min",
    difficulty: "Easy",
    servings: 8,
    instructions: ["Mash bananas", "Mix dry ingredients", "Combine", "Bake at 350F for 45 min"],
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    ingredients: ["Mixed Vegetables", "Soy Sauce", "Garlic", "Ginger"],
    category: "spoiling",
    prepTime: "10 min",
    cookTime: "15 min",
    difficulty: "Easy",
    servings: 4,
    instructions: ["Prep vegetables", "Heat wok", "Stir fry", "Add sauce"],
  },
  {
    id: 3,
    name: "Fresh Fruit Salad",
    ingredients: ["Apple", "Orange", "Strawberry", "Honey"],
    category: "fresh",
    prepTime: "10 min",
    cookTime: "0 min",
    difficulty: "Easy",
    servings: 4,
    instructions: ["Wash fruit", "Cut into pieces", "Combine in bowl", "Drizzle honey"],
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const recommend = searchParams.get("recommend")

    // Smart recommendation mode
    if (recommend === "true") {
      const inventoryItems: InventoryItem[] = dbStore.inventory
      const recommended = recommendRecipes(inventoryItems)
      return NextResponse.json(recommended)
    }

    // Search mode
    if (search) {
      const results = searchRecipes(search)
      return NextResponse.json(results)
    }

    // Filter by category
    if (category === "fresh" || category === "spoiling") {
      const filtered = filterRecipesByCategory(category)
      return NextResponse.json(filtered)
    }

    // Return all recipes
    return NextResponse.json(dbStore.recipes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newRecipe = await request.json()

    const recipe = {
      ...newRecipe,
      id: Math.max(...dbStore.recipes.map((r) => r.id), 0) + 1,
    }

    dbStore.recipes.push(recipe)
    return NextResponse.json(recipe, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 })
  }
}
