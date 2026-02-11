import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeader } from "@/components/blocks/page-header"
import { CalendarLayout } from "@/components/layouts/calendar-layout"
import { CalendarSidebar } from "@/components/blocks/calendar-sidebar"
import { CalendarMonthView } from "@/components/blocks/calendar-month-view"
import { CalendarDayDetails } from "@/components/blocks/calendar-day-details"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Calendar, Settings } from "lucide-react"
import { addDays, startOfMonth } from "date-fns"

// Sample data
const sampleAccounts = [
  {
    id: "1",
    name: "Personal",
    email: "praveen.nalakurthi@gmail.com",
    color: "#3b82f6",
    enabled: true,
  },
  {
    id: "2",
    name: "Work",
    email: "graphichatdesigns@gmail.com",
    color: "#10b981",
    enabled: true,
  },
  {
    id: "3",
    name: "Family",
    email: "",
    color: "#ef4444",
    enabled: true,
  },
  {
    id: "4",
    name: "Holidays in India",
    email: "",
    color: "#f59e0b",
    enabled: false,
  },
]

const today = new Date()

const sampleEvents = [
  {
    id: "1",
    title: "Team Standup",
    date: today,
    startTime: "9:00 AM",
    endTime: "9:30 AM",
    color: "green" as const,
    videoCall: true,
    attendees: 8,
    description: "Daily team sync to discuss progress and blockers",
  },
  {
    id: "2",
    title: "Design Review",
    date: today,
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    color: "blue" as const,
    location: "Conference Room A",
    attendees: 5,
    description: "Review new dashboard designs and gather feedback",
  },
  {
    id: "3",
    title: "Lunch Break",
    date: today,
    startTime: "1:00 PM",
    endTime: "2:00 PM",
    color: "orange" as const,
    allDay: false,
  },
  {
    id: "4",
    title: "Client Meeting",
    date: today,
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    color: "purple" as const,
    videoCall: true,
    attendees: 3,
    description: "Quarterly business review with IQLine client",
  },
  {
    id: "5",
    title: "Harsha Bujji's Birthday",
    date: addDays(startOfMonth(today), 10),
    color: "red" as const,
    allDay: true,
  },
  {
    id: "6",
    title: "Maharishi Dayanand Saraswati Jayanti",
    date: addDays(startOfMonth(today), 10),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "7",
    title: "Maha Shivaratri",
    date: addDays(startOfMonth(today), 14),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "8",
    title: "Shivaji Jayanti",
    date: addDays(startOfMonth(today), 18),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "9",
    title: "Ramadan Start (tentative)",
    date: addDays(startOfMonth(today), 18),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "10",
    title: "Holika Dahana",
    date: addDays(today, 2),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "11",
    title: "Holi",
    date: addDays(today, 3),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "12",
    title: "Happy Birthday!",
    date: addDays(startOfMonth(today), 12),
    color: "orange" as const,
    allDay: true,
  },
  {
    id: "13",
    title: "Gudi Padwa",
    date: addDays(startOfMonth(today), 17),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "14",
    title: "Ugadi",
    date: addDays(startOfMonth(today), 17),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "15",
    title: "Jamat Ul-Vida",
    date: addDays(startOfMonth(today), 19),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "16",
    title: "Ramzan Id (tentative)",
    date: addDays(startOfMonth(today), 20),
    color: "green" as const,
    allDay: true,
  },
  {
    id: "17",
    title: "Divya BOSCH's birthday",
    date: addDays(startOfMonth(today), 15),
    color: "red" as const,
    allDay: true,
  },
]

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date())
  const [accounts, setAccounts] = React.useState(sampleAccounts)
  const [viewMode, setViewMode] = React.useState<"month" | "week" | "day">("month")

  const handleAccountToggle = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId
          ? { ...account, enabled: !account.enabled }
          : account
      )
    )
  }

  const handleEventClick = (event: any) => {
    console.log("Event clicked:", event)
    // Handle event click (e.g., open event detail dialog)
  }

  const handleCreateEvent = () => {
    console.log("Create event")
    // Handle create event (e.g., open event creation dialog)
  }

  return (
    <PageShell>
      <PageHeader
        title="Calendar"
        actions={
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {viewMode === "month" && "Month"}
                  {viewMode === "week" && "Week"}
                  {viewMode === "day" && "Day"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setViewMode("day")}>
                  Day
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("week")}>
                  Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("month")}>
                  Month
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              Today
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-hidden">
        <CalendarLayout
          sidebar={
            <CalendarSidebar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              accounts={accounts}
              onAccountToggle={handleAccountToggle}
            />
          }
          calendar={
            <CalendarMonthView
              selectedDate={selectedDate}
              events={sampleEvents}
              onDateSelect={setSelectedDate}
              onMonthChange={setCurrentMonth}
            />
          }
          details={
            <CalendarDayDetails
              selectedDate={selectedDate}
              events={sampleEvents}
              onEventClick={handleEventClick}
              onCreateEvent={handleCreateEvent}
            />
          }
        />
      </div>
    </PageShell>
  )
}
