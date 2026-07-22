import React from 'react';
import { ChevronDown, SortDesc, SortAsc, RefreshCw, ArrowDownNarrowWide, ArrowUpNarrowWide, Check } from 'lucide-react';
import type { SortConfig } from '../../types/sort';

interface SortDropdownProps {
  sortConfig: SortConfig;
  showDropdown: boolean;
  dropdownClosing: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onOpen: () => void;
  onClose: () => void;
  onSortAsc: (key: string) => void;
  onSortDesc: (key: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortConfig, showDropdown, dropdownClosing, dropdownRef,
  onOpen, onClose, onSortAsc, onSortDesc,
}) => {
  const toggle = () => {
    if (showDropdown) { onClose(); } else { onOpen(); }
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className={`btn btn-secondary ${showDropdown ? 'active' : ''}`}
        onClick={(e) => { e.stopPropagation(); toggle(); }}
      >
        <SortAsc size={16} /> Sort By <ChevronDown size={14} className={showDropdown ? 'rotate' : ''} />
      </button>
      {showDropdown && (
        <div className={`premium-dropdown sort-dropdown ${dropdownClosing ? 'closing' : ''}`}>
          <div className="dropdown-header">Sort By</div>
          <button
            className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
            onClick={() => { onSortDesc('createdAt'); onClose(); }}
          >
            <SortDesc size={16} /> <span>Newest First</span>
            {sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
          </button>
          <button
            className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
            onClick={() => { onSortAsc('createdAt'); onClose(); }}
          >
            <SortAsc size={16} /> <span>Oldest First</span>
            {sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
          </button>
          <button
            className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
            onClick={() => { onSortDesc('updatedAt'); onClose(); }}
          >
            <RefreshCw size={16} /> <span>Updated Date</span>
            {sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
          </button>
          <button
            className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
            onClick={() => { onSortAsc('updatedAt'); onClose(); }}
          >
            <SortAsc size={16} /> <span>Updated (Oldest)</span>
            {sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
          </button>
          <button
            className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
            onClick={() => { onSortAsc('name'); onClose(); }}
          >
            <ArrowDownNarrowWide size={16} /> <span>Name (A-Z)</span>
            {sortConfig.key === 'name' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
          </button>
          <button
            className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
            onClick={() => { onSortDesc('name'); onClose(); }}
          >
            <ArrowUpNarrowWide size={16} /> <span>Name (Z-A)</span>
            {sortConfig.key === 'name' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
