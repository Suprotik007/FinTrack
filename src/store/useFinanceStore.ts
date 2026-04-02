import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Transaction, FilterState, Role } from "../types"
import { mockTransactions } from "../data/transaction"

interface FinanceStore {
  // --- State ---
  transactions: Transaction[]
  role: Role
  filters: FilterState

  // --- Role Actions ---
  setRole: (role: Role) => void

  // --- Transaction Actions ---
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  updateTransaction: (id: string, updated: Omit<Transaction, "id">) => void
  deleteTransaction: (id: string) => void

  // --- Filter Actions ---
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void

  // --- Derived helpers (computed inside actions) ---
  getFilteredTransactions: () => Transaction[]
}

const defaultFilters: FilterState = {
  search: "",
  category: "all",
  type: "all",
  sortBy: "date",
  sortOrder: "desc",
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: "admin",
      filters: defaultFilters,

      setRole: (role) => set({ role }),

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: crypto.randomUUID(),
        }
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }))
      },

      updateTransaction: (id, updated) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...updated, id } : t
          ),
        }))
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }))
      },

      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }))
      },

      resetFilters: () => set({ filters: defaultFilters }),

      getFilteredTransactions: () => {
        const { transactions, filters } = get()
        let result = [...transactions]

        // Search
        if (filters.search) {
          const q = filters.search.toLowerCase()
          result = result.filter((t) =>
            t.description.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
          )
        }

        // Category filter
        if (filters.category !== "all") {
          result = result.filter((t) => t.category === filters.category)
        }

        // Type filter
        if (filters.type !== "all") {
          result = result.filter((t) => t.type === filters.type)
        }

        // Sort
        result.sort((a, b) => {
          if (filters.sortBy === "date") {
            return filters.sortOrder === "desc"
              ? new Date(b.date).getTime() - new Date(a.date).getTime()
              : new Date(a.date).getTime() - new Date(b.date).getTime()
          } else {
            return filters.sortOrder === "desc"
              ? b.amount - a.amount
              : a.amount - b.amount
          }
        })

        return result
      },
    }),
    {
      name: "finance-store", 
      partialize: (state) => ({
  transactions: state.transactions,
  role: state.role,
}),
    }
  )
)