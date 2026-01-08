# PDF Builder

A composable, type-safe PDF generation system for creating reports, certificates, invoices, and other printable documents. Built with React components and designed to integrate seamlessly with the design system.

## Installation

```bash
npx shadcn@latest add pdf-builder --registry https://iqlds.iqline.com/r
```

Or add manually:

```bash
npm install @react-pdf/renderer
```

Then copy the component files to your project.

## Overview

The PDF Builder follows a **composition-first** architecture, allowing you to build complex documents using simple, reusable primitives. It mirrors the shadcn pattern of providing unstyled primitives that you can customize.

### Architecture Principles

1. **Primitives over configuration** - Small building blocks compose into complex layouts
2. **Design system integration** - Uses the same tokens (colors, typography, spacing) as the web UI
3. **Type-safe templates** - Full TypeScript support with strict data schemas
4. **Separation of concerns** - Templates define structure, data defines content

---

## Components

### Core Primitives

| Component | Description |
|-----------|-------------|
| `PDFDocument` | Root wrapper for all PDF content |
| `PDFPage` | Individual page with size and orientation settings |
| `PDFView` | Flexbox container (equivalent to `<div>`) |
| `PDFText` | Text rendering with typography support |
| `PDFImage` | Image embedding with aspect ratio control |
| `PDFLink` | Hyperlinks within PDFs |

### Layout Components

| Component | Description |
|-----------|-------------|
| `PDFHeader` | Page header with logo and title support |
| `PDFFooter` | Page footer with pagination and metadata |
| `PDFSection` | Semantic section with heading and content |
| `PDFGrid` | Grid layout for multi-column content |
| `PDFTable` | Tabular data with headers and styling |
| `PDFSpacer` | Vertical or horizontal spacing |
| `PDFDivider` | Horizontal rule separator |

### Template Components

| Component | Description |
|-----------|-------------|
| `ReportTemplate` | Multi-page report with ToC and sections |
| `CertificateTemplate` | Single-page certificate with decorative elements |
| `InvoiceTemplate` | Invoice/receipt with line items and totals |
| `LetterTemplate` | Business letter format |

---

## File Structure

```
src/
├─ components/
│  ├─ pdf/                    # PDF-specific components
│  │  ├─ primitives/          # Core building blocks
│  │  │  ├─ pdf-document.tsx
│  │  │  ├─ pdf-page.tsx
│  │  │  ├─ pdf-view.tsx
│  │  │  ├─ pdf-text.tsx
│  │  │  ├─ pdf-image.tsx
│  │  │  └─ index.ts
│  │  │
│  │  ├─ layouts/             # Layout components
│  │  │  ├─ pdf-header.tsx
│  │  │  ├─ pdf-footer.tsx
│  │  │  ├─ pdf-section.tsx
│  │  │  ├─ pdf-grid.tsx
│  │  │  ├─ pdf-table.tsx
│  │  │  └─ index.ts
│  │  │
│  │  ├─ templates/           # Pre-built templates
│  │  │  ├─ report-template.tsx
│  │  │  ├─ certificate-template.tsx
│  │  │  ├─ invoice-template.tsx
│  │  │  └─ index.ts
│  │  │
│  │  └─ index.ts             # Main exports
│  │
├─ lib/
│  ├─ pdf/
│  │  ├─ styles.ts            # PDF design tokens
│  │  ├─ fonts.ts             # Font registration
│  │  ├─ utils.ts             # PDF utilities
│  │  └─ types.ts             # TypeScript definitions
```

---

## Usage

### Basic Example

```tsx
import {
  PDFDocument,
  PDFPage,
  PDFView,
  PDFText,
} from "@/components/pdf"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"

// Define your PDF content
function MyReport({ data }: { data: ReportData }) {
  return (
    <PDFDocument>
      <PDFPage size="A4">
        <PDFView style={styles.container}>
          <PDFText style={styles.title}>{data.title}</PDFText>
          <PDFText style={styles.body}>{data.content}</PDFText>
        </PDFView>
      </PDFPage>
    </PDFDocument>
  )
}

// Render with download link
export function ReportDownload({ data }: { data: ReportData }) {
  return (
    <PDFDownloadLink
      document={<MyReport data={data} />}
      fileName="report.pdf"
    >
      {({ loading }) => (loading ? "Generating..." : "Download PDF")}
    </PDFDownloadLink>
  )
}

// Or render in a viewer
export function ReportPreview({ data }: { data: ReportData }) {
  return (
    <PDFViewer width="100%" height="600">
      <MyReport data={data} />
    </PDFViewer>
  )
}
```

