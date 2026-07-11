export const scrollToFirstError = (container) => {
    if (!container)
        return;
    const firstError = container.querySelector('.input-error');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (firstError instanceof HTMLElement) {
            firstError.focus({ preventScroll: true });
        }
    }
};
//# sourceMappingURL=scrollToFirstError.js.map