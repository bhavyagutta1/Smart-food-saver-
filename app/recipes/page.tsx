"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import RecipeSearch from "@/components/recipe-search"
import RecipeCard from "@/components/recipe-card"
import { ChefHat } from "lucide-react"

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  const mockRecipes = [
    {
      id: 1,
      name: "Quick Banana Bread",
      ingredients: ["Banana", "Flour", "Sugar"],
      category: "spoiling",
      prepTime: "15 min",
      cookTime: "45 min",
      difficulty: "Easy",
      servings: 8,
      image: "/banana-bread.png",
      description: "Perfect for using up spotted bananas. Moist and delicious.",
    },
    {
      id: 2,
      name: "Vegetable Stir Fry",
      ingredients: ["Mixed Vegetables", "Soy Sauce", "Garlic"],
      category: "spoiling",
      prepTime: "10 min",
      cookTime: "15 min",
      difficulty: "Easy",
      servings: 4,
      image: "/stir-fry-vegetables.jpg",
      description: "Use up your vegetables before they spoil.",
    },
    {
      id: 3,
      name: "Fresh Fruit Salad",
      ingredients: ["Apple", "Orange", "Strawberry"],
      category: "fresh",
      prepTime: "10 min",
      cookTime: "0 min",
      difficulty: "Easy",
      servings: 4,
      image: "/colorful-fruit-salad.png",
      description: "A healthy way to enjoy fresh produce.",
    },
    {
      id: 4,
      name: "Tomato Soup",
      ingredients: ["Tomato", "Onion", "Cream"],
      category: "spoiling",
      prepTime: "10 min",
      cookTime: "30 min",
      difficulty: "Easy",
      servings: 4,
      image: "/comforting-tomato-soup.png",
      description: "Comfort food that uses up aging tomatoes.",
    },
    {
      id: 5,
      name: "Apple Pie",
      ingredients: ["Apple", "Flour", "Sugar"],
      category: "fresh",
      prepTime: "20 min",
      cookTime: "50 min",
      difficulty: "Medium",
      servings: 8,
      image: "/classic-apple-pie.png",
      description: "Classic dessert showcasing fresh apples.",
    },
    {
      id: 6,
      name: "Smoothie Bowl",
      ingredients: ["Banana", "Strawberry", "Yogurt"],
      category: "spoiling",
      prepTime: "5 min",
      cookTime: "0 min",
      difficulty: "Easy",
      servings: 1,
      image: "/vibrant-smoothie-bowl.png",
      description: "Great for using overripe fruits.",
    },
  ]

  useEffect(() => {
    setRecipes(mockRecipes)
  }, [])

  const handleSearch = (query: string) => {
    const filtered = mockRecipes.filter(
      (r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase())),
    )
    setRecipes(filtered)
  }

  const handleFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === "all") {
      setRecipes(mockRecipes)
    } else {
      setRecipes(mockRecipes.filter((r) => r.category === category))
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ChefHat className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Recipe Ideas</h1>
          </div>
          <p className="text-gray-600 text-lg">Discover recipes tailored to reduce food waste</p>
        </div>

        <RecipeSearch onSearch={handleSearch} onFilter={handleFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  )
}
