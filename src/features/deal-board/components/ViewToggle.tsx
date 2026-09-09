import { LayoutGrid, Table2 } from 'lucide-react';
import type { DealBoardView } from '../constants/dealBoard.constants';
import './ViewToggle.css';

interface ViewToggleProps {
  view: DealBoardView;
  onChange: (view: DealBoardView) => void;
}

/**
 * Kanban / Table segmented toggle for the unified deal board.
 *
 * Used by:
 * - DealBoardPage
 */
function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="deal-board-view-toggle" role="tablist" aria-label="Deal board view">
      <button
        type="button"
        role="tab"
        aria-selected={view === 'kanban'}
        className={`deal-board-view-toggle__btn${view === 'kanban' ? ' is-active' : ''}`}
        onClick={() => onChange('kanban')}
      >
        <LayoutGrid size={16} /> Kanban
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === 'table'}
        className={`deal-board-view-toggle__btn${view === 'table' ? ' is-active' : ''}`}
        onClick={() => onChange('table')}
      >
        <Table2 size={16} /> Table
      </button>
    </div>
  );
}

export default ViewToggle;
