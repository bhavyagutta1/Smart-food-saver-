interface FoodDetectionInput {
  imageUrl?: string
  itemName: string
  description?: string
  daysSincePurchase?: number
  storageCondition?: string
}

// Comprehensive food database with shelf life and common indicators
const foodDatabase: Record<
  string,
  {
    category: string
    fresh: number
    spoiling: number
    spoilageIndicators: string[]
  }
> = {
  apple: { category: "fruit", fresh: 7, spoiling: 14, spoilageIndicators: ["brown spots", "soft", "wrinkled"] },
  banana: { category: "fruit", fresh: 2, spoiling: 5, spoilageIndicators: ["brown", "mushy", "black spots"] },
  orange: { category: "fruit", fresh: 10, spoiling: 21, spoilageIndicators: ["mold", "soft", "leaking"] },
  strawberry: { category: "fruit", fresh: 1, spoiling: 3, spoilageIndicators: ["mold", "mushy", "discolored"] },
  blueberry: { category: "fruit", fresh: 3, spoiling: 7, spoilageIndicators: ["mold", "crushed"] },
  tomato: { category: "vegetable", fresh: 5, spoiling: 10, spoilageIndicators: ["dark spots", "mushy", "leaking"] },
  lettuce: { category: "vegetable", fresh: 3, spoiling: 7, spoilageIndicators: ["wilted", "slimy", "brown edges"] },
  carrot: { category: "vegetable", fresh: 14, spoiling: 30, spoilageIndicators: ["soft", "slimy", "sprouting"] },
  onion: { category: "vegetable", fresh: 30, spoiling: 60, spoilageIndicators: ["sprouting", "soft", "moldy"] },
  potato: { category: "vegetable", fresh: 21, spoiling: 45, spoilageIndicators: ["green", "sprouting", "soft"] },
  milk: { category: "dairy", fresh: 7, spoiling: 10, spoilageIndicators: ["curdled", "sour smell", "separation"] },
  yogurt: { category: "dairy", fresh: 14, spoiling: 21, spoilageIndicators: ["mold", "separation", "sour"] },
  cheese: {
    category: "dairy",
    fresh: 30,
    spoiling: 60,
    spoilageIndicators: ["mold (non-blue)", "slimy", "strong odor"],
  },
  bread: { category: "grain", fresh: 3, spoiling: 7, spoilageIndicators: ["mold", "hard", "stale"] },
  rice: { category: "grain", fresh: 365, spoiling: 730, spoilageIndicators: ["insects", "moisture"] },
  chicken: { category: "meat", fresh: 1, spoiling: 2, spoilageIndicators: ["discolored", "slimy", "bad odor"] },
  beef: { category: "meat", fresh: 3, spoiling: 5, spoilageIndicators: ["brown", "slimy", "odor"] },
  fish: { category: "meat", fresh: 1, spoiling: 2, spoilageIndicators: ["gray color", "ammonia smell", "soft"] },
  egg: { category: "protein", fresh: 21, spoiling: 35, spoilageIndicators: ["floating", "pink/gray"] },
}

// List of non-food items to reject
const nonFoodItems = new Set([
  "phone",
  "shoe",
  "book",
  "pen",
  "chair",
  "table",
  "plastic",
  "metal",
  "cloth",
  "paper",
  "computer",
  "keyboard",
  "mouse",
  "monitor",
  "glass",
  "cup",
  "plate",
  "fork",
  "spoon",
  "toy",
  "doll",
  "car",
  "bike",
  "bottle",
  "can",
  "jewelry",
  "watch",
  "phone",
  "camera",
])

export async function validateIsFoodItem(
  itemName: string,
  description?: string,
): Promise<{ isFood: boolean; reason: string }> {
  const itemLower = itemName.toLowerCase().trim()

  // Check against non-food items list
  if (nonFoodItems.has(itemLower)) {
    return {
      isFood: false,
      reason: `"${itemName}" is not a food item. Please upload images of fruits, vegetables, dairy, meat, or grocery items.`,
    }
  }

  // Check against food database
  if (foodDatabase[itemLower]) {
    return {
      isFood: true,
      reason: `"${itemName}" is a valid food item.`,
    }
  }

  // Heuristic check for common food patterns
  const commonKeywords = [
    "fruit",
    "vegetable",
    "meat",
    "fish",
    "dairy",
    "cheese",
    "milk",
    "bread",
    "grain",
    "rice",
    "pasta",
    "bean",
    "nut",
    "juice",
    "smoothie",
    "soup",
    "sauce",
    "oil",
    "butter",
    "yogurt",
    "ice cream",
    "snack",
  ]
  const isLikelyFood = commonKeywords.some((keyword) => itemLower.includes(keyword))

  if (isLikelyFood) {
    return {
      isFood: true,
      reason: `"${itemName}" appears to be a food item based on description.`,
    }
  }

  // Default: uncertain items are rejected
  return {
    isFood: false,
    reason: `"${itemName}" could not be confirmed as a food item. Please try items like: apple, banana, tomato, lettuce, chicken, milk, bread, etc.`,
  }
}

