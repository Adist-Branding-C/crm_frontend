import { X } from 'lucide-react';

const DeleteConfirmModal = ({ deletingStaff, deleteConfirmText, onDeleteConfirmTextChange, onConfirmDelete, onClose }) => {
  if (!deletingStaff) return null;

  const expectedText = 'Delete the staff ' + deletingStaff.name;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>Confirm Delete</h5>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p className="delete-warning">
            Are you sure you want to delete <strong>{deletingStaff.name}</strong>? This action cannot be undone.
          </p>
          <div className="delete-confirm-input">
            <label>Type <strong>Delete the staff {deletingStaff.name}</strong> to confirm:</label>
            <input type="text" className="form-control" placeholder="Type the confirmation text"
              value={deleteConfirmText} onChange={(e) => onDeleteConfirmTextChange(e.target.value)} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" disabled={deleteConfirmText !== expectedText} onClick={onConfirmDelete}>
            Delete Staff
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