### Using Templates

```tsx
import { ReportTemplate } from "@/components/pdf/templates"

const reportData = {
  title: "Q4 2024 Performance Report",
  subtitle: "Annual Review",
  author: "Analytics Team",
  date: new Date(),
  logo: "/logo.png",
  sections: [
    {
      title: "Executive Summary",
      content: "Lorem ipsum dolor sit amet...",
    },
    {
      title: "Key Metrics",
      content: "Performance increased by 25%...",
      chart: chartImageBase64,
    },
  ],
  footer: {
    company: "IQLine Inc",
    confidential: true,
  },
}

function QuarterlyReport() {
  return (
    <PDFDownloadLink
      document={<ReportTemplate data={reportData} />}
      fileName={`report-${reportData.title}.pdf`}
    >
      Download Report
    </PDFDownloadLink>
  )
}
```

### Certificate Example

```tsx
import { CertificateTemplate } from "@/components/pdf/templates"

const certificateData = {
  recipientName: "John Doe",
  certificateTitle: "Certificate of Completion",
  courseName: "Advanced React Development",
  completionDate: new Date(),
  issuerName: "IQLine Academy",
  issuerSignature: "/signatures/director.png",
  issuerTitle: "Director of Education",
  certificateId: "CERT-2024-001234",
  logo: "/logo.png",
  decorativeBorder: true,
}

function CourseCertificate() {
  return (
    <PDFDownloadLink
      document={<CertificateTemplate data={certificateData} />}
      fileName={`certificate-${certificateData.recipientName}.pdf`}
    >
      Download Certificate
    </PDFDownloadLink>
  )
}
```

### Invoice Example

```tsx
import { InvoiceTemplate } from "@/components/pdf/templates"

const invoiceData = {
  invoiceNumber: "INV-2024-0042",
  date: new Date(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  company: {
    name: "IQLine Inc",
    address: "123 Tech Street, San Francisco, CA 94102",
    email: "billing@iqline.com",
    logo: "/logo.png",
  },
  client: {
    name: "Acme Corporation",
    address: "456 Business Ave, New York, NY 10001",
    email: "accounts@acme.com",
  },
  items: [
    { description: "Software License", quantity: 5, unitPrice: 199.99 },
    { description: "Premium Support", quantity: 1, unitPrice: 499.99 },
    { description: "Training Session", quantity: 2, unitPrice: 250.00 },
  ],
  tax: 0.0875,
  notes: "Payment due within 30 days.",
}

function Invoice() {
  return (
    <PDFDownloadLink
      document={<InvoiceTemplate data={invoiceData} />}
      fileName={`invoice-${invoiceData.invoiceNumber}.pdf`}
    >
      Download Invoice
    </PDFDownloadLink>
  )
}
```

---

## API Reference

### PDFDocument

Root component for all PDF content.

```tsx
interface PDFDocumentProps {
  /** Document title (metadata) */
  title?: string
  /** Document author (metadata) */
  author?: string
  /** Document subject (metadata) */
  subject?: string
  /** Document keywords (metadata) */
  keywords?: string
  /** Child pages */
  children: React.ReactNode
}
```

### PDFPage

Individual page with configurable size and orientation.

```tsx
interface PDFPageProps {
  /** Page size: "A4" | "LETTER" | "LEGAL" | { width: number, height: number } */
  size?: PageSize
  /** Page orientation */
  orientation?: "portrait" | "landscape"
  /** Page margins using design system spacing */
  margin?: Spacing | { top?: Spacing, right?: Spacing, bottom?: Spacing, left?: Spacing }
  /** Enable page wrapping */
  wrap?: boolean
  /** Page content */
  children: React.ReactNode
}
```

### PDFView

Flexbox container for layout composition.

```tsx
interface PDFViewProps {
  /** Flexbox styles */
  style?: PDFStyle | PDFStyle[]
  /** Debug border for layout development */
  debug?: boolean
  /** Fixed positioning */
  fixed?: boolean
  /** Page break behavior */
  break?: boolean
  /** Allow content wrapping */
  wrap?: boolean
  /** Child elements */
  children?: React.ReactNode
}
```

### PDFText

Text rendering with typography support.

```tsx
interface PDFTextProps {
  /** Text styles */
  style?: PDFStyle | PDFStyle[]
  /** Debug background for development */
  debug?: boolean
  /** Fixed positioning */
  fixed?: boolean
  /** Hyphenation callback */
  hyphenationCallback?: (word: string) => string[]
  /** Text content */
  children?: React.ReactNode
}
```

