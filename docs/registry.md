# Component Registry

This document describes the IQ LDS component registry system, how to build it, add new components, and consume components from it.

## Overview

The IQ LDS registry is a shadcn-compatible component registry that allows you to share and install components across projects. It follows the [shadcn registry specification](https://ui.shadcn.com/docs/registry) and can be used with the shadcn CLI.

## Registry Configuration

### Project Configuration (`components.json`)

The registry is configured in `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@iqlds": "https://iqlds.vercel.app/r/{name}.json"
  }
}
```

**Key Points:**
- The `registries` object maps registry aliases to URLs
- The URL must include `{name}` placeholder for component resolution
- Use `@iqlds` prefix when installing components from this registry

---

## Registry File Structure

### Source Registry (`registry.json`)

The source registry file defines all available components:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "iqline-design-system",
  "homepage": "https://iqlds.vercel.app",
  "description": "IQLine Design System components",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A button component",
      "files": [
        {
          "path": "src/components/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

### Built Registry (`public/r/`)

After building, the registry outputs individual JSON files to `public/r/`:

```
public/
└── r/
    ├── button.json
    ├── card.json
    ├── global-header.json
    └── ...
```

---

## Component Types

The shadcn registry supports specific component types. Use only these valid types:

| Type | Description | Location |
|------|-------------|----------|
| `registry:ui` | UI primitives (buttons, inputs, etc.) | `src/components/ui/` |
| `registry:block` | Reusable blocks and compositions | `src/components/blocks/` |
| `registry:hook` | Custom React hooks | `src/hooks/` |
| `registry:lib` | Utility functions and libraries | `src/lib/` |
| `registry:theme` | Theme configurations | N/A |

**Note:** Custom types like `registry:layout`, `registry:pattern`, or `registry:page` are **not supported** by the shadcn CLI. Use `registry:block` for these components instead.

---

## Adding New Components

### Step 1: Create the Component

Create your component in the appropriate directory:

```tsx
// src/components/blocks/my-component.tsx
import * as React from "react"
import { Button } from "@/components/ui/button"

interface MyComponentProps {
  title: string
  children: React.ReactNode
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
```

### Step 2: Add to Registry

Add an entry to `registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:block",
  "title": "My Component",
  "description": "A reusable component for displaying content with a title",
  "files": [
    {
      "path": "src/components/blocks/my-component.tsx",
      "type": "registry:block"
    }
  ],
  "dependencies": [
    "@/components/ui/button"
  ]
}
```

### Step 3: Build the Registry

```bash
npx shadcn@latest build
```

This generates `public/r/my-component.json`.

### Step 4: Deploy

Deploy your project to make the registry available at your configured URL.

---

## Registry Item Schema

Each item in the registry follows this schema:

```json
{
  "name": "component-name",
  "type": "registry:block",
  "title": "Human Readable Title",
  "description": "Brief description of the component",
  "files": [
    {
      "path": "src/components/blocks/component-name.tsx",
      "type": "registry:block"
    }
  ],
  "dependencies": [
    "package-name"
  ],
  "registryDependencies": [
    "button",
    "card"
  ]
}
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique identifier (kebab-case) |
| `type` | Yes | Component type (see valid types above) |
| `title` | No | Human-readable name |
| `description` | No | Brief description |
| `files` | Yes | Array of file paths |
| `dependencies` | No | npm packages required |
| `registryDependencies` | No | Other registry items required |

---

## Building the Registry

### Build Command

```bash
npx shadcn@latest build
```

This command:
1. Reads `registry.json`
2. Processes each component
3. Outputs individual JSON files to `public/r/`

### Build Script

The build is configured in `package.json`:

```json
{
  "scripts": {
    "build": "tsc -b && vite build && shadcn build"
  }
}
```

---

## Consuming Components

### Installing from the Registry

Use the shadcn CLI to install components:

```bash
# Install a component from the IQ LDS registry
npx shadcn@latest add global-header --registry @iqlds

# Or use the full URL
npx shadcn@latest add global-header --registry https://iqlds.vercel.app/r
```

### Multiple Components

Install multiple components at once:

```bash
npx shadcn@latest add global-header global-sidebar page-header --registry @iqlds
```

### Available Components

See [COMPONENTS.md](./COMPONENTS.md) for a complete list of available components.

---

## Best Practices

### 1. Naming Conventions

- Use **kebab-case** for component names: `my-component`, not `MyComponent`
- Use descriptive names: `data-table`, not `dt`
- Prefix related components: `page-header`, `page-tabs`, `page-shell`

### 2. Dependencies

- List all npm dependencies explicitly
- Use `registryDependencies` for other registry items
- Don't include path aliases in dependencies (use actual package names)

```json
{
  "dependencies": [
    "@tanstack/react-table",
    "react-router-dom"
  ],
  "registryDependencies": [
    "button",
    "table"
  ]
}
```

### 3. File Organization

```
src/
├── components/
│   ├── ui/           → registry:ui
│   ├── blocks/       → registry:block
│   └── patterns/     → registry:block (use block type)
├── hooks/            → registry:hook
└── lib/              → registry:lib
```

### 4. Documentation

- Always include `title` and `description`
- Keep descriptions concise but informative
- Update documentation when modifying components

### 5. Testing Before Publishing

Always test the build before deploying:

```bash
# Build the registry
npx shadcn@latest build

# Verify output files exist
ls -la public/r/

# Test installing locally (optional)
npx shadcn@latest add my-component --registry ./public/r
```

---

## Troubleshooting

### "Invalid registry file" Error

**Cause:** Invalid component types or malformed JSON.

**Solution:**
1. Check that all `type` fields use valid values (`registry:ui`, `registry:block`, etc.)
2. Validate JSON syntax
3. Ensure the `$schema` is correct

### "Registry URL must include {name} placeholder"

**Cause:** Missing `{name}` in registry URL.

**Solution:** Update `components.json`:
```json
{
  "registries": {
    "@iqlds": "https://iqlds.vercel.app/r/{name}.json"
  }
}
```

### Component Not Found

**Cause:** Component not built or deployed.

**Solution:**
1. Run `npx shadcn@latest build`
2. Check that `public/r/{name}.json` exists
3. Deploy the updated build

---

## Registry URLs

| Environment | URL |
|-------------|-----|
| Production | `https://iqlds.vercel.app/r/{name}.json` |
| Local Development | `./public/r/{name}.json` |

---

## Related Documentation

- [Components](./components.md) - Component usage and patterns
- [COMPONENTS.md](./COMPONENTS.md) - Complete component list
- [Design System](./design-system.md) - Design tokens and styling
- [shadcn Registry Docs](https://ui.shadcn.com/docs/registry) - Official documentation

