"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import { clsx } from "clsx"

const navItems = [
  { href: "/dashboard",             label: "Dashboard",    icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transactions", icon: ArrowLeftRight  },
  { href: "/dashboard/insights",     label: "Insights",     icon: Lightbulb       },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-bg-secondary border-r border-border flex flex-col z-20">
      
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
            <TrendingUp size={16} className="text-purple-500" />
          </div>
          <span className="font-display font-extrabold text-2xl text-purple-500 tracking-tight">
            FinTrack
          </span>
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-accent-blue/15 text-purple-400"
                  : "text-gray-600 hover:text-white hover:bg-bg-hover"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

     
    </aside>
  )
}