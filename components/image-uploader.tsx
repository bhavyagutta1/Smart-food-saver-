"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, Camera, Loader, AlertCircle, CheckCircle } from "lucide-react"
import { useDetection } from "@/lib/hooks/use-detection"
import { useInventory } from "@/lib/hooks/use-inventory"
import { validateIsFoodItem } from "@/lib/ai-detection"

interface ImageUploaderProps {
  onDetection: (data: any) => void
}

export default function ImageUploader({ onDetection }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [itemName, setItemName] = useState("")
  const [description, setDescription] = useState("")
  const [daysSincePurchase, setDaysSincePurchase] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { detect, loading: detecting } = useDetection()
  const { addItem } = useInventory()

  const [validating, setValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{ isFood: boolean; reason: string } | null>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!itemName.trim()) {
      alert("Please enter the food item name")
      return
    }

    // Validate that the item is a food item
    setValidating(true)
    setValidationResult(null)

    try {
      const validation = await validateIsFoodItem(itemName, description)
      setValidationResult(validation)

      if (!validation.isFood) {
        setValidating(false)
        return
      }

      const result = await detect(itemName, description, daysSincePurchase)

      if (result) {
        onDetection(result)

        try {
          await addItem({
            name: itemName,
            quantity: 1,
            unit: "item",
            status: result.status,
            expiryDate: new Date(Date.now() + result.shelfLife * 24 * 60 * 60 * 1000),
            location: "Kitchen",
          })
        } catch (error) {
          console.log("[v0] Error adding to inventory:", error)
        }

        setItemName("")
        setDescription("")
        setDaysSincePurchase(0)
        setPreview(null)
        setValidationResult(null)
      }
    } finally {
      setValidating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border-2 border-dashed border-emerald-200 p-12 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

        <div className="space-y-4">
          {!preview ? (
            <>
              <div className="flex justify-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Upload or Take a Photo</p>
                <p className="text-sm text-gray-500 mt-1">Drop your food image here or click to browse</p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mx-auto"
              />
              <p className="text-sm text-gray-600">{detecting || validating ? "Analyzing..." : "Analysis complete"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={detecting || validating}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition"
        >
          Upload Image
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" /> Take Photo
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-100">
        <h3 className="font-semibold text-gray-900">Food Item Details</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g., Apple, Banana, Tomato"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={detecting || validating}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., slight brown spots"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={detecting || validating}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Days Since Purchase</label>
          <input
            type="number"
            min="0"
            value={daysSincePurchase}
            onChange={(e) => setDaysSincePurchase(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            disabled={detecting || validating}
          />
        </div>

        {validationResult && (
          <div
            className={`p-4 rounded-lg flex gap-3 items-start ${
              validationResult.isFood ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
          >
            {validationResult.isFood ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`font-semibold text-sm ${validationResult.isFood ? "text-green-900" : "text-red-900"}`}>
                {validationResult.isFood ? "Valid Food Item" : "Not a Food Item"}
              </p>
              <p className={`text-xs mt-1 ${validationResult.isFood ? "text-green-700" : "text-red-700"}`}>
                {validationResult.reason}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={detecting || validating || !itemName.trim()}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
        >
          {detecting || validating ? (
            <>
              <Loader className="w-5 h-5 animate-spin" /> {validating ? "Validating..." : "Analyzing..."}
            </>
          ) : (
            "Analyze Freshness"
          )}
        </button>
      </div>
    </div>
  )
}
