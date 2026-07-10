const STATUS_CLASS_MAP: Record<string, string> = {
  completed: 'badge-status-completed',
  success: 'badge-status-success',
  active: 'badge-status-active',
  pending: 'badge-status-pending',
  medium: 'badge-status-pending',
  overdue: 'badge-status-overdue',
  high: 'badge-status-overdue',
  failed: 'badge-status-failed',
  inactive: 'badge-status-inactive',
  low: 'badge-status-completed',
  new: 'badge-status-new',
  existing: 'badge-status-existing',
  duplicate: 'badge-status-duplicate',
};

interface StatusBadgeProps {
  value: string | undefined;
}

/**
 * Renders any status/priority value as a colored pill, using the shared
 * badge-status-* palette (status-badges.css) instead of plain text.
 *
 * Used by:
 * - task module (Task, Call Task, Campaign Task, Deal Task) Status and Priority columns
 *
 * Notes:
 * - Unmapped values still get the base `.badge` pill shell so they never render as
 *   unstyled text, falling back to the neutral `badge-secondary` color.
 */
const StatusBadge = ({ value }: StatusBadgeProps) => {
  if (!value) return <span>-</span>;
  const key = value.toLowerCase().trim().replace(/\s+/g, '-');
  const cssClass = STATUS_CLASS_MAP[key] || 'badge-secondary';
  return <span className={`badge ${cssClass}`}>{value}</span>;
};

export default StatusBadge;
