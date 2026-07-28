import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { campaignApiService } from '../../campaigns/services';
import { CAMPAIGN_TYPES } from '../../campaigns/constants';
import Modal from '../../../shared/components/Modal';
import type { AssignCampaignModalProps } from '../types/modal.types';
import type { LabelValuePair } from '../../../shared/types/common';

const AssignCampaignModal: React.FC<AssignCampaignModalProps> = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
  const [campaignOptions, setCampaignOptions] = useState<LabelValuePair[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedCampaignId('');
      return;
    }
    setCampaignsLoading(true);
    campaignApiService.getAll({ pageNumber: 1, limit: 100, type: CAMPAIGN_TYPES.LEAD_CAMPAIGN })
      .then((res) => {
        const items = res.data?.items ?? [];
        setCampaignOptions(items.map((c) => ({ value: String(c.id), label: c.name })));
      })
      .catch(() => setCampaignOptions([]))
      .finally(() => setCampaignsLoading(false));
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => { if (!isProcessing) onClose(); }} title="Assign Campaign">
      <div className="modal-body">
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Assign <strong>{selectedCount}</strong> selected lead(s) to a campaign
        </p>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Campaign</label>
          <select value={selectedCampaignId} onChange={(e) => setSelectedCampaignId(e.target.value)} disabled={campaignsLoading || isProcessing}>
            <option value="">Select campaign</option>
            {campaignsLoading ? (
              <option value="" disabled>Loading...</option>
            ) : campaignOptions.length === 0 ? (
              <option value="" disabled>No Lead Campaigns available</option>
            ) : (
              campaignOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)
            )}
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={() => onConfirm(selectedCampaignId)} disabled={!selectedCampaignId || isProcessing}>
          {isProcessing ? <><Loader2 size={16} className="spin" /> Assigning...</> : 'Add to Campaign'}
        </button>
        <button className="btn btn-secondary" onClick={onClose} disabled={isProcessing}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AssignCampaignModal;
