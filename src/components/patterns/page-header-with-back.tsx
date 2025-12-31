import { PageHeader } from "@/components/blocks/page-header"
import { BackButton } from "@/components/blocks/back-button"

interface PageHeaderWithBackProps {
  title: string
  actions?: React.ReactNode
  backButton?: {
    label?: string
    href?: string
    onClick?: () => void
  }
  className?: string
}

export function PageHeaderWithBack({ title, actions, backButton, className }: PageHeaderWithBackProps) {
  return (
    <div className={className}>
      <PageHeader
        title={title}
        leading={<BackButton {...backButton} />}
        actions={actions}
      />
    </div>
  )
}

