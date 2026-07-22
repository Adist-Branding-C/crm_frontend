import { useState } from 'react';
import type { DragEvent } from 'react';
import { useFormikContext } from 'formik';
import { Plus } from 'lucide-react';
import type { RuleBuilderFormValues } from '../hooks/useRuleBuilder';
import type { ActionType } from '../types';
import { ACTION_TYPES, ACTION_TYPE_META, DEFAULT_ACTION_CONFIG } from '../constants';
import { generateActionId } from '../context/AutomationDataContext';
import ActionCard from './ActionCard';

const ActionsSection = () => {
  const { values, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [showPicker, setShowPicker] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleAddAction = (actionType: ActionType) => {
    const id = generateActionId();
    const newAction = {
      id,
      actionType,
      actionConfig: { ...DEFAULT_ACTION_CONFIG[actionType] },
      executionOrder: values.actions.length + 1,
      isActive: true,
    };
    setFieldValue('actions', [...values.actions, newAction]);
    setExpandedIds((prev) => new Set(prev).add(id));
    setShowPicker(false);
  };

  const handleRemove = (index: number) => {
    const next = values.actions.filter((_, i) => i !== index).map((action, i) => ({ ...action, executionOrder: i + 1 }));
    setFieldValue('actions', next);
  };

  const handleToggleActive = (index: number) => {
    const next = values.actions.map((action, i) => (i === index ? { ...action, isActive: !action.isActive } : action));
    setFieldValue('actions', next);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const next = [...values.actions];
    const [moved] = next.splice(draggedIndex, 1);
    if (moved) next.splice(targetIndex, 0, moved);
    setFieldValue('actions', next.map((action, i) => ({ ...action, executionOrder: i + 1 })));
    setDraggedIndex(null);
  };

  return (
    <div className="automation-builder-section">
      <h3>Actions</h3>
      <p className="automation-builder-section-desc">Configure what happens when this rule fires, in order.</p>

      <div className="automation-action-list">
        {values.actions.map((action, index) => (
          <ActionCard
            key={action.id}
            action={action}
            index={index}
            isExpanded={expandedIds.has(action.id)}
            onToggleExpanded={() => toggleExpanded(action.id)}
            onToggleActive={() => handleToggleActive(index)}
            onRemove={() => handleRemove(index)}
            isDragging={draggedIndex === index}
            onDragStart={(e: DragEvent<HTMLDivElement>) => {
              setDraggedIndex(index);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
            onDrop={(e: DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              handleDrop(index);
            }}
          />
        ))}
      </div>

      {showPicker ? (
        <div className="automation-add-action-picker">
          {ACTION_TYPES.map((actionType) => (
            <button type="button" key={actionType} className="automation-add-action-option" onClick={() => handleAddAction(actionType)}>
              {ACTION_TYPE_META[actionType].label}
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className="btn btn-secondary" onClick={() => setShowPicker(true)}>
          <Plus size={16} /> Add Action
        </button>
      )}
    </div>
  );
};

export default ActionsSection;
