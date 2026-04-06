"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useFinanceStore } from "@/src/store/useFinanceStore"
import { TrendingUp, TrendingDown, Flame, PiggyBank } from "lucide-react"

export default function InsightCards() {
  const { transactions } = useFinanceStore()

  const expenses = transactions.filter((t) => t.type === "expense")

  // Highest spending category
  const categoryMap: Record<string, number> = {}
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount
  })
  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]

  // Monthly totals
  const monthlyMap: Record<string, { income: number; expense: number }> = {}
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7)
    if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 }
    monthlyMap[month][t.type] += t.amount
  })
  const months = Object.entries(monthlyMap).sort(([a], [b]) => a.localeCompare(b))
  const lastMonth = months[months.length - 1]
  const prevMonth = months[months.length - 2]

  const expenseChange = lastMonth && prevMonth
    ? (((lastMonth[1].expense - prevMonth[1].expense) / prevMonth[1].expense) * 100).toFixed(1)
    : null

  // Average daily spend
  const totalDays = 90
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0)
  const avgDaily = (totalExpense / totalDays).toFixed(0)

  // Best saving month
  const bestMonth = months.reduce((best, curr) => {
    const saving = curr[1].income - curr[1].expense
    const bestSaving = best[1].income - best[1].expense
    return saving > bestSaving ? curr : best
  }, months[0])

  const bestMonthName = bestMonth
    ? new Date(bestMonth[0] + "-01").toLocaleString("default", { month: "long", year: "numeric" })
    : "N/A"

  const cards = [
    {
      title: "Top Spending Category",
      value: topCategory ? topCategory[0] : "N/A",
      sub: topCategory ? `৳${topCategory[1].toLocaleString()} total spent` : "No expenses yet",
      icon: Flame,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
      valueColor: "text-orange-400",
    },
    {
      title: "Month-over-Month Expenses",
      value: expenseChange !== null ? `${expenseChange > "0" ? "+" : ""}${expenseChange}%` : "N/A",
      sub: lastMonth ? `${new Date(lastMonth[0] + "-01").toLocaleString("default", { month: "long" })} vs previous` : "",
      icon: Number(expenseChange) > 0 ? TrendingUp : TrendingDown,
      iconBg: Number(expenseChange) > 0 ? "bg-red-500/10" : "bg-emerald-500/10",
      iconColor: Number(expenseChange) > 0 ? "text-red-400" : "text-emerald-400",
      valueColor: Number(expenseChange) > 0 ? "text-red-400" : "text-emerald-400",
    },
    {
      title: "Avg Daily Spend",
      value: `৳${Number(avgDaily).toLocaleString()}`,
      sub: "Over the last 90 days",
      icon: TrendingDown,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      valueColor: "text-blue-400",
    },
    {
      title: "Best Saving Month",
      value: bestMonthName,
      sub: bestMonth
        ? `Saved ৳${(bestMonth[1].income - bestMonth[1].expense).toLocaleString()}`
        : "",
      icon: PiggyBank,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      valueColor: "text-emerald-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                  <Icon size={16} className={card.iconColor} />
                </div>
              </div>
              <p className={`text-xl font-display font-bold ${card.valueColor}`}>
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}