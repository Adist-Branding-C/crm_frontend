import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import Modal from '../../../shared/components/Modal';
import type { ChangeStatusModalProps } from '../types/modal.types';
import type { LabelValuePair } from '../../../shared/types/common';

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>([]);
  const [statusesLoading, setStatusesLoading] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedStatusId('');
      return;
    }
    setStatusesLoading(true);
    leadStatusService.getLeadStatuses(1, 100)
      .then((res) => {
        const items = res?.data?.items ?? [];
        setStatusOptions(items.map((s: { statusId: string; status: string }) => ({ value: s.statusId, label: s.status })));
      })
      .catch(() => setStatusOptions([]))
      .finally(() => setStatusesLoading(false));
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => { if (!isProcessing) onClose(); }} title="Change Status">
      <div className="modal-body">
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Update status for <strong>{selectedCount}</strong> selected lead(s)
        </p>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>New Status</label>
          <select value={selectedStatusId} onChange={(e) => setSelectedStatusId(e.target.value)} disabled={statusesLoading || isProcessing}>
            <option value="">Select status</option>
            {statusesLoading ? (
              <option value="" disabled>Loading...</option>
            ) : (
              statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)
            )}
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={() => onConfirm(selectedStatusId)} disabled={!selectedStatusId || isProcessing}>
          {isProcessing ? <><Loader2 size={16} className="spin" /> Updating...</> : 'Update Status'}
        </button>
        <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>Cancel</button>
      </div>
    </Modal>
  );
};

export default ChangeStatusModal;
