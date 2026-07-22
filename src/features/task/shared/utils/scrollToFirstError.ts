export const scrollToFirstError = (container: HTMLElement | null): void => {
  if (!container) return;
  const firstError = container.querySelector('.input-error');
  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (firstError instanceof HTMLElement) {
      firstError.focus({ preventScroll: true });
    }
  }
};