import { Transaction } from "@/types"

export const mockTransactions: Transaction[] = [
  // --- January ---
  { id: "1",  date: "2025-01-03", description: "Monthly Salary",         category: "Salary",        amount: 65000, type: "income"  },
  { id: "2",  date: "2025-01-05", description: "House Rent",             category: "Rent",           amount: 18000, type: "expense" },
  { id: "3",  date: "2025-01-07", description: "Grocery Shopping",       category: "Food",           amount: 3200,  type: "expense" },
  { id: "4",  date: "2025-01-12", description: "Uber rides",             category: "Transport",      amount: 1100,  type: "expense" },
  { id: "5",  date: "2025-01-15", description: "Freelance Project A",    category: "Freelance",      amount: 12000, type: "income"  },
  { id: "6",  date: "2025-01-18", description: "Netflix & Spotify",      category: "Entertainment",  amount: 850,   type: "expense" },
  { id: "7",  date: "2025-01-22", description: "Doctor Visit",           category: "Healthcare",     amount: 2000,  type: "expense" },
  { id: "8",  date: "2025-01-27", description: "Electricity Bill",       category: "Utilities",      amount: 1400,  type: "expense" },

  // --- February ---
  { id: "9",  date: "2025-02-01", description: "Monthly Salary",         category: "Salary",        amount: 65000, type: "income"  },
  { id: "10", date: "2025-02-03", description: "House Rent",             category: "Rent",           amount: 18000, type: "expense" },
  { id: "11", date: "2025-02-06", description: "Restaurant Dinner",      category: "Food",           amount: 2100,  type: "expense" },
  { id: "12", date: "2025-02-10", description: "Freelance Project B",    category: "Freelance",      amount: 8500,  type: "income"  },
  { id: "13", date: "2025-02-14", description: "Gift Shopping",          category: "Shopping",       amount: 3500,  type: "expense" },
  { id: "14", date: "2025-02-19", description: "Bus Pass",               category: "Transport",      amount: 600,   type: "expense" },
  { id: "15", date: "2025-02-23", description: "Internet Bill",          category: "Utilities",      amount: 900,   type: "expense" },
  { id: "16", date: "2025-02-26", description: "Movie Night",            category: "Entertainment",  amount: 700,   type: "expense" },

  // --- March ---
  { id: "17", date: "2025-03-01", description: "Monthly Salary",         category: "Salary",        amount: 65000, type: "income"  },
  { id: "18", date: "2025-03-02", description: "House Rent",             category: "Rent",           amount: 18000, type: "expense" },
  { id: "19", date: "2025-03-05", description: "Weekly Groceries",       category: "Food",           amount: 2800,  type: "expense" },
  { id: "20", date: "2025-03-09", description: "Freelance Project C",    category: "Freelance",      amount: 15000, type: "income"  },
  { id: "21", date: "2025-03-13", description: "Pharmacy",               category: "Healthcare",     amount: 1200,  type: "expense" },
  { id: "22", date: "2025-03-17", description: "Clothes Shopping",       category: "Shopping",       amount: 4200,  type: "expense" },
  { id: "23", date: "2025-03-21", description: "Ride to Airport",        category: "Transport",      amount: 1800,  type: "expense" },
  { id: "24", date: "2025-03-25", description: "Concert Tickets",        category: "Entertainment",  amount: 2500,  type: "expense" },
  { id: "25", date: "2025-03-28", description: "Electricity Bill",       category: "Utilities",      amount: 1600,  type: "expense" },
  { id: "26", date: "2025-03-30", description: "Bonus Payment",          category: "Salary",        amount: 10000, type: "income"  },
]