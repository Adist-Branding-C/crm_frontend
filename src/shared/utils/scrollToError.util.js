/**
 * Scrolls a container to its first `.input-error` field and focuses it.
 *
 * Used by:
 * - account-settings/agent (useAgentCrud, AddAgentDrawer)
 *
 * Notes:
 * - Callers are responsible for locating the container: pass a ref's `.current` from a component
 *   that already holds one, or `document.querySelector(...)` from a hook that doesn't.
 */
export function scrollToFirstError(container) {
    if (!container)
        return;
    const errorEl = container.querySelector('.input-error');
    if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorEl.focus();
    }
}
/**
 * Scrolls a container to its top, used for form-level errors that aren't tied to one field.
 *
 * Used by:
 * - account-settings/agent (useAgentCrud)
 */
export function scrollContainerToTop(container) {
    if (!container)
        return;
    container.scrollTo({ top: 0, behavior: 'smooth' });
}
//# sourceMappingURL=scrollToError.util.js.map