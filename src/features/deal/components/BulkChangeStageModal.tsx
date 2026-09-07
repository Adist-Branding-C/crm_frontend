import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '../../../shared/components/Modal';
import { useDealFormOptions } from '../hooks/useDealFormOptions';
import { DEAL_LOST_REASON_OPTIONS } from '../constants/dealLostReasons';

export interface BulkChangeStageModalProps {
  isOpen: boolean;
  selectedCount: number;
  isProcessing: boolean;
  onConfirm: (stageId: string, lostReason?: string) => void;
  onClose: () => void;
}

/**
 * Bulk stage-change modal for the Deals table's "Actions" toolbar. Offers
 * every company stage (labelled with its pipeline) rather than one
 * pipeline's stages only - a selection can span pipelines, and the backend
 * validates each deal against its own pipeline individually, reporting any
 * mismatches back as per-deal failures rather than rejecting the whole batch.
 *
 * Used by:
 * - DealPage (composed alongside DealBulkActionsDropdown)
 */
const BulkChangeStageModal: React.FC<BulkChangeStageModalProps> = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
  const { statuses, pipelines, isLoadingStatuses } = useDealFormOptions();
  const [selectedStageId, setSelectedStageId] = useState('');
  const [lostReason, setLostReason] = useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setSelectedStageId('');
      setLostReason('');
    }
  }, [isOpen]);

  const selectedStageIsLost = statuses.find((s) => s.value === selectedStageId)?.outcome === 'LOST';

  const pipelineName = (pipelineId: number) => pipelines.find((p) => Number(p.id) === pipelineId)?.name ?? '';

  return (
    <Modal isOpen={isOpen} onClose={() => { if (!isProcessing) onClose(); }} title="Change Stage">
      <div className="modal-body">
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Move <strong>{selectedCount}</strong> selected deal(s) to a new stage
        </p>
        <div className="form-group">
          <label>New Stage</label>
          <select value={selectedStageId} onChange={(e) => setSelectedStageId(e.target.value)} disabled={isLoadingStatuses || isProcessing}>
            <option value="">Select stage</option>
            {isLoadingStatuses ? (
              <option value="" disabled>Loading...</option>
            ) : (
              statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label} ({pipelineName(s.pipelineId)})
                </option>
              ))
            )}
          </select>
        </div>
        {selectedStageIsLost && (
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Lost Reason</label>
            <select value={lostReason} onChange={(e) => setLostReason(e.target.value)} disabled={isProcessing}>
              <option value="">Select a reason</option>
              {DEAL_LOST_REASON_OPTIONS.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          onClick={() => onConfirm(selectedStageId, lostReason || undefined)}
          disabled={!selectedStageId || (selectedStageIsLost && !lostReason) || isProcessing}
        >
          {isProcessing ? <><Loader2 size={16} className="spin" /> Updating...</> : 'Change Stage'}
        </button>
        <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>Cancel</button>
      </div>
    </Modal>
  );
};

export default BulkChangeStageModal;
