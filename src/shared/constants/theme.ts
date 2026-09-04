/**
 * Theme configuration shared by the pre-paint bootstrap in `index.html`, the
 * `useTheme` hook and any component that needs to read the active appearance.
 */

/** localStorage key persisting the user's appearance preference. */
export const THEME_STORAGE_KEY = 'adist:theme';

/** OS-level dark-mode query. */
export const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

/**
 * User-selectable modes. `system` follows the OS setting; `light` / `dark`
 * force a value regardless of the OS (written as `data-theme` on <html>).
 */
export type ThemeMode = 'system' | 'light' | 'dark';

/** Resolved appearance actually rendered once `system` is evaluated. */
export type ResolvedTheme = 'light' | 'dark';

/** Cycle order for a single-button toggle. */
export const THEME_MODES: readonly ThemeMode[] = ['light', 'dark', 'system'];
