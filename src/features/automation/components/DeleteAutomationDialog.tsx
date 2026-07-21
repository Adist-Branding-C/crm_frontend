import { ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import type { DeleteAutomationDialogProps } from '../types';

const DeleteAutomationDialog = ({ itemName, onConfirm, onCancel }: DeleteAutomationDialogProps) => (
  <>
    <div className="modal-body">
      <p className="delete-warning">
        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
      </p>
    </div>
    <div className="modal-footer">
      <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
      <button className="btn btn-secondary" onClick={onCancel}>{ACTION_CANCEL}</button>
    </div>
  </>
);

export default DeleteAutomationDialog;
