"use client"

import { useState } from "react"
import Header from "@/components/header"
import WasteChart from "@/components/waste-chart"
import HistoryTimeline from "@/components/history-timeline"
import SavingsCard from "@/components/savings-card"
import { BarChart3, TrendingDown, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  // Mock analytics data
  const mockHistory = [
    {
      id: 1,
      item: "Apple",
      status: "fresh",
      date: new Date("2024-11-13"),
      quantity: 5,
      action: "Analyzed & Stored",
    },
    {
      id: 2,
      item: "Banana",
      status: "spoiling",
      date: new Date("2024-11-12"),
      quantity: 3,
      action: "Used for Banana Bread",
    },
    {
      id: 3,
      item: "Tomato",
      status: "fresh",
      date: new Date("2024-11-11"),
      quantity: 2,
      action: "Analyzed & Stored",
    },
    {
      id: 4,
      item: "Lettuce",
      status: "spoiled",
      date: new Date("2024-11-10"),
      quantity: 1,
      action: "Disposed",
    },
    {
      id: 5,
      item: "Orange",
      status: "fresh",
      date: new Date("2024-11-09"),
      quantity: 6,
      action: "Analyzed & Stored",
    },
  ]

  const wasteData = [
    { name: "Saved", value: 65, color: "bg-emerald-500" },
    { name: "Wasted", value: 35, color: "bg-red-500" },
  ]

  const dailyData = [
    { day: "Mon", fresh: 8, spoiling: 2, spoiled: 1 },
    { day: "Tue", fresh: 10, spoiling: 1, spoiled: 0 },
    { day: "Wed", fresh: 6, spoiling: 3, spoiled: 2 },
    { day: "Thu", fresh: 9, spoiling: 2, spoiled: 1 },
    { day: "Fri", fresh: 12, spoiling: 2, spoiled: 0 },
    { day: "Sat", fresh: 7, spoiling: 1, spoiled: 1 },
    { day: "Sun", fresh: 11, spoiling: 3, spoiled: 2 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Analytics & Insights</h1>
          </div>
          <p className="text-gray-600">Track your food waste reduction journey and environmental impact</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-3 mb-8">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                timeRange === range
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-emerald-500"
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SavingsCard title="Items Saved" value={156} change={12} color="emerald" icon={TrendingDown} />
          <SavingsCard title="CO₂ Prevented" value="24 kg" change={5} color="blue" icon={Calendar} />
          <SavingsCard title="Money Saved" value="$87.50" change={18} color="green" icon={TrendingDown} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <WasteChart title="Waste Prevention Rate" data={wasteData} />
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Item Status</h3>
            <div className="space-y-4">
              {dailyData.map((day) => (
                <div key={day.day}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{day.day}</span>
                    <span className="text-xs text-gray-500">{day.fresh + day.spoiling + day.spoiled} items</span>
                  </div>
                  <div className="flex h-2 gap-1 rounded-full overflow-hidden bg-gray-200">
                    <div
                      className="bg-emerald-500"
                      style={{ width: `${(day.fresh / (day.fresh + day.spoiling + day.spoiled)) * 100}%` }}
                    />
                    <div
                      className="bg-yellow-500"
                      style={{ width: `${(day.spoiling / (day.fresh + day.spoiling + day.spoiled)) * 100}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${(day.spoiled / (day.fresh + day.spoiling + day.spoiled)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <HistoryTimeline items={mockHistory} />
      </div>
    </main>
  )
}
