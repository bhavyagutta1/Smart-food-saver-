import type { InventoryItem, Recipe, HistoryEntry } from "./types"

// In-memory storage - can be replaced with Supabase/Neon/etc
export const dbStore = {
  inventory: [] as InventoryItem[],
  history: [] as HistoryEntry[],
  recipes: [
    {
      id: 1,
      name: "Quick Banana Bread",
      ingredients: ["Banana", "Flour", "Sugar", "Egg", "Butter", "Baking Soda"],
      category: "spoiling",
      prepTime: "15 min",
      cookTime: "45 min",
      difficulty: "Easy",
      servings: 8,
      instructions: [
        "Preheat oven to 350F",
        "Mash 2-3 ripe bananas in bowl",
        "Mix 1.5 cups flour with 1 tsp baking soda and salt",
        "Beat 1 egg and 1/3 cup melted butter, combine with banana",
        "Fold in dry ingredients",
        "Pour into greased loaf pan",
        "Bake 45 minutes until golden",
      ],
    },
    {
      id: 2,
      name: "Vegetable Stir Fry",
      ingredients: ["Mixed Vegetables", "Soy Sauce", "Garlic", "Ginger", "Oil"],
      category: "spoiling",
      prepTime: "10 min",
      cookTime: "15 min",
      difficulty: "Easy",
      servings: 4,
      instructions: [
        "Prep all vegetables - chop garlic and ginger",
        "Heat 2 tbsp oil in wok over high heat",
        "Add harder vegetables first (carrots, broccoli)",
        "Stir fry 3-4 minutes",
        "Add softer vegetables and aromatics",
        "Stir fry 2-3 minutes more",
        "Add 3 tbsp soy sauce, toss well",
        "Serve immediately",
      ],
    },
    {
      id: 3,
      name: "Fresh Fruit Salad",
      ingredients: ["Apple", "Orange", "Strawberry", "Honey", "Mint"],
      category: "fresh",
      prepTime: "10 min",
      cookTime: "0 min",
      difficulty: "Easy",
      servings: 4,
      instructions: [
        "Wash all fruit thoroughly",
        "Cut apples into bite-sized pieces",
        "Peel and segment oranges",
        "Hull and halve strawberries",
        "Combine all fruit in large bowl",
        "Drizzle with 2 tbsp honey",
        "Tear fresh mint leaves over top",
        "Chill until serving",
      ],
    },
    {
      id: 4,
      name: "Tomato Soup",
      ingredients: ["Tomato", "Onion", "Garlic", "Cream", "Basil"],
      category: "spoiling",
      prepTime: "10 min",
      cookTime: "30 min",
      difficulty: "Easy",
      servings: 4,
      instructions: [
        "Sauté diced onion and garlic in butter",
        "Add 2 lbs diced tomatoes",
        "Simmer 20 minutes",
        "Blend until smooth",
        "Stir in 1/2 cup cream",
        "Season with salt and pepper",
        "Garnish with fresh basil",
        "Serve hot",
      ],
    },
    {
      id: 5,
      name: "Apple Pie",
      ingredients: ["Apple", "Flour", "Butter", "Sugar", "Cinnamon"],
      category: "fresh",
      prepTime: "20 min",
      cookTime: "50 min",
      difficulty: "Medium",
      servings: 8,
      instructions: [
        "Preheat oven to 375F",
        "Make pie crust with flour, butter, water",
        "Slice 6-8 apples and toss with cinnamon and sugar",
        "Pour filling into crust",
        "Top with second crust",
        "Bake 50 minutes until golden",
        "Cool before serving",
      ],
    },
    {
      id: 6,
      name: "Smoothie Bowl",
      ingredients: ["Banana", "Strawberry", "Yogurt", "Honey", "Granola"],
      category: "fresh",
      prepTime: "5 min",
      cookTime: "0 min",
      difficulty: "Easy",
      servings: 1,
      instructions: [
        "Blend 1 frozen banana with 1/2 cup strawberries",
        "Add 1/2 cup yogurt and 1 tbsp honey",
        "Blend until smooth and thick",
        "Pour into bowl",
        "Top with granola and fresh berries",
        "Eat immediately with spoon",
      ],
    },
  ] as Recipe[],
}

// Track a food item in history
export function trackHistory(item: string, status: "fresh" | "spoiling" | "spoiled", quantity: number, action: string) {
  const entry: HistoryEntry = {
    id: Math.max(...dbStore.history.map((h) => h.id || 0), 0) + 1,
    item,
    status,
    date: new Date(),
    quantity,
    action,
  }
  dbStore.history.push(entry)
  return entry
}

// Calculate analytics
export function getAnalytics() {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const weekHistory = dbStore.history.filter((h) => new Date(h.date) > weekAgo)
  const itemsSaved = weekHistory.filter((h) => h.status === "fresh" || h.status === "spoiling").length
  const itemsSpoiled = weekHistory.filter((h) => h.status === "spoiled").length
  const wasteRate = itemsSpoiled + itemsSaved > 0 ? (itemsSaved / (itemsSaved + itemsSpoiled)) * 100 : 0

  // Estimate CO2 saved (0.5kg CO2 per kg food waste prevented)
  const co2Prevented = itemsSaved * 0.5

  // Estimate money saved ($2 average per item)
  const moneySaved = itemsSaved * 2

  return {
    itemsSaved,
    itemsSpoiled,
    wasteRate: Math.round(wasteRate),
    co2Prevented: co2Prevented.toFixed(1),
    moneySaved: Math.round(moneySaved),
    weeklyBreakdown: getWeeklyBreakdown(weekHistory),
  }
}

function getWeeklyBreakdown(weekHistory: HistoryEntry[]) {
  const breakdown = {
    fresh: weekHistory.filter((h) => h.status === "fresh").length,
    spoiling: weekHistory.filter((h) => h.status === "spoiling").length,
    spoiled: weekHistory.filter((h) => h.status === "spoiled").length,
  }
  return breakdown
}
