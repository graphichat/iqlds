import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ICON_STROKE_WIDTH } from "@/lib/constants"
import {
  applyTheme,
  getCurrentTheme,
  saveTheme,
  getAvailableThemes,
  type ColorTheme,
} from "@/lib/theme-manager"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>("default-theme")
  const [availableThemes, setAvailableThemes] = React.useState<Array<{ name: ColorTheme; title: string }>>([
    { name: "default-theme", title: "Default Theme" },
    { name: "iqline-theme", title: "IQLine Theme" },
  ])

  // Load available themes on mount
  React.useEffect(() => {
    const themes = getAvailableThemes()
    if (themes.length > 0) {
      setAvailableThemes(themes)
    }
  }, [])

  React.useEffect(() => {
    setMounted(true)
    // Load saved color theme
    const savedTheme = getCurrentTheme()
    setColorTheme(savedTheme)
    // Apply theme on mount
    applyTheme(savedTheme, (theme as "light" | "dark" | "system") || "light")
  }, [])

  React.useEffect(() => {
    if (mounted && theme) {
      // Apply theme when mode changes
      applyTheme(colorTheme, theme as "light" | "dark" | "system")
    }
  }, [theme, colorTheme, mounted])

  const handleColorThemeChange = (newTheme: ColorTheme) => {
    setColorTheme(newTheme)
    saveTheme(newTheme)
    applyTheme(newTheme, (theme as "light" | "dark" | "system") || "light")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <Sun strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {theme === "dark" ? (
            <Moon strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
          ) : (
            <Sun strokeWidth={ICON_STROKE_WIDTH} className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Color Theme Section */}
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        {availableThemes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.name}
            onClick={() => handleColorThemeChange(themeOption.name)}
            className={colorTheme === themeOption.name ? "bg-accent" : ""}
          >
            <Palette strokeWidth={ICON_STROKE_WIDTH} className="mr-2 size-4" />
            <span>{themeOption.title}</span>
            {colorTheme === themeOption.name && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        
        {/* Mode Section */}
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun strokeWidth={ICON_STROKE_WIDTH} className="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon strokeWidth={ICON_STROKE_WIDTH} className="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <span className="mr-2 size-4 flex items-center justify-center">💻</span>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



