"use client"

import { useFinanceStore } from "../store/useFinanceStore"

export default function Home() {
  const { transactions, role } = useFinanceStore()
  return (
    <div>
      <p>Role: {role}</p>
      <p>Transactions: {transactions.length}</p>
      
    </div>
  )
}