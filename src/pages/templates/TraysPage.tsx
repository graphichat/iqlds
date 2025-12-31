import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus, Filter, X } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { TrayCard, type Tray, type Well, type WellStatus } from "@/components/tray-card"

// Sample Data
const generateTrays = (): Tray[] => {
  const trays: Tray[] = []
  
  // MLG_TRAY_1 - 5 columns (A-E), 10 rows
  const tray1Wells: Well[] = []
  for (let row = 1; row <= 10; row++) {
    for (const col of ["A", "B", "C", "D", "E"]) {
      let status: WellStatus = "empty"
      if (row === 1 && (col === "A" || col === "B")) {
        status = "unassigned"
      }
      tray1Wells.push({
        id: `tray1-${col}${row}`,
        row,
        col,
        status,
        sampleId: status !== "empty" ? `SAMPLE-${col}${row}` : undefined,
      })
    }
  }
  trays.push({
    id: "tray1",
    name: "MLG_TRAY_1",
    columns: ["A", "B", "C", "D", "E"],
    rows: 10,
    wells: tray1Wells,
  })

  // MLG_TRAY_2 - 5 columns (A-E), 10 rows
  const tray2Wells: Well[] = []
  for (let row = 1; row <= 10; row++) {
    for (const col of ["A", "B", "C", "D", "E"]) {
      let status: WellStatus = "empty"
      if (row === 1 && col === "A") {
        status = "unassigned-urgent"
      }
      tray2Wells.push({
        id: `tray2-${col}${row}`,
        row,
        col,
        status,
        sampleId: status !== "empty" ? `SAMPLE-${col}${row}` : undefined,
      })
    }
  }
  trays.push({
    id: "tray2",
    name: "MLG_TRAY_2",
    columns: ["A", "B", "C", "D", "E"],
    rows: 10,
    wells: tray2Wells,
  })

  // MLG_TRAY_4 - 5 columns (A-E), 10 rows
  const tray4Wells: Well[] = []
  for (let row = 1; row <= 10; row++) {
    for (const col of ["A", "B", "C", "D", "E"]) {
      let status: WellStatus = "empty"
      if (row === 1 && col === "A") {
        status = "unassigned"
      }
      tray4Wells.push({
        id: `tray4-${col}${row}`,
        row,
        col,
        status,
        sampleId: status !== "empty" ? `SAMPLE-${col}${row}` : undefined,
      })
    }
  }
  trays.push({
    id: "tray4",
    name: "MLG_TRAY_4",
    columns: ["A", "B", "C", "D", "E"],
    rows: 10,
    wells: tray4Wells,
  })

  // MLG_TRAY_5 - 4 columns (A-D), 12 rows
  const tray5Wells: Well[] = []
  for (let row = 1; row <= 12; row++) {
    for (const col of ["A", "B", "C", "D"]) {
      tray5Wells.push({
        id: `tray5-${col}${row}`,
        row,
        col,
        status: "empty",
      })
    }
  }
  trays.push({
    id: "tray5",
    name: "MLG_TRAY_5",
    columns: ["A", "B", "C", "D"],
    rows: 12,
    wells: tray5Wells,
  })

  return trays
}


function StatusIndicator({ color, label, count }: { color: "red" | "green" | "blue"; label: string; count: number }) {
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50">
      <div className={`size-2.5 rounded-full ${colorClasses[color]}`} />
      <span className="text-sm text-muted-foreground">
        {label}
      </span>
      <Badge variant="secondary" className="ml-1 text-xs font-semibold">
        {count}
      </Badge>
    </div>
  )
}

function FilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <Badge variant="secondary" className="gap-1.5 pr-1">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  )
}

