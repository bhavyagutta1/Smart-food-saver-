"use client"

import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface HistoryTimelineProps {
  items: any[]
}

export default function HistoryTimeline({ items }: HistoryTimelineProps) {
  const statusConfig = {
    fresh: { icon: CheckCircle, color: "text-emerald-600 bg-emerald-50", label: "Fresh" },
    spoiling: { icon: AlertTriangle, color: "text-yellow-600 bg-yellow-50", label: "Spoiling" },
    spoiled: { icon: AlertCircle, color: "text-red-600 bg-red-50", label: "Spoiled" },
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Activity History</h3>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const Icon = statusConfig[item.status as keyof typeof statusConfig].icon
          const config = statusConfig[item.status as keyof typeof statusConfig]

          return (
            <div key={item.id} className="flex gap-4">
              <div className={`p-2 rounded-full ${config.color} flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.quantity}x {item.item}
                    </p>
                    <p className="text-sm text-gray-600">{item.action}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatDistanceToNow(item.date, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
