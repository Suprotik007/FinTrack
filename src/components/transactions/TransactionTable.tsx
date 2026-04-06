"use client"

import { useFinanceStore } from "@/src/store/useFinanceStore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Transaction } from "@/types"

const CATEGORY_COLORS: Record<string, string> = {
  Salary:        "bg-blue-500/15 text-blue-400",
  Freelance:     "bg-cyan-500/15 text-cyan-400",
  Food:          "bg-orange-500/15 text-orange-400",
  Transport:     "bg-yellow-500/15 text-yellow-400",
  Rent:          "bg-purple-500/15 text-purple-400",
  Entertainment: "bg-pink-500/15 text-pink-400",
  Healthcare:    "bg-green-500/15 text-green-400",
  Shopping:      "bg-red-500/15 text-red-400",
  Utilities:     "bg-slate-500/15 text-slate-400",
  Other:         "bg-gray-500/15 text-gray-400",
}

interface Props {
  onEdit: (transaction: Transaction) => void
}

export default function TransactionTable({ onEdit }: Props) {
  const { getFilteredTransactions, deleteTransaction, role } = useFinanceStore()
  const transactions = getFilteredTransactions()

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-foreground font-medium">No transactions found</p>
        <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
            <th className="text-left py-3 px-4 text-muted-foreground font-medium">Description</th>
            <th className="text-left py-3 px-4 text-muted-foreground font-medium">Category</th>
            <th className="text-left py-3 px-4 text-muted-foreground font-medium">Type</th>
            <th className="text-right py-3 px-4 text-muted-foreground font-medium">Amount</th>
            {role === "admin" && (
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr
              key={t.id}
              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
            >
              <td className="py-3 px-4 text-muted-foreground">
                {new Date(t.date).toLocaleDateString("en-GB", {
                  day: "2-digit", month: "short", year: "numeric"
                })}
              </td>
              <td className="py-3 px-4 text-foreground font-medium">{t.description}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[t.category] ?? ""}`}>
                  {t.category}
                </span>
              </td>
              <td className="py-3 px-4">
                <Badge
                  className={t.type === "income"
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                    : "bg-red-500/15 text-red-400 border-red-500/20 hover:bg-red-500/20"
                  }
                >
                  {t.type}
                </Badge>
              </td>
              <td className={`py-3 px-4 text-right font-semibold ${
                t.type === "income" ? "text-emerald-400" : "text-red-400"
              }`}>
                {t.type === "income" ? "+" : "-"}৳{t.amount.toLocaleString()}
              </td>
              {role === "admin" && (
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(t)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil size={13} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTransaction(t.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-red-400"
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}