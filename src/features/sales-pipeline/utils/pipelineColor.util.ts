const COLOR_PALETTE = [
  'var(--danger)',
  'var(--category-orange-text)',
  'var(--warning)',
  'var(--category-teal-text)',
  'var(--success)',
  'var(--chart-6)',
  'var(--chart-1)',
  'var(--info)',
  'var(--primary)',
  'var(--category-purple-text)',
  'var(--category-indigo-text)',
  'var(--category-pink-text)',
];

const TASK_STATUS_COLORS: Record<string, string> = {
  Pending: 'var(--warning)',
  Completed: 'var(--success)',
  Overdue: 'var(--danger)',
};


export function hashStringToColor(value: string): string {
  if (!value) return 'var(--text-tertiary)';
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length] ?? 'var(--text-tertiary)';
}


export function taskStatusColor(status: string): string {
  return TASK_STATUS_COLORS[status] ?? 'var(--text-tertiary)';
}
