import React from 'react';
import { MoreHorizontal, ChevronDown, Download, RotateCcw, Users, Send, Copy, Trash2 } from 'lucide-react';

interface ActionsDropdownProps {
  showDropdown: boolean;
  dropdownClosing: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onOpen: () => void;
  onClose: () => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  showDropdown, dropdownClosing, dropdownRef, onOpen, onClose,
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
        <MoreHorizontal size={16} /> Actions <ChevronDown size={14} className={showDropdown ? 'rotate' : ''} />
      </button>
      {showDropdown && (
        <div className={`premium-dropdown actions-dropdown ${dropdownClosing ? 'closing' : ''}`}>
          <div className="dropdown-header">Actions</div>
          <button className="dropdown-item" onClick={() => { alert('Exporting selected leads...'); onClose(); }}>
            <Download size={16} /> <span>Export Selected</span>
          </button>
          <button className="dropdown-item" onClick={() => { alert('Changing status...'); onClose(); }}>
            <RotateCcw size={16} /> <span>Change Status</span>
          </button>
          <button className="dropdown-item" onClick={() => { alert('Assigning staff...'); onClose(); }}>
            <Users size={16} /> <span>Assign Staff</span>
          </button>
          <button className="dropdown-item" onClick={() => { alert('Sending follow up...'); onClose(); }}>
            <Send size={16} /> <span>Send Follow Up</span>
          </button>
          <button className="dropdown-item" onClick={() => { alert('Duplicating lead...'); onClose(); }}>
            <Copy size={16} /> <span>Duplicate Lead</span>
          </button>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item danger" onClick={() => { alert('Deleting selected leads...'); onClose(); }}>
            <Trash2 size={16} /> <span>Delete Selected</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdown;
