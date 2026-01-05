import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "next-themes"

import "./index.css"
import App from "./app/App.tsx"
import { getCurrentTheme, applyTheme } from "./lib/theme-manager"

// Apply initial theme before rendering
const initialTheme = getCurrentTheme()
// Use setTimeout to ensure DOM is ready
setTimeout(() => {
  applyTheme(initialTheme, "system")
}, 0)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
    </ThemeProvider>
  </StrictMode>
)
