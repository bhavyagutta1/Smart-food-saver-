"use client"

export default function WasteChart({ title, data }: { title: string; data: any[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-8">{title}</h3>

      <div className="flex items-center justify-center mb-8">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#22c55e"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(data[0].value / total) * 314} 314`}
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#ef4444"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(data[1].value / total) * 314} 314`}
              strokeDashoffset={`-${(data[0].value / total) * 314}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">{data[0].value}%</p>
              <p className="text-xs text-gray-500 mt-1">Food Saved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
