# FinTrack — Finance Dashboard

A clean, interactive finance dashboard built with Next.js 16, Tailwind CSS, shadcn/ui, Zustand, and Recharts.

## Setup
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- **Dashboard** — Summary cards (Balance, Income, Expenses), Area chart (monthly trend), Donut chart (spending by category)
- **Transactions** — Full table with search, filter by type/category, sort by date/amount, add/edit/delete (Admin only)
- **Insights** — Top spending category, month-over-month comparison, avg daily spend, best saving month, grouped bar chart
- **Role-Based UI** — Switch between Admin (full access) and Viewer (read only) via header toggle
- **State Management** — Zustand with localStorage persistence
- **Dark Mode** — Dark theme by default

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI Components |
| Zustand | State Management |
| Recharts | Charts |
| Lucide React | Icons |

## Role Switching

Use the **Admin / Viewer** toggle in the top-right header:
- **Admin** — Can add, edit, and delete transactions
- **Viewer** — Read-only access, no mutation controls shown

## Project Structure
```
src/
├── app/dashboard/        # Pages (Dashboard, Transactions, Insights)
├── components/
│   ├── layout/           # Sidebar, Header
│   ├── dashboard/        # Summary cards, charts
│   ├── transactions/     # Filter bar, table, modal
│   └── insights/         # Insight cards, comparison chart
├── store/                # Zustand store
├── data/                 # Mock transactions
└── types/                # TypeScript types
```