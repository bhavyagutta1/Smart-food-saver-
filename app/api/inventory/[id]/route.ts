import { NextResponse } from "next/server"
import { dbStore, trackHistory } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const item = dbStore.inventory.find((i) => i.id === id)

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedData = await request.json()

    const itemIndex = dbStore.inventory.findIndex((i) => i.id === id)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    const oldItem = dbStore.inventory[itemIndex]
    dbStore.inventory[itemIndex] = { ...oldItem, ...updatedData }

    // Track status changes
    if (oldItem.status !== updatedData.status) {
      trackHistory(updatedData.name, updatedData.status, updatedData.quantity, "status updated")
    }

    return NextResponse.json(dbStore.inventory[itemIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const item = dbStore.inventory.find((i) => i.id === id)

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    dbStore.inventory = dbStore.inventory.filter((i) => i.id !== id)

    // Track deletion
    trackHistory(item.name, item.status, item.quantity, "removed")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}
