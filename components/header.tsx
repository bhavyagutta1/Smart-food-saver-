import NavMenu from "@/components/nav-menu"

export default function Header() {
  return (
    <header className="bg-white border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍎</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart FoodSaver</h1>
              <p className="text-sm text-gray-500">AI-Powered Food Waste Reduction</p>
            </div>
          </div>
          <NavMenu />
        </div>
      </div>
    </header>
  )
}
