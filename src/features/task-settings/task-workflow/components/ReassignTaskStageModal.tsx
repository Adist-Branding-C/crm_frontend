import { useState, useEffect } from 'react';
import Modal from '../../../../shared/components/Modal';
import type { TaskWorkflowStage } from '../types/interface';

interface ReassignTaskStageModalProps {
  isOpen: boolean;
  stage: TaskWorkflowStage | null;
  taskCount: number;
  otherStages: TaskWorkflowStage[];
  onConfirm: (reassignToStageId: number) => void;
  onClose: () => void;
}

/**
 * Confirmation shown when deleting a workflow stage that still has tasks on
 * it - an admin must pick another stage in the same workflow to move those
 * tasks to before the delete is retried with reassignToStageId (mirrors the
 * ReassignStageModal used by deal pipelines).
 *
 * Used by:
 * - TaskWorkflowDetailPage
 * - TaskWorkflowCanvasPage
 */
function ReassignTaskStageModal({ isOpen, stage, taskCount, otherStages, onConfirm, onClose }: ReassignTaskStageModalProps) {
  const [targetId, setTargetId] = useState<string>('');

  useEffect(() => {
    if (!isOpen) setTargetId('');
  }, [isOpen]);

  if (!isOpen || !stage) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Move tasks before deleting this stage">
      <div style={{ padding: 'var(--space-4)' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
          <strong>{stage.name}</strong> has {taskCount} task{taskCount === 1 ? '' : 's'} assigned to it.
          Choose another stage to move {taskCount === 1 ? 'it' : 'them'} to before deleting.
        </p>
        <div className="form-group">
          <label>Move tasks to</label>
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
            Move tasks and delete
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default ReassignTaskStageModal;