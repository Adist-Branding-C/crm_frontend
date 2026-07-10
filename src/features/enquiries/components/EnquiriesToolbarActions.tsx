import React from 'react';
import { Filter, ChevronDown, Plus, SortDesc, SortAsc, Users, Check, RefreshCw, ArrowDownNarrowWide, ArrowUpNarrowWide, MoreHorizontal, Download, RotateCcw, Send, Copy, Trash2 } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import type { EnquiriesToolbarActionsProps } from '../types/component.types';

const EnquiriesToolbarActions: React.FC<EnquiriesToolbarActionsProps> = ({
  showFilters, onToggleFilters,
  sortConfig, onSortDesc, onSortAsc, sortDropdown,
  actionsDropdown, onToggleSort, onToggleActions, selectedCount, bulkActions,
  onAddLead,
}) => {
  return (
    <>
      <button className="btn btn-secondary" onClick={onToggleFilters}>
        <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
      </button>

      <Dropdown
        isOpen={sortDropdown.isOpen}
        isClosing={sortDropdown.isClosing}
        dropdownRef={sortDropdown.ref}
        panelClassName="sort-dropdown"
        trigger={
          <button className={`btn btn-secondary ${sortDropdown.isOpen ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleSort(); }}>
            <SortAsc size={16} /> Sort By <ChevronDown size={14} className={sortDropdown.isOpen ? 'rotate' : ''} />
          </button>
        }
      >
        <div className="dropdown-header">Sort By</div>
        <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { onSortDesc('createdAt'); sortDropdown.close(); }}>
          <SortDesc size={16} /> <span>Newest First</span>
          {sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
        </button>
        <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { onSortAsc('createdAt'); sortDropdown.close(); }}>
          <SortAsc size={16} /> <span>Oldest First</span>
          {sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
        </button>
        <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { onSortDesc('updatedAt'); sortDropdown.close(); }}>
          <RefreshCw size={16} /> <span>Updated Date</span>
          {sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
        </button>
        <button className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { onSortAsc('updatedAt'); sortDropdown.close(); }}>
          <SortAsc size={16} /> <span>Updated (Oldest)</span>
          {sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
        </button>
        <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { onSortAsc('name'); sortDropdown.close(); }}>
          <ArrowDownNarrowWide size={16} /> <span>Name (A-Z)</span>
          {sortConfig.key === 'name' && sortConfig.direction === 'asc' && <Check size={14} className="check-icon" />}
        </button>
        <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { onSortDesc('name'); sortDropdown.close(); }}>
          <ArrowUpNarrowWide size={16} /> <span>Name (Z-A)</span>
          {sortConfig.key === 'name' && sortConfig.direction === 'desc' && <Check size={14} className="check-icon" />}
        </button>
      </Dropdown>

      <Dropdown
        isOpen={actionsDropdown.isOpen}
        isClosing={actionsDropdown.isClosing}
        dropdownRef={actionsDropdown.ref}
        panelClassName="actions-dropdown"
        trigger={
          <button className={`btn btn-secondary ${actionsDropdown.isOpen ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleActions(); }}>
            <MoreHorizontal size={16} /> Actions {selectedCount > 0 && <span className="selected-count-badge">{selectedCount}</span>} <ChevronDown size={14} className={actionsDropdown.isOpen ? 'rotate' : ''} />
          </button>
        }
      >
        <div className="dropdown-header">Actions {selectedCount > 0 && `(${selectedCount} selected)`}</div>
        <button className="dropdown-item" onClick={() => { bulkActions.onExportSelected(); actionsDropdown.close(); }}>
          <Download size={16} /> <span>Export Selected</span>
        </button>
        <button className="dropdown-item" onClick={() => { bulkActions.onChangeStatus(); actionsDropdown.close(); }}>
          <RotateCcw size={16} /> <span>Change Status</span>
        </button>
        <button className="dropdown-item" onClick={() => { bulkActions.onAssignStaff(); actionsDropdown.close(); }}>
          <Users size={16} /> <span>Assign Staff</span>
        </button>
        <button className="dropdown-item" onClick={() => { bulkActions.onSendFollowUp(); actionsDropdown.close(); }}>
          <Send size={16} /> <span>Send Follow Up</span>
        </button>
        <button className="dropdown-item" onClick={() => { bulkActions.onDuplicateLead(); actionsDropdown.close(); }}>
          <Copy size={16} /> <span>Duplicate Lead</span>
        </button>
        <div className="dropdown-divider"></div>
        <button className="dropdown-item danger" onClick={() => { bulkActions.onDeleteSelected(); actionsDropdown.close(); }}>
          <Trash2 size={16} /> <span>Delete Selected</span>
        </button>
      </Dropdown>

      <button className="btn btn-primary" onClick={onAddLead}>
        <Plus size={16} /> Add Lead
      </button>
    </>
  );
};

export default EnquiriesToolbarActions;
