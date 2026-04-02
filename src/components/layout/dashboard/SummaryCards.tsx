"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useFinanceStore } from "@/src/store/useFinanceStore"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function SummaryCards() {
  const { transactions } = useFinanceStore()

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalBalance = totalIncome - totalExpenses

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      icon: Wallet,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      valueColor: "text-white",
      description: "Net across all time",
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      valueColor: "text-emerald-400",
      description: "All income sources",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      valueColor: "text-red-400",
      description: "All spending",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className={`text-2xl font-display font-bold ${card.valueColor}`}>
                    {card.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
                  <Icon size={20} className={card.iconColor} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}