import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { MoreHorizontal, DollarSign, Calendar } from 'lucide-react';
import { formatDate } from '../../../shared/utils/dateUtils';
import { hashStringToColor } from '../utils/pipelineColor.util';
import type { DealCardProps } from '../types';

const PRIORITY_COLOR: Record<string, string> = {
  High: 'var(--danger-text)',
  Medium: 'var(--warning-text)',
  Low: 'var(--text-tertiary)',
};

const DealCard: React.FC<DealCardProps> = ({ deal, statusId, probability }) => {
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
      {deal.priority && (
        <span
          className="deal-priority-badge"
          style={{ color: PRIORITY_COLOR[deal.priority] ?? 'var(--text-tertiary)' }}
        >
          {deal.priority}
        </span>
      )}
      <div className="deal-value">
        <DollarSign size={14} />
        {Number(deal.amount).toLocaleString()}
      </div>
      <div className="deal-footer">
        <div className="deal-contact">
          <div
            className="contact-avatar"
            style={{ background: hashStringToColor(deal.agent || 'Unassigned') }}
          >
            {(deal.agent || 'U').charAt(0)}
          </div>
          <span>{deal.agent || 'Unassigned'}</span>
        </div>
        {typeof probability === 'number' && (
          <div
            className="deal-probability"
            style={{
              color:
                probability === 100
                  ? 'var(--success)'
                  : probability === 0
                    ? 'var(--danger)'
                    : 'var(--text-tertiary)',
            }}
          >
            {probability}%
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
