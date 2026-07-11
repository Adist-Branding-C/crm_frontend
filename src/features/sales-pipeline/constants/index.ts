export const PIPELINE_PAGINATION_LIMIT = 15;

const STAGE_COLOR_PALETTE = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];

function hashColor(value: string): string {
  if (!value) return '#6b7280';
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return STAGE_COLOR_PALETTE[Math.abs(hash) % STAGE_COLOR_PALETTE.length] ?? '#6b7280';
}

export function stageColor(status: string): string {
  return hashColor(status);
}

const TASK_STAGE_COLORS: Record<string, string> = {
  Pending: '#f59e0b',
  Completed: '#10b981',
  Overdue: '#ef4444',
};

export function taskStageColor(status: string): string {
  return TASK_STAGE_COLORS[status] ?? '#6b7280';
}
