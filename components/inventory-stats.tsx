"use client"

import { Package, AlertCircle, CheckCircle, TrendingUp } from "lucide-react"

interface InventoryStatsProps {
  items: any[]
}

export default function InventoryStats({ items }: InventoryStatsProps) {
  const fresh = items.filter((i) => i.status === "fresh").length
  const spoiling = items.filter((i) => i.status === "spoiling").length
  const spoiled = items.filter((i) => i.status === "spoiled").length
  const total = items.length

  const stats = [
    {
      label: "Total Items",
      value: total,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Fresh Items",
      value: fresh,
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Spoiling Soon",
      value: spoiling,
      icon: AlertCircle,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Spoiled",
      value: spoiled,
      icon: TrendingUp,
      color: "bg-red-50 text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <div key={idx} className={`rounded-2xl p-6 border border-gray-100 ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <Icon className="w-8 h-8 opacity-20" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
