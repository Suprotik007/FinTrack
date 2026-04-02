export type TransactionType = "income" | "expense"

export type Category =
  | "Salary"
  | "Freelance"
  | "Food"
  | "Transport"
  | "Rent"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Utilities"
  | "Other"

export type Role = "admin" | "viewer"

export interface Transaction {
  id: string
  date: string       
  description: string
  category: Category
  amount: number      
  type: TransactionType
}

export interface FilterState {
  search: string
  category: Category | "all"
  type: TransactionType | "all"
  sortBy: "date" | "amount"
  sortOrder: "asc" | "desc"
}