### PDFImage

Image embedding with aspect ratio control.

```tsx
interface PDFImageProps {
  /** Image source: URL, base64, or buffer */
  src: string | { uri: string } | Buffer
  /** Fixed width in points */
  width?: number
  /** Fixed height in points */
  height?: number
  /** Object fit behavior */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  /** Cache image */
  cache?: boolean
}
```

### PDFTable

Tabular data component.

```tsx
interface PDFTableProps<T> {
  /** Column definitions */
  columns: PDFTableColumn<T>[]
  /** Data rows */
  data: T[]
  /** Show header row */
  showHeader?: boolean
  /** Stripe odd rows */
  striped?: boolean
  /** Table styles */
  style?: PDFStyle
  /** Header row styles */
  headerStyle?: PDFStyle
  /** Body row styles */
  rowStyle?: PDFStyle
  /** Alternating row styles */
  stripeStyle?: PDFStyle
}

interface PDFTableColumn<T> {
  /** Column key from data */
  key: keyof T | string
  /** Column header label */
  header: string
  /** Column width (flex or fixed) */
  width?: number | string
  /** Text alignment */
  align?: "left" | "center" | "right"
  /** Custom cell renderer */
  render?: (value: unknown, row: T) => React.ReactNode
}
```

### PDFHeader

Page header component.

```tsx
interface PDFHeaderProps {
  /** Logo image source */
  logo?: string
  /** Logo width */
  logoWidth?: number
  /** Header title */
  title?: string
  /** Header subtitle */
  subtitle?: string
  /** Right-aligned content */
  rightContent?: React.ReactNode
  /** Show bottom border */
  showBorder?: boolean
  /** Fixed on all pages */
  fixed?: boolean
}
```

### PDFFooter

Page footer with pagination.

```tsx
interface PDFFooterProps {
  /** Left-aligned content */
  leftContent?: React.ReactNode
  /** Center content (pagination by default) */
  centerContent?: React.ReactNode
  /** Right-aligned content */
  rightContent?: React.ReactNode
  /** Show page numbers */
  showPageNumbers?: boolean
  /** Page number format */
  pageNumberFormat?: (pageNumber: number, totalPages: number) => string
  /** Show top border */
  showBorder?: boolean
  /** Fixed on all pages */
  fixed?: boolean
}
```

---

## Design Tokens

The PDF Builder uses a parallel set of design tokens that mirror the web design system.

### Colors

```tsx
// lib/pdf/styles.ts
export const pdfColors = {
  // Semantic colors
  primary: "#0F172A",
  secondary: "#64748B",
  muted: "#94A3B8",
  mutedForeground: "#64748B",
  
  // Background colors
  background: "#FFFFFF",
  foreground: "#0F172A",
  
  // Accent colors
  accent: "#3B82F6",
  accentForeground: "#FFFFFF",
  
  // Status colors
  success: "#22C55E",
  warning: "#F59E0B",
  destructive: "#EF4444",
  
  // Border
  border: "#E2E8F0",
}
```

### Typography

```tsx
export const pdfTypography = {
  // Font families
  fontFamily: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  
  // Font sizes (in points)
  fontSize: {
    xs: 8,
    sm: 10,
    base: 12,
    lg: 14,
    xl: 16,
    "2xl": 20,
    "3xl": 24,
    "4xl": 32,
  },
  
  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}
```

### Spacing

```tsx
export const pdfSpacing = {
  // Spacing scale (in points)
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  
  // Page margins
  pageMargin: {
    sm: { top: 36, right: 36, bottom: 36, left: 36 },
    md: { top: 48, right: 48, bottom: 48, left: 48 },
    lg: { top: 72, right: 72, bottom: 72, left: 72 },
  },
}
```

---

## Template Schemas

### ReportTemplate Schema

```tsx
interface ReportData {
  /** Report title */
  title: string
  /** Report subtitle */
  subtitle?: string
  /** Report author */
  author?: string
  /** Report date */
  date?: Date
  /** Company logo */
  logo?: string
  /** Table of contents */
  showTableOfContents?: boolean
  /** Report sections */
  sections: ReportSection[]
  /** Footer configuration */
  footer?: {
    company?: string
    confidential?: boolean
    showPageNumbers?: boolean
  }
}

interface ReportSection {
  /** Section ID for ToC linking */
  id?: string
  /** Section title */
  title: string
  /** Section content (supports markdown-like formatting) */
  content?: string
  /** Subsections */
  subsections?: ReportSection[]
  /** Charts or images */
  figures?: ReportFigure[]
  /** Data tables */
  tables?: ReportTable[]
}

interface ReportFigure {
  src: string
  caption?: string
  width?: number | string
}

interface ReportTable {
  caption?: string
  columns: { key: string; header: string }[]
  data: Record<string, unknown>[]
}
```

