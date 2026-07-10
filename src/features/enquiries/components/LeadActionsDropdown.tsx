import { ChevronDown, MoreHorizontal, Download, RotateCcw, Users, Copy, Trash2 } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import { useDropdownState } from '../../../shared/hooks/useDropdownState';
import type { EnquiriesBulkActionCallbacks } from '../types/component.types';

export interface LeadActionsDropdownProps {
  selectedCount: number;
  bulkActions: EnquiriesBulkActionCallbacks;
}

/**
 * Self-contained "Actions" (bulk-selection) toolbar dropdown - owns its own
 * open/close state, only takes the selection count + bulk-action callbacks.
 *
 * Used by:
 * - EnquiriesPage (composed directly as a TableNav child)
 */
const LeadActionsDropdown = ({ selectedCount, bulkActions }: LeadActionsDropdownProps) => {
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
      <button className="dropdown-item" onClick={() => { bulkActions.onExportSelected(); dropdown.close(); }}>
        <Download size={16} /> <span>Export Selected</span>
      </button>
      <button className="dropdown-item" onClick={() => { bulkActions.onChangeStatus(); dropdown.close(); }}>
        <RotateCcw size={16} /> <span>Change Status</span>
      </button>
      <button className="dropdown-item" onClick={() => { bulkActions.onAssignStaff(); dropdown.close(); }}>
        <Users size={16} /> <span>Assign Staff</span>
      </button>
      <button className="dropdown-item" onClick={() => { bulkActions.onDuplicateLead(); dropdown.close(); }}>
        <Copy size={16} /> <span>Duplicate Lead</span>
      </button>
      <div className="dropdown-divider"></div>
      <button className="dropdown-item danger" onClick={() => { bulkActions.onDeleteSelected(); dropdown.close(); }}>
        <Trash2 size={16} /> <span>Delete Selected</span>
      </button>
    </Dropdown>
  );
};

export default LeadActionsDropdown;
