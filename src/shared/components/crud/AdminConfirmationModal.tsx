import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { ACTION_CONFIRM, ACTION_CANCEL } from '../../constants/actionLabels';
import type { AdminConfirmationModalProps } from '../../types/crud';

const AdminConfirmationModal: React.FC<AdminConfirmationModalProps> = React.memo(({
  isOpen, title, message, confirmText, cancelText, confirmButtonVariant, isLoading, onConfirm, onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{title}</h5>
          <button className="modal-close" onClick={onCancel}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className={`btn btn-${confirmButtonVariant ?? 'primary'}`} onClick={onConfirm} disabled={isLoading}>
            {isLoading ? <><Loader2 size={16} className="spin" /> {confirmText ?? ACTION_CONFIRM}...</> : (confirmText ?? ACTION_CONFIRM)}
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>{cancelText ?? ACTION_CANCEL}</button>
        </div>
      </div>
    </div>
  );
});

AdminConfirmationModal.displayName = 'AdminConfirmationModal';
export default AdminConfirmationModal;