### CertificateTemplate Schema

```tsx
interface CertificateData {
  /** Recipient's full name */
  recipientName: string
  /** Certificate title */
  certificateTitle: string
  /** Description or achievement */
  description?: string
  /** Course or program name */
  courseName?: string
  /** Date of completion */
  completionDate: Date
  /** Expiration date (if applicable) */
  expirationDate?: Date
  /** Issuing organization name */
  issuerName: string
  /** Issuer signature image */
  issuerSignature?: string
  /** Issuer title */
  issuerTitle?: string
  /** Organization logo */
  logo?: string
  /** Unique certificate ID */
  certificateId?: string
  /** QR code for verification */
  verificationQR?: string
  /** Enable decorative border */
  decorativeBorder?: boolean
  /** Background image or pattern */
  background?: string
}
```

### InvoiceTemplate Schema

```tsx
interface InvoiceData {
  /** Invoice number */
  invoiceNumber: string
  /** Invoice date */
  date: Date
  /** Payment due date */
  dueDate: Date
  /** Issuing company */
  company: {
    name: string
    address: string
    phone?: string
    email?: string
    logo?: string
    taxId?: string
  }
  /** Client/customer */
  client: {
    name: string
    address: string
    phone?: string
    email?: string
  }
  /** Line items */
  items: InvoiceItem[]
  /** Tax rate (decimal, e.g., 0.0875 for 8.75%) */
  tax?: number
  /** Discount amount or percentage */
  discount?: number | { type: "fixed" | "percent"; value: number }
  /** Additional notes */
  notes?: string
  /** Payment terms */
  paymentTerms?: string
  /** Bank details for wire transfer */
  bankDetails?: {
    bankName: string
    accountNumber: string
    routingNumber: string
  }
}

interface InvoiceItem {
  /** Item description */
  description: string
  /** Quantity */
  quantity: number
  /** Price per unit */
  unitPrice: number
  /** Tax rate for this item (overrides default) */
  taxRate?: number
}
```

---

## Customization

### Custom Templates

Create custom templates by composing primitives:

```tsx
import {
  PDFDocument,
  PDFPage,
  PDFView,
  PDFText,
  PDFImage,
  PDFHeader,
  PDFFooter,
} from "@/components/pdf"
import { pdfStyles } from "@/lib/pdf/styles"

interface CustomReportProps {
  data: CustomReportData
}

export function CustomReportTemplate({ data }: CustomReportProps) {
  return (
    <PDFDocument title={data.title} author={data.author}>
      <PDFPage size="A4" margin="md">
        {/* Fixed header on all pages */}
        <PDFHeader
          logo={data.logo}
          title={data.title}
          fixed
        />
        
        {/* Content */}
        <PDFView style={pdfStyles.section}>
          <PDFText style={pdfStyles.heading1}>
            {data.mainHeading}
          </PDFText>
          <PDFText style={pdfStyles.body}>
            {data.content}
          </PDFText>
        </PDFView>
        
        {/* Fixed footer with pagination */}
        <PDFFooter
          leftContent={<PDFText>Confidential</PDFText>}
          showPageNumbers
          fixed
        />
      </PDFPage>
    </PDFDocument>
  )
}
```

### Custom Styles

Extend the base styles:

```tsx
import { StyleSheet } from "@react-pdf/renderer"
import { pdfColors, pdfTypography, pdfSpacing } from "@/lib/pdf/styles"

const customStyles = StyleSheet.create({
  // Extend with your custom styles
  brandHeader: {
    backgroundColor: "#1E3A5F",
    color: "#FFFFFF",
    padding: pdfSpacing[4],
  },
  
  highlightBox: {
    backgroundColor: pdfColors.accent + "10",
    borderLeft: `3pt solid ${pdfColors.accent}`,
    padding: pdfSpacing[3],
    marginVertical: pdfSpacing[2],
  },
  
  dataCell: {
    fontSize: pdfTypography.fontSize.sm,
    padding: pdfSpacing[2],
    borderBottom: `0.5pt solid ${pdfColors.border}`,
  },
})
```

### Font Registration

Register custom fonts:

