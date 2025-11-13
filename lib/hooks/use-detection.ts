"use client"

import { useState } from "react"
import type { DetectionResult } from "@/lib/types"

export function useDetection() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const detect = async (
    itemName: string,
    description?: string,
    daysSincePurchase?: number,
    storageCondition?: string,
    imageUrl?: string,
  ): Promise<DetectionResult | null> => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/detection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName,
          description,
          daysSincePurchase,
          storageCondition,
          imageUrl,
        }),
      })

      if (!response.ok) throw new Error("Detection failed")
      const result = await response.json()
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : "Detection failed"
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { detect, loading, error }
}
