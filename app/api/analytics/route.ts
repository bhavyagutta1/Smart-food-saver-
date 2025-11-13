import { NextResponse } from "next/server"
import { getAnalytics } from "@/lib/db"
import { dbStore } from "@/lib/db"

export async function GET() {
  try {
    const analytics = getAnalytics()

    const currentInventory = {
      fresh: dbStore.inventory.filter((i) => i.status === "fresh").length,
      spoiling: dbStore.inventory.filter((i) => i.status === "spoiling").length,
      spoiled: dbStore.inventory.filter((i) => i.status === "spoiled").length,
      total: dbStore.inventory.length,
    }

    const recentHistory = dbStore.history.slice(-10).reverse()

    return NextResponse.json({
      analytics,
      inventory: currentInventory,
      recentHistory,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
