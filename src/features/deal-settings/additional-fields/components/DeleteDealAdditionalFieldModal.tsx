import React from 'react';
import { X } from 'lucide-react';
import type { DeleteDealAdditionalFieldModalProps } from '../types/delete-deal-additional-field-modal.types';

const DeleteDealAdditionalFieldModal: React.FC<DeleteDealAdditionalFieldModalProps> = ({
  deletingItem, onConfirm, onClose,
}) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h5>Confirm Delete</h5>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete <strong>{deletingItem.field}</strong>?</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);

export default DeleteDealAdditionalFieldModal;
