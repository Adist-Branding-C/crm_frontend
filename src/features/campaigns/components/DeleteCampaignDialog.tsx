import { Loader2 } from 'lucide-react';
import { ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import type { DeleteCampaignDialogProps } from '../types';

const DeleteCampaignDialog = ({ itemName, onConfirm, onCancel, isDeleting, error }: DeleteCampaignDialogProps) => (
  <>
    <div className="modal-body">
      {error && <ErrorMessage message={error} />}
      <p className="delete-warning">
        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
      </p>
    </div>
    <div className="modal-footer">
      <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
        {isDeleting ? <Loader2 size={16} className="spin" /> : 'Delete'}
      </button>
      <button className="btn btn-secondary" onClick={onCancel} disabled={isDeleting}>{ACTION_CANCEL}</button>
    </div>
  </>
);

export default DeleteCampaignDialog;
