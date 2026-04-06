import Header from "../components/layout/Header"
import Sidebar from "../components/layout/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

   
      <div className="ml-60">
        <Header />
        <main className="p-6">
          {children}
          
        </main>
      </div>
    </div>
  )
}