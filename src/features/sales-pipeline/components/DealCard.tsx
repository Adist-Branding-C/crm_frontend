import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { MoreHorizontal, DollarSign, Calendar } from 'lucide-react';
import { formatDate } from '../../../shared/utils/dateUtils';
import { hashStringToColor } from '../utils/pipelineColor.util';
import type { DealCardProps } from '../types';

const DealCard: React.FC<DealCardProps> = ({ deal, statusId }) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: `deal-${deal.id}`,
    data: { type: 'deal', deal, statusId },
  });

  return (
    <div
      ref={setNodeRef}
      className={`deal-card${isDragging ? ' deal-card--dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      {deal.company && (
        <div className="deal-header">
          <span className="deal-company">{deal.company}</span>
          <MoreHorizontal size={16} className="deal-menu" />
        </div>
      )}
      <div className="deal-title">{deal.dealName}</div>
      <div className="deal-value">
        <DollarSign size={14} />
        {deal.amount.toLocaleString()}
      </div>
      <div className="deal-footer">
        <div className="deal-contact">
          <div
            className="contact-avatar"
            style={{ background: hashStringToColor(deal.agent) }}
          >
            {deal.agent.charAt(0)}
          </div>
          <span>{deal.agent}</span>
        </div>
        {typeof deal.probability === 'number' && (
          <div
            className="deal-probability"
            style={{
              color:
                deal.probability === 100
                  ? '#10b981'
                  : deal.probability === 0
                    ? '#ef4444'
                    : '#6b7280',
            }}
          >
            {deal.probability}%
          </div>
        )}
      </div>
      <div className="deal-due">
        <Calendar size={12} />
        <span>{deal.endDate ? formatDate(deal.endDate) : 'No due date'}</span>
      </div>
    </div>
  );
};

export default DealCard;
