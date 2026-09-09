import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '../../../shared/components/Modal';
import { useDealFormOptions } from '../hooks/useDealFormOptions';

export interface BulkReassignOwnerModalProps {
  isOpen: boolean;
  selectedCount: number;
  isProcessing: boolean;
  onConfirm: (agentId: string) => void;
  onClose: () => void;
}

/**
 * Bulk owner-reassignment modal for the Deals table's "Actions" toolbar.
 *
 * Used by:
 * - DealPage (composed alongside DealBulkActionsDropdown)
 */
const BulkReassignOwnerModal: React.FC<BulkReassignOwnerModalProps> = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
  const { staff, isLoadingStaff } = useDealFormOptions();
  const [selectedAgentId, setSelectedAgentId] = useState('');

  React.useEffect(() => {
    if (!isOpen) setSelectedAgentId('');
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => { if (!isProcessing) onClose(); }} title="Reassign Owner">
      <div className="modal-body">
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Reassign <strong>{selectedCount}</strong> selected deal(s) to a new owner
        </p>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Deal Owner</label>
          <select value={selectedAgentId} onChange={(e) => setSelectedAgentId(e.target.value)} disabled={isLoadingStaff || isProcessing}>
            <option value="">Select staff</option>
            {isLoadingStaff ? (
              <option value="" disabled>Loading...</option>
            ) : (
              staff.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)
            )}
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={() => onConfirm(selectedAgentId)} disabled={!selectedAgentId || isProcessing}>
          {isProcessing ? <><Loader2 size={16} className="spin" /> Reassigning...</> : 'Reassign Owner'}
        </button>
        <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>Cancel</button>
      </div>
    </Modal>
  );
};

export default BulkReassignOwnerModal;
