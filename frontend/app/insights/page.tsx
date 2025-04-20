"use client"

import { useEffect } from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useStudentStore } from "@/store/student-store"

// Define colors for each admission status
const statusColors: Record<string, string> = {
  Submitted: "var(--color-chart-1)",
  Scheduled: "var(--color-chart-2)",
  Approved: "var(--color-chart-3)",
  Attended: "var(--color-chart-4)",
  Rescheduled: "var(--color-chart-5)",
  Pending: "var(--color-chart-6)",
  ContractSent: "var(--color-chart-7)",
  Enrolled: "var(--color-chart-8)",
  PackageSent: "var(--color-chart-9)",
  Void: "var(--color-chart-10)",
  Rejected: "var(--color-chart-11)",
}

// Create chart config from status colors
const chartConfig = Object.entries(statusColors).reduce((acc, [status, color]) => {
  acc[status] = {
    label: status,
    color: color,
  };
  return acc;
}, {} as ChartConfig);

export default function InsightsPage() {
  const { statusCounts, fetchStatusCounts, isLoading } = useStudentStore();

  // Fetch status counts on component mount
  useEffect(() => {
    fetchStatusCounts();
  }, [fetchStatusCounts]);

  // Calculate total students
  const totalStudents = statusCounts.reduce((sum, item) => sum + item.count, 0);

  // Transform status counts to chart data format with percentages
  const chartData = statusCounts.map(item => {
    // Get the status key in the correct case format
    const statusKey = Object.keys(statusColors).find(
      key => key.toLowerCase() === item.status.toLowerCase()
    ) || item.status;

    // Calculate percentage
    const percentage = totalStudents > 0 ? Math.round((item.count / totalStudents) * 100) : 0;

    return {
      status: item.status,
      percentage: percentage,
      fill: statusColors[statusKey] || "var(--color-chart-1)",
    };
  });

  // Custom label renderer to show percentages
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Admission Status Distribution</CardTitle>
        <CardDescription>Current student admission status breakdown</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="flex justify-center items-center h-[250px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="percentage"
                nameKey="status"
                label={renderCustomizedLabel}
                labelLine={false}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Students: {totalStudents} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing percentage distribution of admission statuses
        </div>
      </CardFooter>
    </Card>
  )
}
