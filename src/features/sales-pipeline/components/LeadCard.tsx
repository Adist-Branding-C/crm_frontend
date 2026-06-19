import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import type { LeadCardProps } from '../types/pipeline.types';

const LeadCard: React.FC<LeadCardProps> = ({ lead, getAvatarColor }) => {
  return (
    <div className="deal-card">
      <div className="deal-title">{lead.name}</div>
      <div className="deal-value">
        <Phone size={14} />
        {lead.phone}
      </div>
      <div className="deal-footer">
        <div className="deal-contact">
          <div className="contact-avatar" style={{ background: getAvatarColor(lead.name) }}>
            {lead.name.charAt(0)}
          </div>
          <span>{lead.email}</span>
        </div>
        <div className="deal-probability" style={{ color: '#6b7280' }}>
          {lead.source}
        </div>
      </div>
      <div className="deal-due">
        <Calendar size={12} />
        <span>{lead.createdAt}</span>
      </div>
    </div>
  );
};

export default LeadCard;
