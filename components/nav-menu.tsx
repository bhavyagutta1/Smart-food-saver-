"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChefHat, Package, Home } from "lucide-react"

export default function NavMenu() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/inventory", label: "Inventory", icon: Package },
    { href: "/recipes", label: "Recipes", icon: ChefHat },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <nav className="flex gap-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
              isActive ? "bg-emerald-100 text-emerald-700" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
