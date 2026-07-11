export function scrollToFirstError(container) {
    if (!container)
        return;
    const errorEl = container.querySelector('.input-error');
    if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorEl.focus();
    }
}
//# sourceMappingURL=scrollToFirstError.js.map