export async function detectFoodSpoilage(input: FoodDetectionInput) {
  const { itemName, description, daysSincePurchase = 0, storageCondition = "room temperature" } = input

  // First, validate if it's a food item
  const validation = await validateIsFoodItem(itemName, description)
  if (!validation.isFood) {
    return {
      itemName,
      status: "not a food item",
      confidence: 0.95,
      details: validation.reason,
      shelfLife: 0,
      recommendations: ["Please upload an image of an actual food item"],
    }
  }

  const itemLower = itemName.toLowerCase().trim()
  const foodInfo = foodDatabase[itemLower] || {
    category: "other",
    fresh: 5,
    spoiling: 10,
    spoilageIndicators: ["discoloration", "odor", "texture change"],
  }

  // Analyze storage condition impact
  const storageMultiplier = getStorageConditionMultiplier(storageCondition)
  const adjustedFreshDays = foodInfo.fresh * storageMultiplier
  const adjustedSpoilingDays = foodInfo.spoiling * storageMultiplier

  // Determine status based on days since purchase
  let status: "fresh" | "spoiling" | "spoiled"
  let confidence: number

  if (daysSincePurchase <= adjustedFreshDays) {
    status = "fresh"
    confidence = 0.85 + (daysSincePurchase / adjustedFreshDays) * 0.1
  } else if (daysSincePurchase <= adjustedSpoilingDays) {
    status = "spoiling"
    confidence = 0.8
  } else {
    status = "spoiled"
    confidence = 0.9
  }

  // Check description for spoilage indicators
  if (description) {
    const descLower = description.toLowerCase()
    const hasIndicators = foodInfo.spoilageIndicators.some((indicator) => descLower.includes(indicator))
    if (hasIndicators && status === "fresh") {
      status = "spoiling"
      confidence = 0.85
    }
  }

  // Calculate remaining shelf life
  const remainingDays =
    status === "fresh"
      ? Math.max(0, adjustedFreshDays - daysSincePurchase)
      : status === "spoiling"
        ? Math.max(0, adjustedSpoilingDays - daysSincePurchase)
        : 0

  // Generate recommendations based on status
  const recommendations = generateRecommendations(status, itemName, foodInfo, storageCondition)

  return {
    itemName,
    status,
    confidence: Math.min(Math.max(confidence, 0), 1),
    details: getDetailedMessage(status, itemName, daysSincePurchase, foodInfo),
    shelfLife: remainingDays,
    recommendations,
  }
}

function getStorageConditionMultiplier(condition: string): number {
  const condLower = condition.toLowerCase()

  if (condLower.includes("refrigerate") || condLower.includes("fridge") || condLower.includes("cold")) {
    return 1.5 // Cold storage extends shelf life
  }
  if (condLower.includes("freeze") || condLower.includes("freezer")) {
    return 3 // Freezer significantly extends shelf life
  }
  if (condLower.includes("warm") || condLower.includes("hot")) {
    return 0.6 // Warm conditions shorten shelf life
  }
  return 1 // Room temperature (baseline)
}

function getDetailedMessage(
  status: string,
  itemName: string,
  days: number,
  foodInfo: (typeof foodDatabase)[string],
): string {
  if (status === "fresh") {
    return `${itemName} is fresh and suitable for immediate use. Stored for ${days} days.`
  }
  if (status === "spoiling") {
    return `${itemName} is starting to spoil. Used within ${foodInfo.spoiling} days. Consider using soon for best quality.`
  }
  return `${itemName} appears to be spoiled. Not recommended for consumption.`
}

function generateRecommendations(
  status: string,
  itemName: string,
  foodInfo: (typeof foodDatabase)[string],
  storageCondition: string,
): string[] {
  const recommendations: string[] = []

  if (status === "fresh") {
    recommendations.push(`Store ${itemName} properly to maintain freshness`)
    recommendations.push(`Use within ${foodInfo.fresh} days for best quality`)
    if (!storageCondition.toLowerCase().includes("refrigerate")) {
      recommendations.push("Consider refrigerating to extend shelf life")
    }
  } else if (status === "spoiling") {
    recommendations.push(`Use ${itemName} soon in recipes or cooking`)
    recommendations.push("Check for spoilage indicators before consuming")
    recommendations.push(`Suggested recipes: Search for ${itemName} recipes in our app`)
  } else {
    recommendations.push("Do not consume - discard safely")
    recommendations.push("Compost if possible")
  }

  return recommendations
}
