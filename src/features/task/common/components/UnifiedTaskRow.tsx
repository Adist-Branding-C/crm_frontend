import { memo, useState } from 'react';
import type { LabelValuePair } from '../../../../shared/types/common';
import { TRow, TCell } from '../../../../shared/components/table';
import StatusBadge from '../../../../shared/components/StatusBadge';
import CellEditPopover from '../../../../shared/components/CellEditPopover';
import { formatTime12hr } from '../../../../shared/utils/dateUtils';
import type { UnifiedTaskItem, UnifiedTaskPayload } from '../types/unifiedTask.types';
import type { RepeatType } from '../../task/types/interface';
import { getRelatedId, getRelatedFieldLabel, getRelatedFieldName, getRelatedLabel } from '../utils/unifiedTask.helpers';
import { isTaskOverdue } from '../utils/isTaskOverdue';
import RowActions from './RowActions';
import WorkflowStageCells from './WorkflowStageCells';
import TaskRepeatCell from './TaskRepeatCell';
import TaskTypeBadge from './TaskTypeBadge';
import OverdueTag from './OverdueTag';

type EditableField = 'assignedTo' | 'related';

export interface UnifiedRowFieldOptions {
  staffOptions: LabelValuePair[];
  associations: Record<string, { options: LabelValuePair[]; loading: boolean }>;
}

interface UnifiedTaskRowProps {
  item: UnifiedTaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: UnifiedTaskItem) => void;
  onDelete: (item: UnifiedTaskItem) => void;
  fieldOptions: UnifiedRowFieldOptions;
  onFieldSave: (id: number, payload: Partial<UnifiedTaskPayload>) => Promise<boolean>;
}

/**
 * One row in the unified task table. Adds the Type column (badge) and the
 * Related column (the type-specific association: Category/Lead/Campaign/Deal),
 * and keeps the shared task-item row shape + inline empty-cell editing for
 * both Assigned To and the Related field.
 *
 * Used by:
 * - unified TaskPage (table view).
 *
 * Notes:
 * - Inline edit reuses the shared CellEditPopover and only triggers on empty
 *   cells, matching the existing Task/Deal/Campaign row behavior - populated
 *   cells are plain text.
 * - The Related field name/label live in the task-type config, so the row
 *   decodes them from its own item.taskType instead of hardcoding a column.
 */
const UnifiedTaskRow = ({
  item,
  index,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete,
  fieldOptions,
  onFieldSave,
}: UnifiedTaskRowProps) => {
  const [editingField, setEditingField] = useState<{ field: EditableField; rect: DOMRect } | null>(null);

  const relatedFieldName = getRelatedFieldName(item.taskType);
  const relatedFieldLabel = getRelatedFieldLabel(item.taskType);
  const relatedOptions = fieldOptions.associations[relatedFieldName] ?? { options: [], loading: false };

  const getConfig = (field: EditableField) => (
    field === 'assignedTo'
      ? { label: 'Assigned To', payloadKey: 'assignedTo' as const, options: fieldOptions.staffOptions, loading: false, currentValue: item.assignedTo?.id != null ? String(item.assignedTo.id) : '' }
      : { label: relatedFieldLabel, payloadKey: relatedFieldName as keyof UnifiedTaskPayload, options: relatedOptions.options, loading: relatedOptions.loading, currentValue: getRelatedId(item) }
  );

  const editingConfig = editingField ? getConfig(editingField.field) : undefined;
  const overdue = isTaskOverdue(item.scheduledDate, item.scheduledTime, item.status);

  const emptyCell = (field: EditableField) => (
    <span
      className="lead-cell-empty"
      onClick={(e) => setEditingField({ field, rect: e.currentTarget.getBoundingClientRect() })}
    >
      None
    </span>
  );

  return (
    <>
      <TRow>
        <TCell>{index}</TCell>
        <TCell><TaskTypeBadge type={item.taskType} /></TCell>
        <TCell>{item.title}</TCell>
        <TCell className="truncate-cell"><span title={item.description}>{item.description}</span></TCell>
        <TCell>{getRelatedLabel(item) === '-' ? emptyCell('related') : getRelatedLabel(item)}</TCell>
        <TCell>{item.scheduledDate}</TCell>
        <TCell>{formatTime12hr(item.scheduledTime)}</TCell>
        <WorkflowStageCells workflowName={item.workflowName} stageName={item.stageName} stageColor={item.stageColor} />
        <TCell>{item.assignedTo?.name ?? emptyCell('assignedTo')}</TCell>
        <TCell>{item.assignedBy?.name ?? '-'}</TCell>
        <TCell><StatusBadge value={item.priority} /></TCell>
        <TCell><StatusBadge value={item.status} />{overdue && <OverdueTag />}</TCell>
        <TaskRepeatCell repeatType={item.repeatType as RepeatType | null | undefined} repeatConfig={item.repeatConfig} />
        <TCell>
          <RowActions item={item} dropdownOpen={dropdownOpen} onToggleDropdown={onToggleDropdown} onEdit={onEdit} onDelete={onDelete} />
        </TCell>
      </TRow>

      {editingField && editingConfig && (
        <CellEditPopover
          anchorRect={editingField.rect}
          label={editingConfig.label}
          type="select"
          options={editingConfig.options}
          initialValue={editingConfig.currentValue}
          onSave={(value) => onFieldSave(item.id, { [editingConfig.payloadKey]: value })}
          onClose={() => setEditingField(null)}
        />
      )}
    </>
  );
};

export default memo(UnifiedTaskRow);