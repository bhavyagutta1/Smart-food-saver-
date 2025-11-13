"use client"

import { useState, useEffect } from "react"

interface Analytics {
  itemsSaved: number
  itemsSpoiled: number
  wasteRate: number
  co2Prevented: string
  moneySaved: number
  weeklyBreakdown: {
    fresh: number
    spoiling: number
    spoiled: number
  }
}

interface AnalyticsData {
  analytics: Analytics
  inventory: {
    fresh: number
    spoiling: number
    spoiled: number
    total: number
  }
  recentHistory: any[]
}

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/analytics")
      if (!response.ok) throw new Error("Failed to fetch analytics")
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load analytics"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, reload: loadAnalytics }
}