export function TraysPage() {
  const [trays] = React.useState<Tray[]>(generateTrays())
  const [selectedWells, setSelectedWells] = React.useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = React.useState(false)
  
  const [filters, setFilters] = React.useState({
    sampleType: "",
    test: "",
    status: "",
    source: "",
    destination: "",
  })

  const activeFilters = React.useMemo(() => {
    const active: Array<{ key: string; label: string }> = []
    if (filters.sampleType) active.push({ key: "sampleType", label: `Type: ${filters.sampleType}` })
    if (filters.test) active.push({ key: "test", label: `Test: ${filters.test}` })
    if (filters.status) active.push({ key: "status", label: `Status: ${filters.status}` })
    if (filters.source) active.push({ key: "source", label: `Source: ${filters.source}` })
    if (filters.destination) active.push({ key: "destination", label: `Destination: ${filters.destination}` })
    return active
  }, [filters])

  // Calculate status counts
  const statusCounts = React.useMemo(() => {
    const counts = {
      total: 0,
      requestSent: 0,
      requestedUrgent: 0,
      unassigned: 0,
      unassignedUrgent: 0,
    }

    trays.forEach((tray) => {
      tray.wells.forEach((well) => {
        if (well.status !== "empty") {
          counts.total++
          switch (well.status) {
            case "request-sent":
              counts.requestSent++
              break
            case "unassigned":
              counts.unassigned++
              break
            case "unassigned-urgent":
              counts.unassignedUrgent++
              counts.requestedUrgent++
              break
          }
        }
      })
    })

    return counts
  }, [trays])

  const handleWellSelect = (wellId: string) => {
    setSelectedWells((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(wellId)) {
        newSet.delete(wellId)
      } else {
        newSet.add(wellId)
      }
      return newSet
    })
  }

  // Sync selectAll state with selectedWells
  React.useEffect(() => {
    const allNonEmptyWells = new Set<string>()
    trays.forEach((tray) => {
      tray.wells.forEach((well) => {
        if (well.status !== "empty") {
          allNonEmptyWells.add(well.id)
        }
      })
    })
    const allSelected = allNonEmptyWells.size > 0 && 
      selectedWells.size === allNonEmptyWells.size &&
      Array.from(selectedWells).every(id => allNonEmptyWells.has(id))
    setSelectAll(allSelected)
  }, [selectedWells, trays])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allWellIds = new Set<string>()
      trays.forEach((tray) => {
        tray.wells.forEach((well) => {
          if (well.status !== "empty") {
            allWellIds.add(well.id)
          }
        })
      })
      setSelectedWells(allWellIds)
    } else {
      setSelectedWells(new Set())
    }
  }

  const handleApplyFilters = () => {
    // Filter logic would go here
    console.log("Applying filters:", filters)
  }

  const handleClearFilters = () => {
    setFilters({
      sampleType: "",
      test: "",
      status: "",
      source: "",
      destination: "",
    })
  }

  const removeFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }))
  }

  return (
    <PageShell>
      <PageHeaderWithBack
        title="Trays Management"
        backButton={{
          href: "/",
        }}
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter strokeWidth={ICON_STROKE_WIDTH} className="mr-2 h-4 w-4" />
                  Actions
                  <ChevronDown strokeWidth={ICON_STROKE_WIDTH} className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Export Data</DropdownMenuItem>
                <DropdownMenuItem>Print Report</DropdownMenuItem>
                <DropdownMenuItem>Bulk Update</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Plus strokeWidth={ICON_STROKE_WIDTH} className="mr-2 h-4 w-4" />
            Transfer Samples
          </Button>
        </>
      }
      />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4">
          <div className="space-y-6">
        {/* Filters Section */}
        <Card>
          <CardContent className="space-y-4 pt-4">
            {/* Filter Inputs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="sample-type" className="text-sm">Sample Type</Label>
                <Input
                  id="sample-type"
                  placeholder="Enter Name"
                  value={filters.sampleType}
                  onChange={(e) => setFilters({ ...filters, sampleType: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="test" className="text-sm">Test</Label>
                <Input
                  id="test"
                  placeholder="Test Name"
                  value={filters.test}
                  onChange={(e) => setFilters({ ...filters, test: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm">Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="unassigned-urgent">Unassigned Urgent</SelectItem>
                    <SelectItem value="request-sent">Request Sent</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source" className="text-sm">Source</Label>
                <Select value={filters.source} onValueChange={(value) => setFilters({ ...filters, source: value })}>
                  <SelectTrigger id="source" className="w-full">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab1">Lab 1</SelectItem>
                    <SelectItem value="lab2">Lab 2</SelectItem>
                    <SelectItem value="lab3">Lab 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm">Destination</Label>
                <Select value={filters.destination} onValueChange={(value) => setFilters({ ...filters, destination: value })}>
                  <SelectTrigger id="destination" className="w-full">
                    <SelectValue placeholder="Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab1">Lab 1</SelectItem>
                    <SelectItem value="lab2">Lab 2</SelectItem>
                    <SelectItem value="lab3">Lab 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters and Clear All - Single Line */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 py-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {activeFilters.map((filter) => (
                    <FilterBadge
                      key={filter.key}
                      label={filter.label}
                      onRemove={() => removeFilter(filter.key)}
                    />
                  ))}
                </div>
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={handleApplyFilters} size="sm">Apply</Button>
                <Button variant="outline" onClick={handleClearFilters} size="sm">
                  Clear
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm cursor-pointer">
                  Select All
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <StatusIndicator color="red" label="Total Samples in Trays" count={statusCounts.total} />
          <StatusIndicator color="green" label="Request Sent" count={statusCounts.requestSent} />
          <StatusIndicator color="red" label="Requested & Urgent" count={statusCounts.requestedUrgent} />
          <StatusIndicator color="blue" label="Unassigned" count={statusCounts.unassigned} />
          <StatusIndicator color="red" label="Unassigned Urgent" count={statusCounts.unassignedUrgent} />
        </div>

        {/* Trays Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trays.map((tray) => (
            <TrayCard
              key={tray.id}
              tray={tray}
              selectedWells={selectedWells}
              onWellSelect={handleWellSelect}
            />
          ))}
        </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
