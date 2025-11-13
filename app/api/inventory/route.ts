import { NextResponse } from "next/server"
import { dbStore, trackHistory } from "@/lib/db"
import type { InventoryItem } from "@/lib/types"

export async function GET() {
  try {
    return NextResponse.json(dbStore.inventory)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json()

    const newItem: InventoryItem = {
      ...item,
      id: Math.max(...dbStore.inventory.map((i) => i.id || 0), 0) + 1,
      addedDate: new Date(),
    }

    dbStore.inventory.push(newItem)

    // Track in history
    trackHistory(item.name, item.status, item.quantity, "added")

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
  }
}
