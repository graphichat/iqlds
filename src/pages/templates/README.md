# Page Templates

This directory contains standard page templates that serve as references and starting points for creating new pages.

## Available Templates

1. **LoginPage.tsx** - Authentication login page
2. **SignupPage.tsx** - User registration page
3. **PasswordResetPage.tsx** - Password recovery page
4. **DefaultPageWithSidebar.tsx** - Dashboard layout with sidebar and header
5. **PageWithTable.tsx** - Data table page with search and actions

## Usage

Import templates from the index file:

```tsx
import { LoginPage, DefaultPageWithSidebar } from "@/pages/templates"
```

## Documentation

For detailed documentation on each template, see:
- [Page Templates Documentation](../../../docs/page-templates.md)
- [Creating Pages Guide](../../../docs/creating-pages.md)

## Customization

All templates are fully customizable via props. See individual template files for prop definitions and JSDoc comments.

## Guidelines

When using templates:
1. Copy and customize templates rather than modifying them directly
2. Maintain accessibility features
3. Follow design system guidelines
4. Use TypeScript types provided
5. Update documentation if creating new patterns


