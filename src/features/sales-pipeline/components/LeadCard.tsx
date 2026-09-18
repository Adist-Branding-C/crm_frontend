import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Phone, Calendar, Loader2 } from 'lucide-react';
import { formatDate } from '../../../shared/utils/dateUtils';
import { hashStringToColor } from '../utils/pipelineColor.util';
import type { LeadCardProps } from '../types';

const LeadCard: React.FC<LeadCardProps> = ({ lead, fromStatusId, onLeadClick, isOpening }) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: `lead-${lead.id}`,
    data: { type: 'lead', lead, fromStatusId },
  });

  const handleClick = () => {
    if (isDragging || !onLeadClick) return;
    onLeadClick(lead);
  };

  return (
    <div
      ref={setNodeRef}
      className={`deal-card${isDragging ? ' deal-card--dragging' : ''}${onLeadClick ? ' deal-card--clickable' : ''}`}
      {...attributes}
      {...listeners}
      onClick={handleClick}
    >
      {isOpening && (
        <div className="deal-card__opening"><Loader2 size={14} className="spin" /></div>
      )}
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
        <div className="deal-probability" style={{ color: 'var(--text-tertiary)' }}>
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
