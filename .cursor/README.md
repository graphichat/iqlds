# .cursor Directory

This directory contains Cursor IDE configuration files and AI agent context.

## 📚 Documentation

All project documentation has been consolidated into the **`documentation/`** folder in the project root.

### Quick Links

| Topic | Documentation File |
|-------|-------------------|
| **Getting Started** | [documentation/getting-started.md](../documentation/getting-started.md) |
| **Project Structure** | [documentation/project-structure.md](../documentation/project-structure.md) |
| **Architecture Patterns** | [documentation/architecture.md](../documentation/architecture.md) |
| **Component Guide** | [documentation/components.md](../documentation/components.md) |
| **Navigation Patterns** | [documentation/navigation.md](../documentation/navigation.md) |
| **Creating Pages** | [documentation/creating-pages.md](../documentation/creating-pages.md) |
| **Page Layouts** | [documentation/page-layouts.md](../documentation/page-layouts.md) |
| **Design System** | [documentation/design-system.md](../documentation/design-system.md) |

### 📖 Full Documentation Index

See [documentation/README.md](../documentation/README.md) for the complete documentation index with all available guides.

---

## 🤖 AI Agent Guidelines

### Quick Reference for AI Agents

When working with this project:

1. **Component Hierarchy**
   - `ui/` - Primitives only (Button, Card, Input)
   - `blocks/` - Reusable sections (PageHeader, DataTable)
   - `layouts/` - Structural composition (AppShell, PageShell)
   - `patterns/` - Compositions (PageHeaderWithTabs)

2. **Import Paths**
   ```tsx
   import { Button } from "@/components/ui/button"
   import { PageHeader } from "@/components/blocks/page-header"
   import { PageShell } from "@/components/layouts/page-shell"
   ```

3. **Navigation Patterns**
   - Back button: `<BackButton href="/users" />`
   - Breadcrumbs: Auto-generated in `<GlobalHeader />`
   - Page tabs: `<PageHeaderWithTabs tabs={...} />`

4. **File Naming**
   - Components: `kebab-case.tsx`
   - Pages: `PascalCase.tsx`
   - Hooks: `use-*.ts`

5. **Architecture Scale**
   - **Simple** (1-5 pages): Flat structure
   - **Feature-Based** (5-20 pages): `features/` folder
   - **Module-Based** (20+ pages): `modules/` with RBAC

For detailed implementation guides, see:
- [Project Structure](../documentation/project-structure.md#component-hierarchy)
- [Architecture Patterns](../documentation/architecture.md)
- [Navigation Guide](../documentation/navigation.md)

---

## 📂 Files in this Directory

- **README.md** (this file) - References to main documentation
- **mcp.json** - MCP server configuration
- **debug.log** - Debug logs (not synced)

---

## ℹ️ Note

This `.cursor/` directory previously contained implementation guides that have been consolidated into `documentation/`. All documentation is now in a single location for easier maintenance and discovery.

If you're looking for documentation, please check the `documentation/` folder instead.
