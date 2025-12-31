import * as React from "react"

interface NestedShellProps {
  sidebar: React.ReactNode
  content: React.ReactNode
  sidebarWidth?: string
  sidebarHeader?: React.ReactNode
  sidebarFooter?: React.ReactNode
}

export function NestedShell({
  sidebar,
  content,
  sidebarWidth = "256px",
  sidebarHeader,
  sidebarFooter,
}: NestedShellProps) {
  return (
    <div className="flex h-full">
      <aside
        className="flex flex-col border-r bg-muted/50"
        style={{ width: sidebarWidth }}
      >
        {sidebarHeader && (
          <div className="border-b bg-background p-4">{sidebarHeader}</div>
        )}
        <div className="flex-1 overflow-auto">{sidebar}</div>
        {sidebarFooter && (
          <div className="border-t bg-background p-4">{sidebarFooter}</div>
        )}
      </aside>
      <main className="flex-1 overflow-auto bg-background">{content}</main>
    </div>
  )
}

