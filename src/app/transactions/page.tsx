"use client"

import { useState } from "react"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye } from "lucide-react"
import TransactionTable from "@/src/components/transactions/TransactionTable"
import TransactionModal from "@/src/components/transactions/TransactionModal"
import FilterBar from "@/src/components/transactions/FilterBar"
import { useFinanceStore } from "@/src/store/useFinanceStore"
import { Transaction } from "@/src/types"


export default function TransactionsPage() {
  const { role, getFilteredTransactions } = useFinanceStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditingTransaction(null)
  }

  const total = getFilteredTransactions().length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{total} transactions</p>
        </div>

        {role === "admin" ? (
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-primary text-primary-foreground flex items-center gap-2"
            size="sm"
          >
            <Plus size={15} /> Add Transaction
          </Button>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs">
            <Eye size={13} /> View only
          </div>
        )}
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-4 border-b border-border">
          <FilterBar />
        </CardHeader>
        <CardContent className="p-0">
          <TransactionTable onEdit={handleEdit} />
        </CardContent>
      </Card>

      <TransactionModal
        open={modalOpen}
        onClose={handleClose}
        transaction={editingTransaction}
      />
    </div>
  )
}