```tsx
// lib/pdf/fonts.ts
import { Font } from "@react-pdf/renderer"

// Register Inter font family
Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Inter-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Inter-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Inter-Bold.ttf", fontWeight: 700 },
  ],
})

// Register monospace font for code blocks
Font.register({
  family: "JetBrains Mono",
  src: "/fonts/JetBrainsMono-Regular.ttf",
})

// Enable hyphenation for better text flow
Font.registerHyphenationCallback((word) => [word])
```

---

## Server-Side Generation

For generating PDFs on the server (e.g., API routes, cron jobs):

```tsx
import { renderToBuffer, renderToStream } from "@react-pdf/renderer"
import { ReportTemplate } from "@/components/pdf/templates"

// Generate PDF buffer (for saving or sending as response)
async function generatePDFBuffer(data: ReportData): Promise<Buffer> {
  const buffer = await renderToBuffer(
    <ReportTemplate data={data} />
  )
  return buffer
}

// Generate PDF stream (for large documents)
async function generatePDFStream(data: ReportData): Promise<NodeJS.ReadableStream> {
  const stream = await renderToStream(
    <ReportTemplate data={data} />
  )
  return stream
}

// Express.js example
app.get("/api/report/:id/pdf", async (req, res) => {
  const reportData = await getReportData(req.params.id)
  const buffer = await generatePDFBuffer(reportData)
  
  res.setHeader("Content-Type", "application/pdf")
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="report-${req.params.id}.pdf"`
  )
  res.send(buffer)
})
```

---

## Best Practices

### Performance

1. **Lazy load PDF components** - Use dynamic imports for PDF components
2. **Memoize expensive renders** - Cache generated documents when data hasn't changed
3. **Optimize images** - Compress images before embedding
4. **Use streams for large documents** - Stream generation for 50+ page documents

```tsx
// Lazy load PDF components
const ReportTemplate = dynamic(
  () => import("@/components/pdf/templates").then((mod) => mod.ReportTemplate),
  { ssr: false }
)
```

### Accessibility

1. **Set document metadata** - Title, author, subject for screen readers
2. **Use semantic structure** - Headers, sections, tables with proper hierarchy
3. **Add alt text for images** - Describe images for accessibility tools
4. **Ensure color contrast** - Meet WCAG guidelines for text readability

### Testing

1. **Visual regression testing** - Screenshot comparisons for template changes
2. **Schema validation** - Validate data before rendering
3. **Preview component** - Develop with live preview

```tsx
// Development preview component
function PDFDevelopmentPreview({ children }: { children: React.ReactElement }) {
  if (process.env.NODE_ENV !== "development") return null
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <PDFViewer width="100%" height="800">
        {children}
      </PDFViewer>
    </div>
  )
}
```

---

## Registry Entry

Add to `registry.json`:

```json
{
  "name": "pdf-builder",
  "type": "registry:block",
  "title": "PDF Builder",
  "description": "Composable PDF generation system for reports, certificates, invoices, and documents",
  "files": [
    { "path": "src/components/pdf/primitives/pdf-document.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/primitives/pdf-page.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/primitives/pdf-view.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/primitives/pdf-text.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/primitives/pdf-image.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/primitives/index.ts", "type": "registry:ui" },
    { "path": "src/components/pdf/layouts/pdf-header.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/layouts/pdf-footer.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/layouts/pdf-section.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/layouts/pdf-table.tsx", "type": "registry:ui" },
    { "path": "src/components/pdf/layouts/index.ts", "type": "registry:ui" },
    { "path": "src/components/pdf/templates/report-template.tsx", "type": "registry:block" },
    { "path": "src/components/pdf/templates/certificate-template.tsx", "type": "registry:block" },
    { "path": "src/components/pdf/templates/invoice-template.tsx", "type": "registry:block" },
    { "path": "src/components/pdf/templates/index.ts", "type": "registry:block" },
    { "path": "src/components/pdf/index.ts", "type": "registry:ui" },
    { "path": "src/lib/pdf/styles.ts", "type": "registry:lib" },
    { "path": "src/lib/pdf/fonts.ts", "type": "registry:lib" },
    { "path": "src/lib/pdf/utils.ts", "type": "registry:lib" },
    { "path": "src/lib/pdf/types.ts", "type": "registry:lib" }
  ],
  "dependencies": [
    "@react-pdf/renderer"
  ],
  "devDependencies": [],
  "registryDependencies": []
}
```

---

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial release with core primitives and templates |

---

## Related

- [Design System](./design-system.md) - Core design tokens
- [Components](./components.md) - UI component library
- [@react-pdf/renderer](https://react-pdf.org/) - Underlying PDF library


