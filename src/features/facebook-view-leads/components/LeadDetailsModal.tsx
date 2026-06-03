import React from 'react';
import { X } from 'lucide-react';
import type { FacebookLead, LeadDetailsModalProps } from '../types';

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
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{lead.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{lead.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{lead.additionalData.email || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">City</span>
            <span className="detail-value">{lead.additionalData.city || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Course</span>
            <span className="detail-value">{lead.additionalData.course || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Campaign</span>
            <span className="detail-value">{lead.additionalData.campaign || '-'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">UTM Source</span>
            <span className="detail-value">-</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Raw JSON</span>
            <pre className="detail-json">{JSON.stringify(lead.additionalData, null, 2)}</pre>
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
