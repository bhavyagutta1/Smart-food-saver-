"use client"

import { Leaf, TrendingDown } from "lucide-react"

interface InventoryOverviewProps {
  items: any[]
}

export default function InventoryOverview({ items }: InventoryOverviewProps) {
  const safeItems = items || []
  const fresh = safeItems.filter((i) => i.status === "fresh").length
  const spoiling = safeItems.filter((i) => i.status === "spoiling").length
  const spoiled = safeItems.filter((i) => i.status === "spoiled").length
  const totalWasted = spoiled
  const wastePercentage = safeItems.length ? Math.round((totalWasted / safeItems.length) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
        <h3 className="font-semibold text-gray-900 mb-4">Inventory Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-gray-600">Fresh</span>
            </div>
            <span className="font-bold text-emerald-600">{fresh}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600">Spoiling</span>
            </div>
            <span className="font-bold text-yellow-600">{spoiling}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Spoiled</span>
            </div>
            <span className="font-bold text-red-600">{spoiled}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200">
        <div className="flex items-center gap-2 mb-3">
          <Leaf className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Impact</h3>
        </div>
        <p className="text-2xl font-bold text-emerald-700">{safeItems.length}</p>
        <p className="text-sm text-emerald-600">Items Analyzed</p>
        <div className="mt-4 pt-4 border-t border-emerald-200">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            <p className="text-sm text-emerald-700">
              <span className="font-semibold">{wastePercentage}%</span> waste rate
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
