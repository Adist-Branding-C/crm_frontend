import React from 'react';
import { X, Loader2 } from 'lucide-react';
import type { DeleteSelectedModalProps } from '../types/modal.types';

const DeleteSelectedModal: React.FC<DeleteSelectedModalProps> = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => { if (!isProcessing) onClose(); }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>Delete Selected Leads</h5>
          <button className="modal-close" onClick={onClose} disabled={isProcessing}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Are you sure you want to delete <strong>{selectedCount}</strong> selected lead(s)? This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onConfirm} disabled={isProcessing}>
            {isProcessing ? <><Loader2 size={16} className="spin" /> Deleting...</> : 'Delete Selected'}
          </button>
          <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSelectedModal;
