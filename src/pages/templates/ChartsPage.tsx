import * as React from "react"
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Eye, MousePointerClick } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { DefaultPageWithSidebar } from "./DefaultPageWithSidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, BarChart3, File, Settings, TrendingUp as TrendingUpIcon } from "lucide-react"

// Revenue Analytics Data
const revenueData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
]

const monthlyRevenue = [
  { month: "Jan", revenue: 45000, growth: 5.2 },
  { month: "Feb", revenue: 52000, growth: 8.1 },
  { month: "Mar", revenue: 48000, growth: -2.3 },
  { month: "Apr", revenue: 61000, growth: 12.5 },
  { month: "May", revenue: 55000, growth: 8.9 },
  { month: "Jun", revenue: 67000, growth: 15.2 },
]

const trafficSources = [
  { source: "Organic Search", visitors: 45230, percentage: 45 },
  { source: "Direct", visitors: 28450, percentage: 28 },
  { source: "Social Media", visitors: 15680, percentage: 16 },
  { source: "Email", visitors: 8760, percentage: 9 },
  { source: "Referrals", visitors: 2340, percentage: 2 },
]

const userActivity = [
  { hour: "00:00", active: 120, sessions: 85 },
  { hour: "04:00", active: 80, sessions: 60 },
  { hour: "08:00", active: 320, sessions: 240 },
  { hour: "12:00", active: 580, sessions: 420 },
  { hour: "16:00", active: 720, sessions: 550 },
  { hour: "20:00", active: 450, sessions: 340 },
]

const revenueChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const monthlyChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  growth: {
    label: "Growth %",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const trafficChartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const activityChartConfig = {
  active: {
    label: "Active Users",
    color: "var(--chart-1)",
  },
  sessions: {
    label: "Sessions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function RevenueChart() {
  const [timeRange, setTimeRange] = React.useState("30d")

  const filteredData = React.useMemo(() => {
    const daysToSubtract = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    const referenceDate = new Date("2024-04-30")
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    
    return revenueData.filter((item) => {
      const date = new Date(item.date)
      return date >= startDate
    })
  }, [timeRange])

  const totalRevenue = React.useMemo(() => {
    return filteredData.reduce((sum, item) => sum + item.desktop + item.mobile, 0)
  }, [filteredData])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>
            Track revenue performance across desktop and mobile platforms
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={revenueChartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Total Revenue: ${totalRevenue.toLocaleString()} <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "Last 90 days"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function MonthlyRevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue Trend</CardTitle>
        <CardDescription>
          Revenue performance over the last 6 months with growth percentage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={monthlyChartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={monthlyRevenue}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between text-sm">
          <div className="text-muted-foreground">Average monthly growth: +8.0%</div>
          <Badge variant="outline" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            Positive trend
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

function TrafficSourcesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>
          Breakdown of website visitors by source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trafficChartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={trafficSources} layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="grid w-full grid-cols-2 gap-4 text-sm md:grid-cols-5">
          {trafficSources.map((source) => (
            <div key={source.source} className="space-y-1">
              <div className="text-muted-foreground">{source.source}</div>
              <div className="font-semibold">{source.percentage}%</div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

function UserActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity by Hour</CardTitle>
        <CardDescription>
          Peak activity times throughout the day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={activityChartConfig} className="aspect-auto h-[300px] w-full">
          <LineChart data={userActivity}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="active"
              stroke="var(--color-active)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="var(--color-sessions)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between text-sm">
          <div className="text-muted-foreground">Peak activity: 4:00 PM - 720 active users</div>
          <Badge variant="outline">Real-time data</Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  description 
}: { 
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
  description?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span>{change}</span>
          <span>from last month</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function ChartsPage() {
  return (
    <DefaultPageWithSidebar
      pageTitle="Analytics Dashboard"
      pageDescription="Comprehensive analytics and performance metrics"
      pageTag="Live"
      pageActions={
        <>
          <Button variant="outline">Export Report</Button>
          <Button>Schedule Report</Button>
        </>
      }
      pageTabs={[
        { value: "overview", label: "Overview" },
        { value: "revenue", label: "Revenue" },
        { value: "traffic", label: "Traffic" },
        { value: "users", label: "Users" },
      ]}
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$328,000"
            change="+12.5%"
            trend="up"
            icon={DollarSign}
            description="Last 30 days"
          />
          <MetricCard
            title="Active Users"
            value="8,234"
            change="+8.2%"
            trend="up"
            icon={Users}
            description="Currently online"
          />
          <MetricCard
            title="Page Views"
            value="124,580"
            change="+15.3%"
            trend="up"
            icon={Eye}
            description="Total views this month"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change="+0.8%"
            trend="up"
            icon={MousePointerClick}
            description="Click-through rate"
          />
        </div>

        {/* Main Charts */}
        <RevenueChart />
        
        <div className="grid gap-6 md:grid-cols-2">
          <MonthlyRevenueChart />
          <UserActivityChart />
        </div>

        <TrafficSourcesChart />
      </div>
    </DefaultPageWithSidebar>
  )
}
