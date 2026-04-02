import type { Metadata } from "next"
import { Syne, DM_Sans } from "next/font/google"
import "./globals.css"
import Header from "../components/layout/Header"
import Sidebar from "../components/layout/Sidebar"

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

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Track and understand your financial activity",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        <Header />
        
        <Sidebar></Sidebar>
      </body>
    </html>
  )
}