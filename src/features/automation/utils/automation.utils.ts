export function computeSlNo(index: number, currentPage: number, rowsPerPage: number): number {
  return (currentPage - 1) * rowsPerPage + index + 1;
}

export function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getTriggerTypeBadgeClass(triggerType: string): string {
  return `badge badge-${triggerType.toLowerCase().replace(/_/g, '-')}`;
}
