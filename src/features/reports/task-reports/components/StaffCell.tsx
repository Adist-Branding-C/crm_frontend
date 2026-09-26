function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

interface StaffCellProps {
  name: string;
}

/**
 * Staff avatar + name cell shared by Task report tables.
 *
 * Used by:
 * - TaskSummaryReport (Task Summary / Productivity report)
 * - SlaBreachRow (SLA Breach & Escalation report)
 */
const StaffCell = ({ name }: StaffCellProps) => (
  <div className="agent-cell">
    <div className="agent-avatar">{getInitials(name)}</div>
    <span className="agent-name">{name}</span>
  </div>
);

export default StaffCell;