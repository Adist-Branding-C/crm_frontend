import React from 'react';
import { X } from 'lucide-react';
import type { LeadDetailsModalProps } from '../types';

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ isOpen, lead, onClose }) => {
  if (!isOpen || !lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content details-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Lead Details</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="detail-row">
            <span className="detail-label">Facebook Lead ID</span>
            <span className="detail-value">{lead.leadgenId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Workflow</span>
            <span className="detail-value">{lead.workflowName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span className="detail-value">{lead.status}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">CRM Lead</span>
            <span className="detail-value">{lead.leadId || '-'}</span>
          </div>
          {lead.errorMessage && (
            <div className="detail-row">
              <span className="detail-label">Error</span>
              <span className="detail-value">{lead.errorMessage}</span>
            </div>
          )}
          {lead.rawFieldData && Object.entries(lead.rawFieldData).map(([key, value]) => (
            <div className="detail-row" key={key}>
              <span className="detail-label">{key}</span>
              <span className="detail-value">{value}</span>
            </div>
          ))}
          <div className="detail-row">
            <span className="detail-label">Raw JSON</span>
            <pre className="detail-json">{JSON.stringify(lead.rawFieldData, null, 2)}</pre>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
