import React from 'react';
import { Search, Filter, ChevronDown, SortAsc, SortDesc, ArrowDownNarrowWide, ArrowUpNarrowWide, MoreHorizontal, Check, Upload, Edit2, UserPlus, Users, FolderPlus, Megaphone, Phone, Trash } from 'lucide-react';
import type { SpotlightToolbarProps } from '../types';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

const SpotlightToolbar: React.FC<SpotlightToolbarProps> = ({
  searchQuery, onSearchChange, showFilters, onToggleFilters,
  sortConfig, onSortDirection,
  showSortDropdown, onSetShowSortDropdown,
  showActionsDropdown, onSetShowActionsDropdown,
  onCloseSortDropdown, onCloseActionsDropdown,
}) => {
  const toggleSort = () => {
    if (showSortDropdown) { onCloseSortDropdown(); } else { onSetShowSortDropdown(true); onSetShowActionsDropdown(false); }
  };

  const toggleActions = () => {
    if (showActionsDropdown) { onCloseActionsDropdown(); } else { onSetShowActionsDropdown(true); onSetShowSortDropdown(false); }
  };

  return (
    <div className="enquiries-toolbar">
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search spotlight..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="search-input" />
        </div>
        <button className="btn btn-secondary" onClick={onToggleFilters}>
          <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <div className="dropdown-container">
          <button className={`btn btn-secondary ${showSortDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleSort(); }}>
            <SortDesc size={16} /> Sort By <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
          </button>
          {showSortDropdown && (
            <div className="premium-dropdown sort-dropdown">
              <div className="dropdown-header">Sort By</div>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => { onSortDirection('createdAt', SortDirection.DESC); onCloseSortDropdown(); }}>
                <SortDesc size={16} /> <span>Newest First</span>
                {sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.DESC && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => { onSortDirection('createdAt', SortDirection.ASC); onCloseSortDropdown(); }}>
                <SortAsc size={16} /> <span>Oldest First</span>
                {sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.ASC && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => { onSortDirection('updatedAt', SortDirection.DESC); onCloseSortDropdown(); }}>
                <SortDesc size={16} /> <span>Updated Date</span>
                {sortConfig.key === 'updatedAt' && sortConfig.direction === SortDirection.DESC && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => { onSortDirection('updatedAt', SortDirection.ASC); onCloseSortDropdown(); }}>
                <SortAsc size={16} /> <span>Updated (Oldest)</span>
                {sortConfig.key === 'updatedAt' && sortConfig.direction === SortDirection.ASC && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => { onSortDirection('name', SortDirection.ASC); onCloseSortDropdown(); }}>
                <ArrowDownNarrowWide size={16} /> <span>Name (A-Z)</span>
                {sortConfig.key === 'name' && sortConfig.direction === SortDirection.ASC && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => { onSortDirection('name', SortDirection.DESC); onCloseSortDropdown(); }}>
                <ArrowUpNarrowWide size={16} /> <span>Name (Z-A)</span>
                {sortConfig.key === 'name' && sortConfig.direction === SortDirection.DESC && <Check size={14} className="check-icon" />}
              </button>
            </div>
          )}
        </div>
        <div className="dropdown-container">
          <button className={`btn btn-secondary ${showActionsDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleActions(); }}>
            <MoreHorizontal size={16} /> Actions <ChevronDown size={14} className={showActionsDropdown ? 'rotate' : ''} />
          </button>
          {showActionsDropdown && (
            <div className="premium-dropdown actions-dropdown">
              <button className="dropdown-item" onClick={() => { onCloseActionsDropdown(); }}>
                <Upload size={16} /> <span>Bulk Update</span>
              </button>
              <button className="dropdown-item" onClick={() => { onCloseActionsDropdown(); }}>
                <Edit2 size={16} /> <span>Update Status</span>
              </button>
              <button className="dropdown-item" onClick={() => { onCloseActionsDropdown(); }}>
                <UserPlus size={16} /> <span>Assign Agent</span>
              </button>
              <button className="dropdown-item" onClick={() => { onCloseActionsDropdown(); }}>
                <Users size={16} /> <span>Bulk Assign</span>
              </button>
              <button className="dropdown-item" onClick={() => { onCloseActionsDropdown(); }}>
                <FolderPlus size={16} /> <span>Import Contacts</span>
              </button>
              <button className="dropdown-item" onClick={() => { onCloseActionsDropdown(); }}>
                <Megaphone size={16} /> <span>Add to Campaign</span>
              </button>
              <button className="dropdown-item" onClick={() => { onCloseActionsDropdown(); }}>
                <Phone size={16} /> <span>Create Call Task</span>
              </button>
              <button className="dropdown-item danger" onClick={() => { onCloseActionsDropdown(); }}>
                <Trash size={16} /> <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotlightToolbar;
