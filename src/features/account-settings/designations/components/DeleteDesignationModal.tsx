import { X } from 'lucide-react';
import type { DeleteDesignationModalProps } from '../types/delete-designation-modal.types';

const DeleteDesignationModal = ({ isOpen, itemName, onConfirm, onClose }: DeleteDesignationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        <div className="modal-header">
          <h5>Confirm Delete</h5>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p className="delete-warning">
            Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer flex flex-col sm:flex-row sm:justify-end gap-3">
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDesignationModal;
