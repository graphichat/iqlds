import * as React from "react"
import { PageShell } from "@/components/layouts/page-shell"
import { PageHeaderWithBack } from "@/components/patterns/page-header-with-back"
import { PageTabs } from "@/components/blocks/page-tabs"
import { TwoColumnLayout } from "@/components/layouts/two-column-layout"
import { ThreeColumnLayout } from "@/components/layouts/three-column-layout"

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center space-y-2">
        <div className="text-2xl font-semibold text-muted-foreground">{label}</div>
        <div className="text-sm text-muted-foreground/70">This is the {label.toLowerCase()}</div>
      </div>
    </div>
  )
}

function NestedShellExample() {
  return (
    <TwoColumnLayout
      left={<SectionLabel label="Sidebar Area" />}
      right={<SectionLabel label="Content Area" />}
      resizable={false}
      leftWidth="280px"
      rightWidth="auto"
      leftHeader={<div className="text-sm font-medium">Sidebar Header</div>}
      leftFooter={<div className="text-sm font-medium">Sidebar Footer</div>}
      scrollable={false}
      noPadding={true}
      showSeparator={false}
      leftClassName="bg-muted/50"
    />
  )
}

function SplitLayoutExample() {
  return (
    <TwoColumnLayout
      left={<SectionLabel label="Left Area" />}
      right={<SectionLabel label="Right Area" />}
      resizable={false}
      leftWidth="70%"
      rightWidth="30%"
      scrollable={false}
    />
  )
}

function PageWithPropertiesExample() {
  return (
    <TwoColumnLayout
      left={<SectionLabel label="Content Area" />}
      right={<SectionLabel label="Properties Area" />}
      resizable={false}
      leftWidth="auto"
      rightWidth="320px"
      scrollable={false}
      leftClassName="flex-1"
      rightClassName="border-l"
    />
  )
}

function TwoColumnLayoutExample() {
  return (
    <TwoColumnLayout
      left={<SectionLabel label="Left Section" />}
      right={<SectionLabel label="Right Section" />}
      resizable={true}
      defaultLeftWidth={50}
      defaultRightWidth={50}
      minLeftWidth={20}
      minRightWidth={20}
    />
  )
}

function ThreeColumnLayoutExample() {
  return (
    <ThreeColumnLayout
      left={<SectionLabel label="Left Section" />}
      content={<SectionLabel label="Content Area" />}
      right={<SectionLabel label="Properties Section" />}
      defaultLeftWidth={20}
      defaultContentWidth={60}
      defaultRightWidth={20}
      minLeftWidth={15}
      minContentWidth={30}
      minRightWidth={15}
    />
  )
}

export function LayoutsPage() {
  const [activeTab, setActiveTab] = React.useState("nested-shell")

  const tabs = [
    { value: "nested-shell", label: "Nested Shell" },
    { value: "two-column", label: "Two Column" },
    { value: "two-column-fixed", label: "Two Column (Fixed)" },
    { value: "two-column-properties", label: "Content + Properties" },
    { value: "three-column", label: "Three Column" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "nested-shell":
        return <NestedShellExample />
      case "two-column":
        return <TwoColumnLayoutExample />
      case "two-column-fixed":
        return <SplitLayoutExample />
      case "two-column-properties":
        return <PageWithPropertiesExample />
      case "three-column":
        return <ThreeColumnLayoutExample />
      default:
        return <NestedShellExample />
    }
  }

  return (
    <PageShell>
      <PageHeaderWithBack
        title="Layout Examples"
        backButton={{
          href: "/",
        }}
        noBorder
      />
      <PageTabs
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
        defaultValue="nested-shell"
      />
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </PageShell>
  )
}

