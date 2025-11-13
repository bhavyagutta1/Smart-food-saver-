"use client"

import { useState } from "react"
import type { Recipe } from "@/lib/types"

export function useRecipes() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = async (category?: "fresh" | "spoiling"): Promise<Recipe[]> => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (category) params.append("category", category)

      const response = await fetch(`/api/recipes?${params}`)
      if (!response.ok) throw new Error("Failed to fetch recipes")
      return await response.json()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch recipes"
      setError(message)
      return []
    } finally {
      setLoading(false)
    }
  }

  const searchRecipes = async (query: string): Promise<Recipe[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/recipes?search=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Failed to search recipes")
      return await response.json()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to search recipes"
      setError(message)
      return []
    } finally {
      setLoading(false)
    }
  }

  const getRecommendations = async (): Promise<Recipe[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/recipes?recommend=true")
      if (!response.ok) throw new Error("Failed to fetch recommendations")
      return await response.json()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch recommendations"
      setError(message)
      return []
    } finally {
      setLoading(false)
    }
  }

  return { fetchRecipes, searchRecipes, getRecommendations, loading, error }
}
