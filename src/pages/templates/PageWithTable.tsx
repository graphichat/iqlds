import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { DefaultPageWithSidebar } from "./DefaultPageWithSidebar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Search, Download, Filter } from "lucide-react"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import { Home, BarChart3, File, Settings } from "lucide-react"

// Customer Management Data Type
export type Customer = {
  id: string
  name: string
  email: string
  company: string
  status: "active" | "inactive" | "pending"
  role: "Admin" | "User" | "Viewer"
  lastActive: string
  createdAt: string
  revenue: number
}

const customersData: Customer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Inc.",
    status: "active",
    role: "Admin",
    lastActive: "2024-04-30",
    createdAt: "2024-01-15",
    revenue: 125000,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@startupxyz.com",
    company: "StartupXYZ",
    status: "active",
    role: "User",
    lastActive: "2024-04-29",
    createdAt: "2024-02-20",
    revenue: 89000,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@designstudio.com",
    company: "DesignStudio",
    status: "active",
    role: "User",
    lastActive: "2024-04-28",
    createdAt: "2024-03-10",
    revenue: 156000,
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@enterprise.com",
    company: "Enterprise Solutions",
    status: "pending",
    role: "Viewer",
    lastActive: "2024-04-25",
    createdAt: "2024-04-15",
    revenue: 0,
  },
  {
    id: "5",
    name: "Lisa Wong",
    email: "lisa.wong@innovate.com",
    company: "Innovate Labs",
    status: "active",
    role: "Admin",
    lastActive: "2024-04-30",
    createdAt: "2024-01-05",
    revenue: 234000,
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james@globaltech.com",
    company: "GlobalTech",
    status: "inactive",
    role: "User",
    lastActive: "2024-04-15",
    createdAt: "2023-12-01",
    revenue: 67000,
  },
  {
    id: "7",
    name: "Maria Garcia",
    email: "maria.garcia@cloudsoft.com",
    company: "CloudSoft",
    status: "active",
    role: "User",
    lastActive: "2024-04-29",
    createdAt: "2024-02-28",
    revenue: 189000,
  },
  {
    id: "8",
    name: "Robert Taylor",
    email: "robert.taylor@datasys.com",
    company: "DataSys",
    status: "active",
    role: "Admin",
    lastActive: "2024-04-30",
    createdAt: "2024-01-20",
    revenue: 312000,
  },
  {
    id: "9",
    name: "Jennifer Brown",
    email: "jennifer@webdev.com",
    company: "WebDev Agency",
    status: "pending",
    role: "Viewer",
    lastActive: "2024-04-20",
    createdAt: "2024-04-10",
    revenue: 0,
  },
  {
    id: "10",
    name: "Thomas Anderson",
    email: "thomas@matrix.com",
    company: "Matrix Solutions",
    status: "active",
    role: "User",
    lastActive: "2024-04-30",
    createdAt: "2024-03-15",
    revenue: 145000,
  },
]

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("company")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = 
        status === "active" ? "default" :
        status === "pending" ? "secondary" :
        "outline"
      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant="outline">
          {role}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2"
          >
            Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastActive"))
      return <div className="text-sm text-muted-foreground">{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.id)}
              className="whitespace-nowrap"
            >
              Copy customer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="whitespace-nowrap">View customer</DropdownMenuItem>
            <DropdownMenuItem className="whitespace-nowrap">Edit customer</DropdownMenuItem>
            <DropdownMenuItem className="whitespace-nowrap">View orders</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive whitespace-nowrap">
              Delete customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PageWithTableExample() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [statusFilter, setStatusFilter] = React.useState<string[]>([])
  const [roleFilter, setRoleFilter] = React.useState<string[]>([])

  const table = useReactTable({
    data: customersData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    if (statusFilter.length > 0) {
      table.getColumn("status")?.setFilterValue(statusFilter)
    } else {
      table.getColumn("status")?.setFilterValue(undefined)
    }
  }, [statusFilter, table])

  React.useEffect(() => {
    if (roleFilter.length > 0) {
      table.getColumn("role")?.setFilterValue(roleFilter)
    } else {
      table.getColumn("role")?.setFilterValue(undefined)
    }
  }, [roleFilter, table])

  return (
    <DefaultPageWithSidebar
      pageTitle="Customer Management"
      pageDescription="Manage your customers, their accounts, and revenue"
      pageActions={
        <>
          <Button variant="outline">
            <Download strokeWidth={ICON_STROKE_WIDTH} className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus strokeWidth={ICON_STROKE_WIDTH} className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </>
      }
      pageTabs={[
        { value: "all", label: "All Customers" },
        { value: "active", label: "Active" },
        { value: "pending", label: "Pending" },
      ]}
    >
      <div className="space-y-4">
        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search
                strokeWidth={ICON_STROKE_WIDTH}
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                placeholder="Search customers..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="pl-9"
              />
            </div>
            <Select
              value={statusFilter.length === 0 ? "all" : statusFilter[0]}
              onValueChange={(value) => {
                if (value === "all") {
                  setStatusFilter([])
                } else {
                  setStatusFilter([value])
                }
              }}
            >
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={roleFilter.length === 0 ? "all" : roleFilter[0]}
              onValueChange={(value) => {
                if (value === "all") {
                  setRoleFilter([])
                } else {
                  setRoleFilter([value])
                }
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination and Selection Info */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span>Rows per page</span>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageWithSidebar>
  )
}

// Keep the original PageWithTable component for backward compatibility
export function PageWithTable<T extends Record<string, any>>({
  title = "Data Table",
  description,
  data,
  columns,
  onAdd,
  onSearch,
  searchPlaceholder = "Search...",
  emptyMessage = "No data available",
  isLoading = false,
  filters,
  enableSelection = true,
  rowKey,
  onSelectionChange,
}: {
  title?: string
  description?: string
  data: T[]
  columns: Array<{
    key: keyof T | string
    header: string
    render?: (value: any, row: T) => React.ReactNode
  }>
  onAdd?: () => void
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  emptyMessage?: string
  isLoading?: boolean
  filters?: React.ReactNode
  enableSelection?: boolean
  rowKey?: (row: T, index: number) => string | number
  onSelectionChange?: (selectedRows: T[]) => void
}) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(new Set())

  const getRowKey = React.useCallback((row: T, index: number): string | number => {
    if (rowKey) {
      return rowKey(row, index)
    }
    return (row as any).id ?? index
  }, [rowKey])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      const allKeys = data.map((row, index) => getRowKey(row, index))
      setSelectedRows(new Set(allKeys))
      if (onSelectionChange) {
        onSelectionChange(data)
      }
    } else {
      setSelectedRows(new Set())
      if (onSelectionChange) {
        onSelectionChange([])
      }
    }
  }

  const handleRowSelect = (row: T, index: number, checked: boolean) => {
    const key = getRowKey(row, index)
    const newSelected = new Set(selectedRows)
    
    if (checked) {
      newSelected.add(key)
    } else {
      newSelected.delete(key)
    }
    
    setSelectedRows(newSelected)
    
    if (onSelectionChange) {
      const selectedData = data.filter((r, i) => newSelected.has(getRowKey(r, i)))
      onSelectionChange(selectedData)
    }
  }

  const allSelected = data.length > 0 && selectedRows.size === data.length
  const someSelected = selectedRows.size > 0 && selectedRows.size < data.length

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{title}</h2>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            {onAdd && (
              <Button onClick={onAdd}>
                <Plus strokeWidth={ICON_STROKE_WIDTH} className="mr-2 size-4" />
                Add New
              </Button>
            )}
          </div>
          {((onSearch || searchQuery) || filters) && (
            <div className="mb-4 flex items-center gap-2">
              {(onSearch || searchQuery) && (
                <div className="relative w-60">
                  <Search
                    strokeWidth={ICON_STROKE_WIDTH}
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <Input
                    type="search"
                    placeholder={searchPlaceholder}
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              )}
              {filters && (
                <div className="flex items-center gap-2">
                  {filters}
                </div>
              )}
            </div>
          )}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {enableSelection && (
                    <TableHead className="w-12">
                      <Checkbox
                        checked={allSelected ? true : someSelected ? "indeterminate" : false}
                        onCheckedChange={(checked) => handleSelectAll(checked === true)}
                        aria-label="Select all"
                      />
                    </TableHead>
                  )}
                  {columns.map((column) => (
                    <TableHead key={String(column.key)}>
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={enableSelection ? columns.length + 1 : columns.length}
                      className="h-24 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={enableSelection ? columns.length + 1 : columns.length}
                      className="h-24 text-center"
                    >
                      {emptyMessage}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, rowIndex) => {
                    const rowKeyValue = getRowKey(row, rowIndex)
                    const isSelected = selectedRows.has(rowKeyValue)
                    
                    return (
                      <TableRow key={rowKeyValue} data-state={isSelected ? "selected" : undefined}>
                        {enableSelection && (
                          <TableCell>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleRowSelect(row, rowIndex, checked === true)}
                              aria-label={`Select row ${rowIndex + 1}`}
                            />
                          </TableCell>
                        )}
                        {columns.map((column) => {
                          const value = row[column.key as keyof T]
                          return (
                            <TableCell key={String(column.key)}>
                              {column.render
                                ? column.render(value, row)
                                : String(value ?? "")}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
