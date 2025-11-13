export interface InventoryItem {
  id: number
  name: string
  quantity: number
  unit: string
  status: "fresh" | "spoiling" | "spoiled"
  addedDate: Date
  expiryDate: Date
  location: string
}

export interface DetectionResult {
  itemName: string
  status: "fresh" | "spoiling" | "spoiled"
  confidence: number
  details: string
  shelfLife: number
  recommendations: string[]
}

export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  category: "fresh" | "spoiling"
  prepTime: string
  cookTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  servings: number
  instructions: string[]
}

export interface HistoryEntry {
  id: number
  item: string
  status: "fresh" | "spoiling" | "spoiled"
  date: Date
  quantity: number
  action: string
}
