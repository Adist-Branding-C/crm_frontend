/**
 * Owns the application appearance preference (`light` / `dark` / `system`).
 *
 * State is a module-level store shared by every consumer via
 * `useSyncExternalStore`, so the header toggle, charts and anything else stay
 * in lock-step. Changing the mode:
 *  - persists it to localStorage (`THEME_STORAGE_KEY`)
 *  - sets or clears `data-theme` on <html> (CSS in `tokens.css` does the rest)
 *  - keeps `color-scheme` in sync so native controls / scrollbars follow
 *
 * The initial DOM state is applied before React mounts by the inline script in
 * `index.html`; this module re-asserts it on load to cover HMR and to react to
 * OS changes while the user is on `system`.
 */
import { useCallback, useSyncExternalStore } from 'react';
import {
  DARK_MEDIA_QUERY,
  THEME_MODES,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeMode,
} from '../constants/theme';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const listeners = new Set<() => void>();

const readStoredMode = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* storage unavailable */
  }
  return 'system';
};

let currentMode: ThemeMode = isBrowser ? readStoredMode() : 'system';

const systemPrefersDark = (): boolean =>
  isBrowser && window.matchMedia(DARK_MEDIA_QUERY).matches;

const resolve = (mode: ThemeMode): ResolvedTheme =>
  mode === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : mode;

const applyToDocument = (mode: ThemeMode): void => {
  if (!isBrowser) return;
  const root = document.documentElement;
  if (mode === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', mode);
  root.style.colorScheme = resolve(mode);
};

const notify = (): void => {
  for (const listener of listeners) listener();
};

/** Update the appearance preference and persist it. */
export const setThemeMode = (mode: ThemeMode): void => {
  currentMode = mode;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* preference just won't persist across reloads */
  }
  applyToDocument(mode);
  notify();
};

const subscribe = (onChange: () => void): (() => void) => {
  listeners.add(onChange);

  const media = window.matchMedia(DARK_MEDIA_QUERY);
  const handleSystemChange = () => {
    if (currentMode === 'system') {
      applyToDocument('system');
      onChange();
    }
  };
  media.addEventListener('change', handleSystemChange);

  return () => {
    listeners.delete(onChange);
    media.removeEventListener('change', handleSystemChange);
  };
};

const getSnapshot = (): ThemeMode => currentMode;
const getServerSnapshot = (): ThemeMode => 'system';

// Re-assert on module load (HMR, or if the inline bootstrap was skipped).
applyToDocument(currentMode);

export interface UseThemeResult {
  /** The user's preference: `light`, `dark` or `system`. */
  mode: ThemeMode;
  /** The appearance currently rendered, with `system` resolved. */
  resolved: ResolvedTheme;
  /** Set an explicit preference. */
  setMode: (mode: ThemeMode) => void;
  /** Advance to the next mode (light → dark → system). */
  cycleMode: () => void;
}

export const useTheme = (): UseThemeResult => {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const cycleMode = useCallback(() => {
    const next = THEME_MODES[(THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length] ?? 'system';
    setThemeMode(next);
  }, [mode]);

  return { mode, resolved: resolve(mode), setMode: setThemeMode, cycleMode };
};
