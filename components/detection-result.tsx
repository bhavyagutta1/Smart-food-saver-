"use client"

import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"

interface DetectionResultProps {
  data: {
    itemName: string
    status: "fresh" | "spoiling" | "spoiled"
    confidence: number
    details: string
    recipes?: string[]
  }
}

export default function DetectionResult({ data }: DetectionResultProps) {
  const statusConfig = {
    fresh: {
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      badge: "bg-emerald-100 text-emerald-800",
      label: "Fresh",
    },
    spoiling: {
      icon: AlertTriangle,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      badge: "bg-yellow-100 text-yellow-800",
      label: "Spoiling",
    },
    spoiled: {
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      badge: "bg-red-100 text-red-800",
      label: "Spoiled",
    },
  }

  const config = statusConfig[data.status]
  const Icon = config.icon

  const mockRecipes = {
    fresh: ["Apple Pie", "Fruit Salad", "Fresh Smoothie"],
    spoiling: ["Banana Bread", "Tomato Soup", "Vegetable Stew"],
    spoiled: [],
  }

  return (
    <div className={`rounded-2xl p-8 mt-8 ${config.bg}`}>
      <div className="flex items-start gap-4 mb-6">
        <Icon className={`w-8 h-8 ${config.color} flex-shrink-0`} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{data.itemName}</h2>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${config.badge} mt-2`}>
            {config.label}
          </span>
        </div>
        <div className="ml-auto text-right">
          <p className="text-3xl font-bold text-gray-900">{Math.round(data.confidence * 100)}%</p>
          <p className="text-xs text-gray-600">Confidence</p>
        </div>
      </div>

      <p className="text-gray-700 mb-6 leading-relaxed">{data.details}</p>

      {data.status !== "spoiled" && mockRecipes[data.status].length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Recommended Recipes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mockRecipes[data.status].map((recipe) => (
              <button
                key={recipe}
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 transition"
              >
                {recipe}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
