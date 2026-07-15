import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import { useDropdownState } from '../../../shared/hooks/useDropdownState';
import type { DealSortDropdownProps } from '../types';

const SORT_OPTIONS: Array<{ field: string; direction: string; label: string }> = [
  { field: 'createdAt', direction: 'desc', label: 'Newest First' },
  { field: 'createdAt', direction: 'asc', label: 'Oldest First' },
  { field: 'amount', direction: 'desc', label: 'Highest Amount' },
  { field: 'amount', direction: 'asc', label: 'Lowest Amount' },
  { field: 'startDate', direction: 'desc', label: 'Start Date (Newest)' },
  { field: 'startDate', direction: 'asc', label: 'Start Date (Oldest)' },
  { field: 'dealName', direction: 'asc', label: 'Name (A-Z)' },
  { field: 'dealName', direction: 'desc', label: 'Name (Z-A)' },
];

/**
 * Self-contained "Sort By" toolbar dropdown - owns its own open/close state,
 * only takes the current sort + the sort-change callback as props.
 *
 * Used by:
 * - DealPage (composed directly as a TableNav child)
 */
const DealSortDropdown = ({ sortBy, sortOrder, onSortChange }: DealSortDropdownProps) => {
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

export default DealSortDropdown;
