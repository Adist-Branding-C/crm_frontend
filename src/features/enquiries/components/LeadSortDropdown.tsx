import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import { useDropdownState } from '../../../shared/hooks/useDropdownState';

export interface LeadSortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onSortChange: (field: string, direction: string) => void;
}

const SORT_OPTIONS: Array<{ field: string; direction: string; label: string }> = [
  { field: 'createdAt', direction: 'desc', label: 'Newest First' },
  { field: 'createdAt', direction: 'asc', label: 'Oldest First' },
  { field: 'updatedAt', direction: 'desc', label: 'Last Updated' },
  { field: 'updatedAt', direction: 'asc', label: 'Oldest Updated' },
  { field: 'name', direction: 'asc', label: 'Name (A-Z)' },
  { field: 'name', direction: 'desc', label: 'Name (Z-A)' },
];

/**
 * Self-contained "Sort By" toolbar dropdown - owns its own open/close state,
 * only takes the current sort + the sort-change callback as props.
 *
 * Used by:
 * - EnquiriesPage (composed directly as a TableNav child)
 */
const LeadSortDropdown = ({ sortBy, sortOrder, onSortChange }: LeadSortDropdownProps) => {
  const dropdown = useDropdownState();

  return (
    <Dropdown
      isOpen={dropdown.isOpen}
      isClosing={dropdown.isClosing}
      dropdownRef={dropdown.ref}
      panelClassName="sort-dropdown"
      trigger={
        <button className={`btn btn-secondary ${dropdown.isOpen ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); dropdown.toggle(); }}>
          <ArrowUp size={16} /> Sort By <ChevronDown size={14} className={dropdown.isOpen ? 'rotate' : ''} />
        </button>
      }
    >
      <div className="dropdown-header">Sort By</div>
      {SORT_OPTIONS.map(({ field, direction, label }) => (
        <button
          key={`${field}-${direction}`}
          className={`dropdown-item ${sortBy === field && sortOrder === direction ? 'selected' : ''}`}
          onClick={() => { onSortChange(field, direction); dropdown.close(); }}
        >
          {direction === 'desc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span>{label}</span>
        </button>
      ))}
    </Dropdown>
  );
};

export default LeadSortDropdown;
