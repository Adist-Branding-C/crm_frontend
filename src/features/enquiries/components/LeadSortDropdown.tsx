import { ChevronDown, SortDesc, SortAsc, Check, RefreshCw, ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import { useDropdownState } from '../../../shared/hooks/useDropdownState';
import type { SortConfig } from '../../../shared/types/sort';

export interface LeadSortDropdownProps {
  sortConfig: SortConfig;
  onSortDesc: (key: string) => void;
  onSortAsc: (key: string) => void;
}

/**
 * Self-contained "Sort By" toolbar dropdown - owns its own open/close state,
 * only takes the current sort + the two sort-callbacks as props.
 *
 * Used by:
 * - EnquiriesPage (composed directly as a TableNav child)
 */
const LeadSortDropdown = ({ sortConfig, onSortDesc, onSortAsc }: LeadSortDropdownProps) => {
  const dropdown = useDropdownState();

  const item = (key: string, direction: 'asc' | 'desc', label: string, icon: React.ReactNode, action: (key: string) => void) => (
    <button
      className={`dropdown-item ${sortConfig.key === key && sortConfig.direction === direction ? 'selected' : ''}`}
      onClick={() => { action(key); dropdown.close(); }}
    >
      {icon} <span>{label}</span>
      {sortConfig.key === key && sortConfig.direction === direction && <Check size={14} className="check-icon" />}
    </button>
  );

  return (
    <Dropdown
      isOpen={dropdown.isOpen}
      isClosing={dropdown.isClosing}
      dropdownRef={dropdown.ref}
      panelClassName="sort-dropdown"
      trigger={
        <button className={`btn btn-secondary ${dropdown.isOpen ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); dropdown.toggle(); }}>
          <SortAsc size={16} /> Sort By <ChevronDown size={14} className={dropdown.isOpen ? 'rotate' : ''} />
        </button>
      }
    >
      <div className="dropdown-header">Sort By</div>
      {item('createdAt', 'desc', 'Newest First', <SortDesc size={16} />, onSortDesc)}
      {item('createdAt', 'asc', 'Oldest First', <SortAsc size={16} />, onSortAsc)}
      {item('updatedAt', 'desc', 'Updated Date', <RefreshCw size={16} />, onSortDesc)}
      {item('updatedAt', 'asc', 'Updated (Oldest)', <SortAsc size={16} />, onSortAsc)}
      {item('name', 'asc', 'Name (A-Z)', <ArrowDownNarrowWide size={16} />, onSortAsc)}
      {item('name', 'desc', 'Name (Z-A)', <ArrowUpNarrowWide size={16} />, onSortDesc)}
    </Dropdown>
  );
};

export default LeadSortDropdown;
