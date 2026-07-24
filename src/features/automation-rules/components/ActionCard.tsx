import { GripVertical, ChevronDown, ChevronUp, X } from 'lucide-react';
import type { DragEvent, ReactElement } from 'react';
import type { RuleAction } from '../types';
import { ACTION_TYPE_META } from '../constants';
import WebhookFields from './action-config/WebhookFields';
import AddTaskFields from './action-config/AddTaskFields';
import AssignLeadFields from './action-config/AssignLeadFields';
import AddToCampaignFields from './action-config/AddToCampaignFields';

interface ActionCardProps {
  action: RuleAction;
  index: number;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onToggleActive: () => void;
  onRemove: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
}

const ACTION_FIELDS: Record<RuleAction['actionType'], (index: number) => ReactElement> = {
  WEBHOOK: (index) => <WebhookFields index={index} />,
  ADD_TASK: (index) => <AddTaskFields index={index} />,
  ASSIGN_LEAD: (index) => <AssignLeadFields index={index} />,
  ADD_TO_CAMPAIGN: (index) => <AddToCampaignFields index={index} />,
};

const ActionCard = ({
  action,
  index,
  isExpanded,
  onToggleExpanded,
  onToggleActive,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: ActionCardProps) => {
  const meta = ACTION_TYPE_META[action.actionType];

  return (
    <div
      className={`automation-action-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="automation-action-card-header">
        <span className="automation-drag-handle" title="Drag to reorder"><GripVertical size={16} /></span>
        <button type="button" className="automation-action-card-title" onClick={onToggleExpanded} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {meta.label}
        </button>
        <label className="automation-toggle" title={action.isActive ? 'Disable action' : 'Enable action'}>
          <input type="checkbox" checked={action.isActive} onChange={onToggleActive} />
          <span className="automation-toggle-slider" />
        </label>
        <button type="button" className="automation-icon-btn danger" title="Remove action" onClick={onRemove}>
          <X size={16} />
        </button>
      </div>
      {isExpanded && (
        <div className="automation-action-card-body">
          {ACTION_FIELDS[action.actionType](index)}
        </div>
      )}
    </div>
  );
};

export default ActionCard;
