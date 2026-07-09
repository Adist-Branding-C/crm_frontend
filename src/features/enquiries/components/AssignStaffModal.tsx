import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { staffService } from '../../deal/services/staff.service';
import type { AssignStaffModalProps } from '../types/modal.types';
import type { LabelValuePair } from '../../../shared/types/common';

const AssignStaffModal: React.FC<AssignStaffModalProps> = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedStaffId('');
      return;
    }
    setStaffLoading(true);
    staffService.getStaff()
      .then((res) => {
        const raw = res?.data;
        const items = Array.isArray(raw) ? raw : raw?.items ?? [];
        setStaffOptions(items.map((s: { staff_id?: string; id?: string; name: string }) => ({
          value: s.staff_id ?? s.id ?? '',
          label: s.name,
        })));
      })
      .catch(() => setStaffOptions([]))
      .finally(() => setStaffLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => { if (!isProcessing) onClose(); }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>Assign Staff</h5>
          <button className="modal-close" onClick={onClose} disabled={isProcessing}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Assign staff to <strong>{selectedCount}</strong> selected lead(s)
          </p>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Staff Member</label>
            <select value={selectedStaffId} onChange={(e) => setSelectedStaffId(e.target.value)} disabled={staffLoading || isProcessing}>
              <option value="">Select staff</option>
              {staffLoading ? (
                <option value="" disabled>Loading...</option>
              ) : (
                staffOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)
              )}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={() => onConfirm(selectedStaffId)} disabled={!selectedStaffId || isProcessing}>
            {isProcessing ? <><Loader2 size={16} className="spin" /> Assigning...</> : 'Assign Staff'}
          </button>
          <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AssignStaffModal;
