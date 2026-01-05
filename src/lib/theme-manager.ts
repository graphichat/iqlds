export type ColorTheme = "default-theme" | "iqline-theme"
export type ThemeMode = "light" | "dark" | "system"

const THEME_STORAGE_KEY = "iqlds-color-theme"

interface ThemeCSSVars {
  light?: Record<string, string>
  dark?: Record<string, string>
  theme?: Record<string, string>
}

interface ThemeData {
  name: string
  title: string
  cssVars: ThemeCSSVars
}

interface RegistryItem {
  name: string
  type: string
  title?: string
  cssVars?: ThemeCSSVars
}

interface RegistryData {
  items: RegistryItem[]
}

let registryDataCache: RegistryData | null = null

/**
 * Load registry data
 */
async function loadRegistryData(): Promise<RegistryData> {
  if (registryDataCache) return registryDataCache
  
  try {
    // Try both locations - root and r/ folder
    let response = await fetch("/registry.json")
    if (!response.ok) {
      response = await fetch("/r/registry.json")
    }
    if (!response.ok) {
      throw new Error("Registry not found")
    }
    registryDataCache = await response.json()
    return registryDataCache!
  } catch (error) {
    console.error("Failed to load registry.json:", error)
    // Fallback to empty registry
    return { items: [] }
  }
}

/**
 * Get theme data from registry
 */
export async function getThemeData(themeName: ColorTheme): Promise<ThemeData | null> {
  const registry = await loadRegistryData()
  const theme = registry.items.find(
    (item) => item.type === "registry:theme" && item.name === themeName
  ) as RegistryItem | undefined

  if (!theme || !theme.cssVars || !theme.title) return null

  return {
    name: theme.name,
    title: theme.title,
    cssVars: theme.cssVars,
  }
}

/**
 * Get theme data synchronously (uses cache)
 */
export function getThemeDataSync(themeName: ColorTheme): ThemeData | null {
  if (!registryDataCache) {
    // Try to load synchronously if available
    try {
      // This will only work if registry.json is already loaded
      return null
    } catch {
      return null
    }
  }
  
  const theme = registryDataCache.items.find(
    (item) => item.type === "registry:theme" && item.name === themeName
  ) as RegistryItem | undefined

  if (!theme || !theme.cssVars || !theme.title) return null

  return {
    name: theme.name,
    title: theme.title,
    cssVars: theme.cssVars,
  }
}

/**
 * Apply theme CSS variables to the document root
 */
export function applyTheme(themeName: ColorTheme, mode: ThemeMode = "light") {
  const theme = getThemeDataSync(themeName)
  if (!theme) {
    // Try async load if sync fails
    getThemeData(themeName).then((themeData) => {
      if (themeData) {
        applyThemeVars(themeData, mode)
      }
    })
    return
  }

  applyThemeVars(theme, mode)
}

function applyThemeVars(theme: ThemeData, mode: ThemeMode) {
  const root = document.documentElement
  const isDark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Get the appropriate color variables
  const colorVars = isDark ? theme.cssVars.dark : theme.cssVars.light

  if (!colorVars) return

  // Apply CSS variables to root
  Object.entries(colorVars).forEach(([key, value]) => {
    if (key !== "radius" && value) {
      root.style.setProperty(`--${key}`, value)
    }
  })

  // Apply radius if available
  if (colorVars.radius) {
    root.style.setProperty("--radius", colorVars.radius)
  }

  // Apply theme variables if available
  if (theme.cssVars.theme) {
    Object.entries(theme.cssVars.theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }
}

/**
 * Get current theme from localStorage
 */
export function getCurrentTheme(): ColorTheme {
  if (typeof window === "undefined") return "default-theme"
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ColorTheme | null
  return stored || "default-theme"
}

/**
 * Save theme to localStorage
 */
export function saveTheme(themeName: ColorTheme) {
  if (typeof window === "undefined") return
  localStorage.setItem(THEME_STORAGE_KEY, themeName)
}

/**
 * Get available themes
 */
export function getAvailableThemes(): Array<{ name: ColorTheme; title: string }> {
  if (!registryDataCache) {
    // Preload registry data
    loadRegistryData()
    // Return default themes as fallback
    return [
      { name: "default-theme", title: "Default Theme" },
      { name: "iqline-theme", title: "IQLine Theme" },
    ]
  }
  
  return registryDataCache.items
    .filter((item) => item.type === "registry:theme" && item.title)
    .map((item) => ({
      name: item.name as ColorTheme,
      title: item.title!,
    }))
}

