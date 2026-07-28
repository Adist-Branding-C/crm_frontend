import React from 'react';
import { X } from 'lucide-react';
import { ACTION_CONFIRM, ACTION_CANCEL } from '../../constants/actionLabels';
import { LABEL_CONFIRM_DELETE } from '../../constants/labels';
import type { AdminDeleteModalProps } from '../../types/crud';
import ValidationAlert from '../ValidationAlert';

const AdminDeleteModal: React.FC<AdminDeleteModalProps> = React.memo(({ isOpen, itemName, itemType, error, onConfirm, onClose, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{LABEL_CONFIRM_DELETE}</h5>
          <button type="button" className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <ValidationAlert message={error || null} />
          <p className="delete-warning">
            {itemName ? (
              <>Are you sure you want to delete <strong>{itemName}</strong>{itemType ? ` ${itemType}` : ''}?</>
            ) : (
              <>Are you sure you want to delete this{itemType ? ` ${itemType}` : ''}?</>
            )}
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : ACTION_CONFIRM}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>
            {ACTION_CANCEL}
          </button>
        </div>
      </div>
    </div>
  );
});

AdminDeleteModal.displayName = 'AdminDeleteModal';
export default AdminDeleteModal;
