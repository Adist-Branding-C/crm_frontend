import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Phone, Calendar } from 'lucide-react';
import { formatDate } from '../../../shared/utils/dateUtils';
import { hashStringToColor } from '../utils/pipelineColor.util';
import type { LeadCardProps } from '../types';

const LeadCard: React.FC<LeadCardProps> = ({ lead, fromStatusId }) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: `lead-${lead.id}`,
    data: { type: 'lead', lead, fromStatusId },
  });

  return (
    <div
      ref={setNodeRef}
      className={`deal-card${isDragging ? ' deal-card--dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
<div className="deal-title">{lead.name}</div>
      <div className="deal-value">
        <Phone size={14} />
        {lead.countryCode ? `${lead.countryCode} ${lead.phone}` : lead.phone}
      </div>
      <div className="deal-footer">
        <div className="deal-contact">
          <div
            className="contact-avatar"
            style={{ background: hashStringToColor(lead.name || 'Unknown') }}
          >
            {(lead.name || 'U').charAt(0)}
          </div>
          <span>{lead.email}</span>
        </div>
        <div className="deal-probability" style={{ color: '#6b7280' }}>
          {typeof lead.source === 'object' && lead.source !== null
            ? (lead.source as any).source
            : lead.source}
        </div>
      </div>
      <div className="deal-due">
        <Calendar size={12} />
        <span>Added {formatDate(lead.createdAt)}</span>
      </div>
    </div>
  );
};

export default LeadCard;
