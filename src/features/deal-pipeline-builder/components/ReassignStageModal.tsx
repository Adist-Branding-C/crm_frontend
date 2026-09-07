import { useState } from 'react';
import Modal from '../../../shared/components/Modal';
import type { DealStageItem } from '../types/interface';

interface ReassignStageModalProps {
  isOpen: boolean;
  stage: DealStageItem | null;
  dealCount: number;
  otherStages: DealStageItem[];
  onConfirm: (reassignToStageId: number) => void;
  onClose: () => void;
}

/**
 * Confirmation shown when deleting a Stage that still has deals on it - an
 * admin must pick another stage in the same pipeline to move those deals to
 * before the delete is retried.
 *
 * Used by:
 * - DealPipelineCanvasPage
 */
function ReassignStageModal({ isOpen, stage, dealCount, otherStages, onConfirm, onClose }: ReassignStageModalProps) {
  const [targetId, setTargetId] = useState<string>('');

  if (!isOpen || !stage) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Move deals before deleting this stage">
      <div style={{ padding: 'var(--space-4)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
          <strong>{stage.name}</strong> has {dealCount} deal{dealCount === 1 ? '' : 's'} on it. Choose a stage to
          move {dealCount === 1 ? 'it' : 'them'} to before deleting.
        </p>
        <div className="form-group">
          <label>Move deals to</label>
          <select className="form-control" value={targetId} onChange={(e) => setTargetId(e.target.value)}>
            <option value="">Select a stage</option>
            {otherStages.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!targetId}
            onClick={() => onConfirm(Number(targetId))}
          >
            Move deals and delete
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default ReassignStageModal;
