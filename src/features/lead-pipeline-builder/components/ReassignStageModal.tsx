import { useState } from 'react';
import Modal from '../../../shared/components/Modal';
import type { LeadStageItem } from '../types/interface';

interface ReassignStageModalProps {
  isOpen: boolean;
  stage: LeadStageItem | null;
  leadCount: number;
  otherStages: LeadStageItem[];
  onConfirm: (reassignToStatusId: string) => void;
  onClose: () => void;
}

/**
 * Confirmation shown when deleting a Stage that still has leads on it - an
 * admin must pick another stage in the same pipeline to move those leads to
 * before the delete is retried.
 *
 * Used by:
 * - LeadPipelineCanvasPage
 */
function ReassignStageModal({ isOpen, stage, leadCount, otherStages, onConfirm, onClose }: ReassignStageModalProps) {
  const [targetId, setTargetId] = useState('');

  if (!isOpen || !stage) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Move leads before deleting this stage">
      <div style={{ padding: 'var(--space-4)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
          <strong>{stage.status}</strong> has {leadCount} lead{leadCount === 1 ? '' : 's'} on it. Choose a stage to
          move {leadCount === 1 ? 'it' : 'them'} to before deleting.
        </p>
        <div className="form-group">
          <label>Move leads to</label>
          <select className="form-control" value={targetId} onChange={(e) => setTargetId(e.target.value)}>
            <option value="">Select a stage</option>
            {otherStages.map((s) => (
              <option key={s.id} value={s.id}>{s.status}</option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!targetId}
            onClick={() => onConfirm(targetId)}
          >
            Move leads and delete
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default ReassignStageModal;
