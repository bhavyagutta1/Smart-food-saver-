import { NextResponse } from "next/server"
import { detectFoodSpoilage } from "@/lib/ai-detection"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { itemName, description, daysSincePurchase, storageCondition, imageUrl } = await request.json()

    if (!itemName) {
      return NextResponse.json({ error: "Item name is required" }, { status: 400 })
    }

    const result = await detectFoodSpoilage({
      itemName,
      description,
      daysSincePurchase,
      storageCondition,
      imageUrl,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Detection error:", error)
    return NextResponse.json({ error: "Detection failed" }, { status: 500 })
  }
}
