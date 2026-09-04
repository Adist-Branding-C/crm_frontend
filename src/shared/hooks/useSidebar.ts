/**
 * Owns every piece of runtime state the primary sidebar needs:
 *  - `collapsed`: the persisted icon-rail preference (desktop only)
 *  - `mobileOpen`: the overlay drawer visibility below the mobile breakpoint
 *  - `isMobile`: whether the viewport is currently in overlay territory
 *
 * Route changes and the Escape key close the mobile drawer; body scroll is
 * locked while it is open. The component stays render-only.
 */
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SIDEBAR_COLLAPSED_STORAGE_KEY, SIDEBAR_MOBILE_QUERY } from '../constants/sidebar';

const readCollapsedPreference = (): boolean => {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const matchesMobile = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(SIDEBAR_MOBILE_QUERY).matches;

export interface SidebarState {
  isMobile: boolean;
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  openMobile: () => void;
  closeMobile: () => void;
}

export const useSidebar = (): SidebarState => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(matchesMobile);
  const [collapsedPreference, setCollapsedPreference] = useState(readCollapsedPreference);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(SIDEBAR_MOBILE_QUERY);
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(collapsedPreference));
    } catch {
      /* storage unavailable — the preference just won't persist across reloads */
    }
  }, [collapsedPreference]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleCollapsed = useCallback(() => setCollapsedPreference((prev) => !prev), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return {
    isMobile,
    // The overlay drawer is always full-width; collapsing only applies to the desktop rail.
    collapsed: collapsedPreference && !isMobile,
    mobileOpen,
    toggleCollapsed,
    openMobile,
    closeMobile,
  };
};
