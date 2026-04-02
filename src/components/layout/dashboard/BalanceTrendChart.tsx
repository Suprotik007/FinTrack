"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFinanceStore } from "@/src/store/useFinanceStore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function getMonthlyData(transactions: ReturnType<typeof useFinanceStore.getState>["transactions"]) {
  const map: Record<string, { income: number; expenses: number }> = {}

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7) 
    if (!map[month]) map[month] = { income: 0, expenses: 0 }
    if (t.type === "income") map[month].income += t.amount
    else map[month].expenses += t.amount
  })

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: new Date(month + "-01").toLocaleString("default", {
        month: "short",
        year: "2-digit",
      }),
      balance: data.income - data.expenses,
      income: data.income,
      expenses: data.expenses,
    }))
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 text-sm shadow-xl">
        <p className="text-muted-foreground mb-2 font-medium">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.color }} className="capitalize">
            {entry.name}: ৳{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function BalanceTrendChart() {
  const { transactions } = useFinanceStore()
  const data = getMonthlyData(transactions)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-base font-semibold text-foreground">
          Monthly Overview
        </CardTitle>
        <p className="text-xs text-muted-foreground">Income vs Expenses over time</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#incomeGrad)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#f87171"
              strokeWidth={2}
              fill="url(#expenseGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}