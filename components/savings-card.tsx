"use client"

import type { LucideIcon } from "lucide-react"
import { ArrowUp } from "lucide-react"

interface SavingsCardProps {
  title: string
  value: string | number
  change: number
  color: "emerald" | "blue" | "green"
  icon: LucideIcon
}

export default function SavingsCard({ title, value, change, color, icon: Icon }: SavingsCardProps) {
  const colorConfig = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorConfig[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
          <ArrowUp className="w-4 h-4" />
          {change}%
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
