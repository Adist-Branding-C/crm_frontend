import React from 'react';
import { X } from 'lucide-react';
import { ACTION_CONFIRM, ACTION_CANCEL } from '../../constants/actionLabels';
import { LABEL_CONFIRM_DELETE } from '../../constants/labels';
import type { AdminDeleteModalProps } from '../../types/crud';

const AdminDeleteModal: React.FC<AdminDeleteModalProps> = React.memo(({ isOpen, itemName, itemType, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{LABEL_CONFIRM_DELETE}</h5>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <p className="delete-warning">
            {itemName ? (
              <>Are you sure you want to delete <strong>{itemName}</strong>{itemType ? ` ${itemType}` : ''}?</>
            ) : (
              <>Are you sure you want to delete this{itemType ? ` ${itemType}` : ''}?</>
            )}
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onConfirm}>{ACTION_CONFIRM}</button>
          <button className="btn btn-secondary" onClick={onClose}>{ACTION_CANCEL}</button>
        </div>
      </div>
    </div>
  );
});

AdminDeleteModal.displayName = 'AdminDeleteModal';
export default AdminDeleteModal;
