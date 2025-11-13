"use client"

import { useState, useEffect } from "react"
import type { InventoryItem } from "@/lib/types"

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadInventory()
  }, [])

  const loadInventory = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/inventory")
      if (!response.ok) throw new Error("Failed to fetch inventory")
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inventory")
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (item: Omit<InventoryItem, "id" | "addedDate">) => {
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
      if (!response.ok) throw new Error("Failed to add item")
      const newItem = await response.json()
      setItems([...items, newItem])
      return newItem
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add item"
      setError(message)
      throw err
    }
  }

  const updateItem = async (id: number, updates: Partial<InventoryItem>) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update item")
      const updated = await response.json()
      setItems(items.map((item) => (item.id === id ? updated : item)))
      return updated
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update item"
      setError(message)
      throw err
    }
  }

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`/api/inventory/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete item")
      setItems(items.filter((item) => item.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete item"
      setError(message)
      throw err
    }
  }

  return { items, loading, error, addItem, updateItem, deleteItem, reload: loadInventory }
}
