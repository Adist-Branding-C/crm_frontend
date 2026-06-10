import React from 'react';
import { MoreHorizontal, DollarSign, Calendar } from 'lucide-react';
import type { DealCardProps } from '../types/pipeline.types';

const DealCard: React.FC<DealCardProps> = ({ deal, onDragStart, getAvatarColor }) => {
  return (
    <div
      className="deal-card"
      draggable
      onDragStart={(e) => onDragStart(e, deal)}
    >
      {/* TODO: waiting for backend companyName field */}
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
          <div className="contact-avatar" style={{ background: getAvatarColor(deal.agent) }}>
            {deal.agent.charAt(0)}
          </div>
          <span>{deal.agent}</span>
        </div>
        {/* TODO: waiting for backend probability field */}
        {typeof deal.probability === 'number' && (
          <div className="deal-probability" style={{ color: deal.probability === 100 ? '#10b981' : deal.probability === 0 ? '#ef4444' : '#6b7280' }}>
            {deal.probability}%
          </div>
        )}
      </div>
      <div className="deal-due">
        <Calendar size={12} />
        <span>{deal.endDate}</span>
      </div>
    </div>
  );
};

export default DealCard;
