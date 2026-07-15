import React, { useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2, Phone, MessageSquare } from 'lucide-react';
import ActionMenuPortal from '../../../shared/components/ActionMenuPortal';
import { DEAL_STATUS_LABEL_MAP, DEAL_TYPE_LABEL_MAP } from '../../../shared/constants/dealOptions';
import type { DealRowProps } from '../types/component.types';

const getStatusBadge = (status: string) => {
  const colorMap: Record<string, string> = { win: '#10b981', lost: '#ef4444', pending: '#f59e0b', invoice: '#3b82f6' };
  const color = colorMap[status.toLowerCase()] || '#6b7280';
  const label = DEAL_STATUS_LABEL_MAP[status] || status;
  return <span className="status-pill" style={{ background: `${color}20`, color }}>{label}</span>;
};

const getTypeBadge = (type: string) => {
  const colorMap: Record<string, string> = { sales: '#10b981', registration: '#8b5cf6', renewal: '#3b82f6', upsell: '#fb923c' };
  const color = colorMap[type.toLowerCase()] || '#6b7280';
  const label = DEAL_TYPE_LABEL_MAP[type] || type;
  return <span className="type-pill" style={{ background: `${color}20`, color }}>{label}</span>;
};

const DealRow: React.FC<DealRowProps> = ({
  deal,
  additionalFieldColumns,
  actionMenu,
  onEditDeal,
  onDeleteDeal,
  onWhatsApp,
  onMessage,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <tr>
      <td className="action-cell">
        <button
          ref={buttonRef}
          className="action-btn"
          type="button"
          onClick={() => {
            if (actionMenu.isOpen) {
              actionMenu.onClose();
            } else {
              const rect = buttonRef.current?.getBoundingClientRect();
              if (rect) actionMenu.onOpen(deal.id, rect);
            }
          }}
        >
          <MoreHorizontal size={16} />
        </button>
        <ActionMenuPortal isOpen={actionMenu.isOpen} triggerRef={buttonRef} onClose={actionMenu.onClose}>
          <div className="deal-action-dropdown">
            <button type="button" onClick={() => { onEditDeal(deal); actionMenu.onClose(); }}>
              <Edit2 size={14} /> Edit Deal
            </button>
            <button type="button" onClick={() => { onWhatsApp(deal); actionMenu.onClose(); }}>
              <Phone size={14} /> WhatsApp
            </button>
            <button type="button" onClick={() => { onMessage(deal); actionMenu.onClose(); }}>
              <MessageSquare size={14} /> Message
            </button>
            <button type="button" className="delete" onClick={() => { onDeleteDeal(deal); actionMenu.onClose(); }}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </ActionMenuPortal>
      </td>
      <td className="lead-name-cell">{deal.dealName}</td>
      <td>{deal.lead}</td>
      <td>{deal.mobile || ''}</td>
      <td>{Number(deal.amount).toLocaleString()}</td>
      <td>{getStatusBadge(deal.status || '')}</td>
      <td>{getTypeBadge(deal.type || '')}</td>
      <td>{deal.startDate}</td>
      <td>{deal.endDate}</td>
      <td>{deal.agent}</td>
      <td>{deal.createdBy}</td>
      <td>{deal.createdAt}</td>
      {additionalFieldColumns.map(name => (
        <td key={name}>{deal.additionalFields?.find(af => af.name === name)?.value ?? ''}</td>
      ))}
    </tr>
  );
};

export default React.memo(DealRow);
