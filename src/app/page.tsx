
import BalanceTrendChart from "@/src/components/layout/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "@/src/components/layout/dashboard/SpendingBreakdownChart";
import SummaryCards from "@/src/components/layout/dashboard/SummaryCards";


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
       <BalanceTrendChart />
       <SpendingBreakdownChart />
      </div>
    </div>
  )
}