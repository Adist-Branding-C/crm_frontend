import { ChevronDown, MoreHorizontal, ArrowRightLeft, UserCog } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import { useDropdownState } from '../../../shared/hooks/useDropdownState';

export interface DealBulkActionsDropdownProps {
  selectedCount: number;
  onChangeStage: () => void;
  onReassignOwner: () => void;
}

/**
 * Self-contained "Actions" (bulk-selection) toolbar dropdown for the Deals
 * table - mirrors LeadActionsDropdown's shape (owns its own open/close
 * state, only takes the selection count + bulk-action callbacks).
 *
 * Used by:
 * - DealPage (composed directly as a TableNav child)
 */
const DealBulkActionsDropdown = ({ selectedCount, onChangeStage, onReassignOwner }: DealBulkActionsDropdownProps) => {
  const dropdown = useDropdownState();

  return (
    <Dropdown
      isOpen={dropdown.isOpen}
      isClosing={dropdown.isClosing}
      dropdownRef={dropdown.ref}
      panelClassName="actions-dropdown"
      trigger={
        <button className={`btn btn-secondary ${dropdown.isOpen ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); dropdown.toggle(); }}>
          <MoreHorizontal size={16} /> Actions {selectedCount > 0 && <span className="selected-count-badge">{selectedCount}</span>} <ChevronDown size={14} className={dropdown.isOpen ? 'rotate' : ''} />
        </button>
      }
    >
      <div className="dropdown-header">Actions {selectedCount > 0 && `(${selectedCount} selected)`}</div>

      <button className="dropdown-item" onClick={() => { onChangeStage(); dropdown.close(); }}>
        <ArrowRightLeft size={16} /> <span>Change Stage</span>
      </button>
      <button className="dropdown-item" onClick={() => { onReassignOwner(); dropdown.close(); }}>
        <UserCog size={16} /> <span>Reassign Owner</span>
      </button>
    </Dropdown>
  );
};

export default DealBulkActionsDropdown;
