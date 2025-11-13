"use client"

import { useState } from "react"
import Header from "@/components/header"
import InventoryTable from "@/components/inventory-table"
import AddItemModal from "@/components/add-item-modal"
import InventoryStats from "@/components/inventory-stats"
import { Plus, Download } from "lucide-react"

export default function InventoryPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Apple",
      quantity: 5,
      unit: "pcs",
      status: "fresh",
      addedDate: new Date("2024-11-10"),
      expiryDate: new Date("2024-11-17"),
      location: "Fridge",
    },
    {
      id: 2,
      name: "Banana",
      quantity: 3,
      unit: "pcs",
      status: "spoiling",
      addedDate: new Date("2024-11-08"),
      expiryDate: new Date("2024-11-14"),
      location: "Counter",
    },
    {
      id: 3,
      name: "Tomato",
      quantity: 2,
      unit: "kg",
      status: "fresh",
      addedDate: new Date("2024-11-09"),
      expiryDate: new Date("2024-11-16"),
      location: "Fridge",
    },
    {
      id: 4,
      name: "Lettuce",
      quantity: 1,
      unit: "head",
      status: "spoiling",
      addedDate: new Date("2024-11-07"),
      expiryDate: new Date("2024-11-13"),
      location: "Fridge",
    },
  ])

  const [showModal, setShowModal] = useState(false)

  const handleAddItem = (item: any) => {
    const newItem = {
      ...item,
      id: Math.max(...items.map((i) => i.id), 0) + 1,
      addedDate: new Date(),
    }
    setItems([...items, newItem])
    setShowModal(false)
  }

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: newStatus } : i)))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Track your food items and their freshness status</p>
        </div>

        {/* Stats */}
        <InventoryStats items={items} />

        {/* Controls */}
        <div className="flex justify-between items-center mb-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Items</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition">
              <Download className="w-5 h-5" />
              Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition"
            >
              <Plus className="w-5 h-5" />
              Add Item
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <InventoryTable items={items} onDelete={handleDeleteItem} onUpdateStatus={handleUpdateStatus} />

        {/* Add Item Modal */}
        {showModal && <AddItemModal onAdd={handleAddItem} onClose={() => setShowModal(false)} />}
      </div>
    </main>
  )
}
