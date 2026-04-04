"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore } from "@/src/store/useFinanceStore"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const COLORS = ["#4f8ef7", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#fb923c", "#38bdf8"]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-sm shadow-xl">
        <p className="text-foreground font-medium">{payload[0].name}</p>
        <p className="text-muted-foreground">৳{payload[0].value.toLocaleString()}</p>
        <p className="text-muted-foreground">{payload[0].payload.percent}%</p>
      </div>
    )
  }
  return null
}

export default function SpendingBreakdownChart() {
  const { transactions } = useFinanceStore()

  const expenses = transactions.filter((t) => t.type === "expense")
  const total = expenses.reduce((sum, t) => sum + t.amount, 0)

  const categoryMap: Record<string, number> = {}
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount
  })

  const data = Object.entries(categoryMap)
    .map(([name, value]) => ({
      name,
      value,
      percent: ((value / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-base font-semibold text-foreground">
          Spending Breakdown
        </CardTitle>
        <p className="text-xs text-muted-foreground">Expenses by category</p>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-[240px] flex items-center justify-center text-muted-foreground text-sm">
            No expense data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}