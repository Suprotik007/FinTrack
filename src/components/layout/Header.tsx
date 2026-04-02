"use client"

import { usePathname } from "next/navigation"
import { useFinanceStore } from "../../store/useFinanceStore"
import { Role } from "../../types"
import { ShieldCheck, Eye } from "lucide-react"

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/":             { title: "Dashboard",    subtitle: "Your financial overview"     },
  "/transactions": { title: "Transactions", subtitle: "All your financial activity" },
  "/insights":     { title: "Insights",     subtitle: "Patterns and observations"   },
}

export default function Header() {
  const pathname = usePathname()
  const { role, setRole } = useFinanceStore()

  const page = pageTitles[pathname] ?? { title: "Dashboard", subtitle: "" }

  return (
    <header className="h-16 border-b border-border bg-bg-secondary/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Page title */}
      <div>
        <h1 className="font-display font-semibold text-white text-base leading-tight">
          {page.title}
        </h1>
        <p className="text-xs text-muted">{page.subtitle}</p>
      </div>

      {/* Role switcher */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted hidden sm:block">Role:</span>
        <div className="flex items-center gap-1 bg-bg-card border border-border rounded-lg p-1">
          {(["admin", "viewer"] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 capitalize
                ${role === r
                  ? "bg-accent-blue text-white shadow"
                  : "text-muted hover:text-white"
                }`}
            >
              {r === "admin" ? <ShieldCheck size={12} /> : <Eye size={12} />}
              {r}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}