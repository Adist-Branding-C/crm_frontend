import React, { useRef, useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, Phone, MessageSquare } from 'lucide-react';
import ActionMenuPortal from '../../../shared/components/ActionMenuPortal';
import WhatsappTemplatePickerOverlay from '../../../shared/components/WhatsappTemplatePickerOverlay';
import CellEditPopover from '../../../shared/components/CellEditPopover';
import { DEAL_STATUS_LABEL_MAP, DEAL_TYPE_LABEL_MAP } from '../../../shared/constants/dealOptions';
import { substituteTemplateVariables } from '../../../shared/utils/whatsappMessage.util';
import type { DealRowProps } from '../types/component.types';
import type { WhatsappTemplateItem } from '../../account-settings/whatsapp-template/types/whatsapp-template.types';

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

type EditableField = 'agent' | 'startDate' | 'endDate';

const DealRow: React.FC<DealRowProps> = ({
  deal,
  additionalFieldColumns,
  actionMenu,
  onEditDeal,
  onDeleteDeal,
  onSendWhatsapp,
  onMessage,
  hasWhatsappTemplates,
  whatsappTemplatesLoading,
  whatsappTemplatesError,
  staffOptions,
  onFieldSave,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showWhatsappTemplatePicker, setShowWhatsappTemplatePicker] = useState(false);
  const [editingField, setEditingField] = useState<{ field: EditableField; rect: DOMRect } | null>(null);

  const emptyCell = (field: EditableField) => (
    <span
      className="lead-cell-empty"
      onClick={(e) => setEditingField({ field, rect: e.currentTarget.getBoundingClientRect() })}
    >
      None
    </span>
  );

  const handleWhatsappClick = () => {
    actionMenu.onClose();
    // Fail-open: no templates loaded/available/errored -> today's plain send.
    if (whatsappTemplatesError || (!whatsappTemplatesLoading && !hasWhatsappTemplates)) {
      onSendWhatsapp(deal);
      return;
    }
    setShowWhatsappTemplatePicker(true);
  };

  const handleSelectWhatsappTemplate = (template: WhatsappTemplateItem) => {
    const message = substituteTemplateVariables(template.message || template.content || '', {
      name: deal.lead,
    });
    onSendWhatsapp(deal, message);
  };

  return (
    <>
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
            <button type="button" onClick={handleWhatsappClick}>
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
        {showWhatsappTemplatePicker && (
          <WhatsappTemplatePickerOverlay
            onClose={() => setShowWhatsappTemplatePicker(false)}
            onSelectTemplate={handleSelectWhatsappTemplate}
            onSendWithoutTemplate={() => onSendWhatsapp(deal)}
          />
        )}
      </td>
      <td className="lead-name-cell">{deal.dealName}</td>
      <td>{deal.lead}</td>
      <td>{deal.mobile || ''}</td>
      <td>{Number(deal.amount).toLocaleString()}</td>
      <td>{getStatusBadge(deal.status || '')}</td>
      <td>{getTypeBadge(deal.type || '')}</td>
      <td>{deal.startDate || emptyCell('startDate')}</td>
      <td>{deal.endDate || emptyCell('endDate')}</td>
      <td>{deal.agent || emptyCell('agent')}</td>
      <td>{deal.createdBy}</td>
      <td>{deal.createdAt}</td>
      {additionalFieldColumns.map(name => (
        <td key={name}>{deal.additionalFields?.find(af => af.name === name)?.value ?? ''}</td>
      ))}
    </tr>

    {editingField?.field === 'agent' && (
      <CellEditPopover
        anchorRect={editingField.rect}
        label="Assigned To"
        type="select"
        options={staffOptions}
        onSave={(value) => onFieldSave(String(deal.id), { agentId: value })}
        onClose={() => setEditingField(null)}
      />
    )}
    {editingField?.field === 'startDate' && (
      <CellEditPopover
        anchorRect={editingField.rect}
        label="Start Date"
        type="date"
        onSave={(value) => onFieldSave(String(deal.id), { startDate: value })}
        onClose={() => setEditingField(null)}
      />
    )}
    {editingField?.field === 'endDate' && (
      <CellEditPopover
        anchorRect={editingField.rect}
        label="End Date"
        type="date"
        onSave={(value) => onFieldSave(String(deal.id), { endDate: value })}
        onClose={() => setEditingField(null)}
      />
    )}
    </>
  );
};

export default React.memo(DealRow);
