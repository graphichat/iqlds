# IQ LDS Starter Template

A clean, production-ready starter template built with React, TypeScript, Vite, and shadcn/ui.

## What's Included

### ✅ UI Components
- Complete shadcn/ui component library (60+ components)
- All components are fully typed and accessible
- Components located in `src/components/ui/`

### ✅ Layouts & Blocks
- **Layouts**: App shell, page shell, nested shell, split layout, page with properties
- **Blocks**: Global header, global sidebar, page header, page tabs, login form, password reset form, data table, metric card, back button
- **Patterns**: Page header with back, page header with tabs

### ✅ Essential Pages
- **Starter Page**: Clean welcome page with getting started guide
- **Login Page**: Authentication template
- **Signup Page**: Registration template
- **Password Reset Page**: Password recovery template
- **404 Page**: Not found page template

### ✅ Features
- Theme support with light/dark/system modes
- Two built-in themes: Default Theme and IQLine Theme
- Theme switcher in header
- Responsive design
- TypeScript throughout
- React Router for navigation
- Tailwind CSS for styling

## Getting Started

1. **Customize the Starter Page**
   - Edit `src/pages/StarterPage.tsx` to create your home page

2. **Add Your Routes**
   - Update `src/app/router.tsx` to add your application routes

3. **Configure Navigation**
   - Update `src/lib/sidebar-config.ts` to add sidebar items

4. **Use Components**
   ```tsx
   import { Button } from "@/components/ui/button"
   import { Card } from "@/components/ui/card"
   import { PageHeader } from "@/components/blocks/page-header"
   ```

5. **Customize Theme**
   - Switch themes using the theme toggle in the header
   - Create custom themes in `registry.json`

## Project Structure

```
src/
├── app/              # App configuration and routing
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── blocks/      # Reusable block components
│   ├── layouts/     # Layout components
│   └── patterns/    # Pattern components
├── lib/             # Utilities and helpers
├── pages/           # Page components
│   ├── StarterPage.tsx
│   └── templates/   # Page templates
└── index.css        # Global styles and theme variables
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## Documentation

- Components: See `docs/components.md`
- Design System: See `docs/design-system.md`
- Creating Pages: See `docs/creating-pages.md`
- Page Layouts: See `docs/page-layouts.md`

## Next Steps

1. Remove this README and create your own
2. Update `package.json` with your project details
3. Customize the theme colors in `src/index.css` or create a new theme
4. Add your own pages and components
5. Configure your deployment settings

## License

MIT


