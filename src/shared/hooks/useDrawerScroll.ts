import { useCallback } from 'react';

/**
 * Scrolls a '.drawer-body' container to its first field error and focuses it, or scrolls it
 * to the top for a form-level error not tied to one field.
 *
 * Used by:
 * - campaigns (useCampaignSubmitHandlers)
 */
export function useDrawerScroll() {
  const scrollAndFocusError = useCallback(() => {
    setTimeout(() => {
      const drawerBody = document.querySelector('.drawer-body');
      if (!drawerBody) return;
      const errorEl = drawerBody.querySelector('.input-error');
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (errorEl as HTMLElement).focus();
      }
    }, 0);
  }, []);

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      const drawerBody = document.querySelector('.drawer-body');
      if (drawerBody) {
        drawerBody.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  }, []);

  return { scrollAndFocusError, scrollToTop };
}
