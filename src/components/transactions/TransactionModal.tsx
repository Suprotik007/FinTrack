"use client"

import { useState, useEffect } from "react"
import { useFinanceStore } from "@/src/store/useFinanceStore"

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Category, Transaction } from "@/src/types"

const CATEGORIES: Category[] = [
  "Salary", "Freelance", "Food", "Transport",
  "Rent", "Entertainment", "Healthcare", "Shopping", "Utilities", "Other"
]

interface Props {
  open: boolean
  onClose: () => void
  transaction?: Transaction | null
}

export default function TransactionModal({ open, onClose, transaction }: Props) {
  const { addTransaction, updateTransaction } = useFinanceStore()

  const [form, setForm] = useState({
    description: "",
    category: "Food" as Category,
    amount: "",
    type: "expense" as "income" | "expense",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        category: transaction.category,
        amount: String(transaction.amount),
        type: transaction.type,
        date: transaction.date,
      })
    } else {
      setForm({
        description: "",
        category: "Food",
        amount: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }, [transaction, open])

  const handleSubmit = () => {
    if (!form.description || !form.amount) return
    const data = {
      description: form.description,
      category: form.category,
      amount: parseFloat(form.amount),
      type: form.type,
      date: form.date,
    }
    if (transaction) {
      updateTransaction(transaction.id, data)
    } else {
      addTransaction(data)
    }
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Description</label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="e.g. Monthly Salary"
              className="bg-background border-border"
            />
          </div>

          {/* Amount + Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">Amount (৳)</label>
              <Input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">Type</label>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {(["income", "expense"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, type: t })}
                    className={`flex-1 py-2 text-xs font-medium capitalize transition-all
                      ${form.type === t
                        ? t === "income"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                        : "text-muted-foreground hover:text-foreground bg-background"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
                    ${form.category === cat
                      ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                      : "bg-background border-border text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Date</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-background border-border"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-primary text-primary-foreground"
            >
              {transaction ? "Save Changes" : "Add Transaction"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}