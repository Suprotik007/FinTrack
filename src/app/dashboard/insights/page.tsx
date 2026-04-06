import InsightCards from "./InsightCards";
import MonthlyComparisonChart from "./MonthlyComparisonChart";



export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <InsightCards/>
     <MonthlyComparisonChart/>
    </div>
  )
}