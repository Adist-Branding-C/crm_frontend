import React from 'react';
import { Search, Filter, ChevronDown, Plus, SortDesc, SortAsc, Upload, Edit2, UserPlus, Users, FolderPlus, Megaphone, Phone, Trash, Eye, Check, RefreshCw, ArrowDownNarrowWide, ArrowUpNarrowWide, MoreHorizontal, Download, RotateCcw, Send, Copy, Trash2 } from 'lucide-react';
import type { EnquiriesToolbarProps } from '../types';

const EnquiriesToolbar: React.FC<EnquiriesToolbarProps> = ({
  searchQuery, onSearchChange, showFilters, onToggleFilters,
  sortConfig, onSortDesc, onSortAsc,
  showSortDropdown, sortDropdownClosing, sortDropdownRef, onSetShowSortDropdown, onCloseSortDropdown,
  showActionsDropdown, actionsDropdownClosing, actionsDropdownRef, onSetShowActionsDropdown, onCloseActionsDropdown,
  onAddLead,
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
          <input type="text" placeholder="Search enquiries..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="search-input" />
        </div>
        <button className="btn btn-secondary" onClick={onToggleFilters}>
          <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <div className="dropdown-container" ref={sortDropdownRef}>
          <button className={`btn btn-secondary ${showSortDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleSort(); }}>
            <SortAsc size={16} /> Sort By <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
          </button>
          {showSortDropdown && (
            <div className={`premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`}>
              <div className="dropdown-header">Sort By</div>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { onSortDesc('createdAt'); onCloseSortDropdown(); }}>
                <SortDesc size={16} /> <span>Newest First</span>
                {sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { onSortAsc('createdAt'); onCloseSortDropdown(); }}>
                <SortAsc size={16} /> <span>Oldest First</span>
                {sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { onSortDesc('updatedAt'); onCloseSortDropdown(); }}>
                <RefreshCw size={16} /> <span>Updated Date</span>
                {sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { onSortAsc('updatedAt'); onCloseSortDropdown(); }}>
                <SortAsc size={16} /> <span>Updated (Oldest)</span>
                {sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { onSortAsc('name'); onCloseSortDropdown(); }}>
                <ArrowDownNarrowWide size={16} /> <span>Name (A-Z)</span>
                {sortConfig.key === 'name' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { onSortDesc('name'); onCloseSortDropdown(); }}>
                <ArrowUpNarrowWide size={16} /> <span>Name (Z-A)</span>
                {sortConfig.key === 'name' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
              </button>
            </div>
          )}
        </div>
        <div className="dropdown-container" ref={actionsDropdownRef}>
          <button className={`btn btn-secondary ${showActionsDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleActions(); }}>
            <MoreHorizontal size={16} /> Actions <ChevronDown size={14} className={showActionsDropdown ? 'rotate' : ''} />
          </button>
          {showActionsDropdown && (
            <div className={`premium-dropdown actions-dropdown ${actionsDropdownClosing ? 'closing' : ''}`}>
              <div className="dropdown-header">Actions</div>
              <button className="dropdown-item" onClick={() => { alert('Exporting selected leads...'); onCloseActionsDropdown(); }}>
                <Download size={16} /> <span>Export Selected</span>
              </button>
              <button className="dropdown-item" onClick={() => { alert('Changing status...'); onCloseActionsDropdown(); }}>
                <RotateCcw size={16} /> <span>Change Status</span>
              </button>
              <button className="dropdown-item" onClick={() => { alert('Assigning staff...'); onCloseActionsDropdown(); }}>
                <Users size={16} /> <span>Assign Staff</span>
              </button>
              <button className="dropdown-item" onClick={() => { alert('Sending follow up...'); onCloseActionsDropdown(); }}>
                <Send size={16} /> <span>Send Follow Up</span>
              </button>
              <button className="dropdown-item" onClick={() => { alert('Duplicating lead...'); onCloseActionsDropdown(); }}>
                <Copy size={16} /> <span>Duplicate Lead</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item danger" onClick={() => { alert('Deleting selected leads...'); onCloseActionsDropdown(); }}>
                <Trash2 size={16} /> <span>Delete Selected</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="toolbar-right">
        <button className="btn btn-primary" onClick={onAddLead}>
          <Plus size={16} /> Add Lead
        </button>
      </div>
    </div>
  );
};

export default EnquiriesToolbar;
