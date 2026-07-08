import { ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import type { DeleteCampaignDialogProps } from '../types';

const DeleteCampaignDialog = ({ itemName, onConfirm, onCancel }: DeleteCampaignDialogProps) => (
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

export default DeleteCampaignDialog;
