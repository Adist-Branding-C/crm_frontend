import { memo, useState } from 'react';
import { TRow, TCell } from '../../../../shared/components/table';
import StatusBadge from '../../../../shared/components/StatusBadge';
import RowActions from '../../common/components/RowActions';
import CellEditPopover from '../../../../shared/components/CellEditPopover';
import { formatTime12hr } from '../../../../shared/utils/dateUtils';
import type { TaskRowProps, TaskFieldOptions } from '../types/component.types';
import type { TaskFormDataUpdate } from '../types/request';

type EditableField = 'assignedTo' | 'category' | 'leadId';

const EDITABLE_FIELD_CONFIG: Record<EditableField, {
  payloadKey: keyof TaskFormDataUpdate;
  optionsKey: keyof TaskFieldOptions;
  label: string;
}> = {
  assignedTo: { payloadKey: 'assignedTo', optionsKey: 'staffOptions', label: 'Assigned To' },
  category: { payloadKey: 'categoryId', optionsKey: 'categoryOptions', label: 'Category' },
  leadId: { payloadKey: 'leadId', optionsKey: 'leadOptions', label: 'Lead' },
};

const TaskRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete, fieldOptions, onFieldSave }: TaskRowProps) => {
  const [editingField, setEditingField] = useState<{ field: EditableField; rect: DOMRect } | null>(null);
  const editableConfig = editingField ? EDITABLE_FIELD_CONFIG[editingField.field] : undefined;

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
        <TCell>{item.title}</TCell>
        <TCell className="truncate-cell"><span title={item.description}>{item.description}</span></TCell>
        <TCell>{item.category?.name || emptyCell('category')}</TCell>
        <TCell>{item.scheduledDate}</TCell>
        <TCell>{formatTime12hr(item.scheduledTime)}</TCell>
        <TCell>{item.assignedTo?.name || emptyCell('assignedTo')}</TCell>
        <TCell>{item.assignedBy?.name ?? '-'}</TCell>
        <TCell><StatusBadge value={item.priority} /></TCell>
        <TCell><StatusBadge value={item.status} /></TCell>
        <TCell>{item.leadId?.name || emptyCell('leadId')}</TCell>
        <TCell>
          <RowActions item={item} dropdownOpen={dropdownOpen} onToggleDropdown={onToggleDropdown} onEdit={onEdit} onDelete={onDelete} />
        </TCell>
      </TRow>

      {editingField && editableConfig && (
        <CellEditPopover
          anchorRect={editingField.rect}
          label={editableConfig.label}
          type="select"
          options={fieldOptions[editableConfig.optionsKey]}
          onSave={(value) => onFieldSave(item.id, { [editableConfig.payloadKey]: value })}
          onClose={() => setEditingField(null)}
        />
      )}
    </>
  );
};

export default memo(TaskRow);
