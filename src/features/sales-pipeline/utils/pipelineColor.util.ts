const COLOR_PALETTE = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#ec4899',
];

const TASK_STATUS_COLORS: Record<string, string> = {
  Pending: '#f59e0b',
  Completed: '#10b981',
  Overdue: '#ef4444',
};


export function hashStringToColor(value: string): string {
  if (!value) return '#6b7280';
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length] ?? '#6b7280';
}


export function taskStatusColor(status: string): string {
  return TASK_STATUS_COLORS[status] ?? '#6b7280';
}
