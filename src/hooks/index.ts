/**
 * Custom Hooks
 * 
 * Reusable React hooks for common functionality.
 */

// Mobile detection
export { useIsMobile } from "./use-mobile"

// Storage
export { useLocalStorage } from "./use-local-storage"

// Debouncing
export { useDebounce, useDebouncedCallback } from "./use-debounce"

// Media queries
export {
  useMediaQuery,
  useIsSmallScreen,
  useIsMediumScreen,
  useIsLargeScreen,
  useIsExtraLargeScreen,
  usePrefersReducedMotion,
  usePrefersDarkMode,
} from "./use-media-query"

// Keyboard shortcuts
export {
  useKeyboardShortcut,
  useIsMac,
  useModifierKey,
} from "./use-keyboard-shortcut"
