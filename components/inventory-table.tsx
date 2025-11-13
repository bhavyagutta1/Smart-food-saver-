"use client"

import { Trash2, Edit2 } from "lucide-react"

interface InventoryTableProps {
  items: any[]
  onDelete: (id: number) => void
  onUpdateStatus: (id: number, status: string) => void
}

export default function InventoryTable({ items, onDelete, onUpdateStatus }: InventoryTableProps) {
  const statusConfig = {
    fresh: { color: "bg-emerald-100 text-emerald-800", label: "Fresh" },
    spoiling: { color: "bg-yellow-100 text-yellow-800", label: "Spoiling" },
    spoiled: { color: "bg-red-100 text-red-800", label: "Spoiled" },
  }

  const getStorageLocation = (date: Date) => {
    const days = Math.floor((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return days <= 0 ? "Expired" : `${days} days`
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Item Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time Left</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No items in inventory. Add one to get started!
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.location}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{getStorageLocation(item.expiryDate)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer border-0 ${statusConfig[item.status as keyof typeof statusConfig].color}`}
                    >
                      <option value="fresh">Fresh</option>
                      <option value="spoiling">Spoiling</option>
                      <option value="spoiled">Spoiled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
