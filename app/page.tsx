"use client"

import { useState } from "react"
import Header from "@/components/header"
import ImageUploader from "@/components/image-uploader"
import DetectionResult from "@/components/detection-result"
import InventoryOverview from "@/components/inventory-overview"

type DetectionData = {
  itemName: string
  status: "fresh" | "spoiling" | "spoiled"
  confidence: number
  details: string
  recipes?: string[]
} | null

export default function Home() {
  const [detectionData, setDetectionData] = useState<DetectionData>(null)
  const [inventory, setInventory] = useState<any[]>([])

  const handleDetection = (data: DetectionData) => {
    setDetectionData(data)
    if (data) {
      setInventory((prev) => [...prev, { ...data, timestamp: new Date() }])
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Section */}
          <div className="lg:col-span-2">
            <ImageUploader onDetection={handleDetection} />
            {detectionData && <DetectionResult data={detectionData} />}
          </div>

          {/* Sidebar */}
          <div>
            <InventoryOverview items={inventory} />
          </div>
        </div>
      </div>
    </main>
  )
}
