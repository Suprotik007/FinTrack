"use client"

import type { Metadata } from "next"
import { Syne, DM_Sans, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

import { useState } from "react"
import { Menu } from "lucide-react"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en" className={cn("dark", geist.variable)}>
      <body className={`${syne.variable} ${dmSans.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background">
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div className={`fixed top-0 left-0 h-screen z-40 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
            <Sidebar />
          </div>

          <div className="lg:ml-60">
            <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Menu size={20} />
              </button>
              <span className="font-display font-semibold text-foreground">FinTrack</span>
            </div>
            <Header />
            <main className="p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}