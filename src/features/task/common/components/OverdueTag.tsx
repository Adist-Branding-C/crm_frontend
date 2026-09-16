import { memo } from 'react';
import './OverdueTag.css';

/**
 * Small red "Overdue" pill shown next to a task's status (table) or beside its
 * priority (kanban card) when its scheduled date/time has passed and it is
 * still open. Reuses the shared badge palette (.badge + badge-status-overdue)
 * so it always matches StatusBadge styling.
 *
 * Used by:
 * - UnifiedTaskRow (task table Status cell)
 * - TaskCard (kanban card)
 */
const OverdueTag = memo(() => <span className="badge badge-status-overdue overdue-tag">Overdue</span>);

OverdueTag.displayName = 'OverdueTag';
export default OverdueTag;