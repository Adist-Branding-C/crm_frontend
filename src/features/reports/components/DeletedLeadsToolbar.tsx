import React from 'react';
import { Search, Filter, ChevronDown, ArrowUpDown, ArrowDown, ArrowUp, RotateCcw } from 'lucide-react';
import type { DeletedLeadsToolbarProps } from '../types';

const DeletedLeadsToolbar: React.FC<DeletedLeadsToolbarProps> = ({
  searchQuery, onSearchChange, showFilters, onToggleFilters,
  sortConfig, showSortDropdown, sortDropdownClosing, sortDropdownRef,
  onSetShowSortDropdown, onCloseSortDropdown, onSortDesc, onSortAsc,
  selectedCount, onRecoverAll,
}) => {
  const toggleSort = () => {
    if (showSortDropdown) { onCloseSortDropdown(); } else { onSetShowSortDropdown(true); }
  };

  return (
    <>
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search leads..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="search-input" />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={onToggleFilters}>
          <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <div className="dropdown-container" ref={sortDropdownRef}>
          <button className={`btn btn-secondary ${showSortDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleSort(); }}>
            <ArrowUpDown size={16} /> Sort By <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
          </button>
          {showSortDropdown && (
            <div className={`premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`}>
              <div className="dropdown-header">Sort By</div>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                onClick={() => { onSortDesc('name'); onCloseSortDropdown(); }}>
                <ArrowDown size={16} /><span>Name (Z-A)</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                onClick={() => { onSortAsc('name'); onCloseSortDropdown(); }}>
                <ArrowUp size={16} /><span>Name (A-Z)</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                onClick={() => { onSortDesc('createdAt'); onCloseSortDropdown(); }}>
                <ArrowDown size={16} /><span>Newest First</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                onClick={() => { onSortAsc('createdAt'); onCloseSortDropdown(); }}>
                <ArrowUp size={16} /><span>Oldest First</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'deletedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                onClick={() => { onSortDesc('deletedAt'); onCloseSortDropdown(); }}>
                <ArrowDown size={16} /><span>Recently Deleted</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'deletedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                onClick={() => { onSortAsc('deletedAt'); onCloseSortDropdown(); }}>
                <ArrowUp size={16} /><span>Earlier Deleted</span>
              </button>
            </div>
          )}
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={onRecoverAll} disabled={selectedCount === 0}>
            <RotateCcw size={16} /> Recover Lead ({selectedCount})
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletedLeadsToolbar;
