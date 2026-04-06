"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore } from "@/src/store/useFinanceStore"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-sm shadow-xl">
        <p className="text-muted-foreground font-medium mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.fill }} className="capitalize">
            {entry.name}: ৳{entry.value.toLocaleString()}
          </p>
        ))}
        <p className="text-muted-foreground text-xs mt-1 border-t border-border pt-1">
          Saved: ৳{(payload[0]?.value - payload[1]?.value).toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function MonthlyComparisonChart() {
  const { transactions } = useFinanceStore()

  const monthlyMap: Record<string, { income: number; expense: number }> = {}
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7)
    if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 }
    monthlyMap[month][t.type] += t.amount
  })

  const data = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, values]) => ({
      month: new Date(month + "-01").toLocaleString("default", {
        month: "short", year: "2-digit",
      }),
      income: values.income,
      expense: values.expense,
      saved: values.income - values.expense,
    }))

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-base font-semibold">
          Monthly Income vs Expenses
        </CardTitle>
        <p className="text-xs text-muted-foreground">Side by side comparison per month</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-xs text-muted-foreground capitalize">{value}</span>
              )}
            />
            <Bar dataKey="income" fill="#34d399" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}