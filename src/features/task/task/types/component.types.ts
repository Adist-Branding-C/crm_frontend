import type { TaskItemRowProps } from '../../common/types/taskItemRow.types';
import type { LabelValuePair } from '../../../../shared/types/common';
import type { TaskItem } from './interface';
import type { TaskFormDataUpdate } from './request';

export interface TaskFieldOptions {
  staffOptions: LabelValuePair[];
  categoryOptions: LabelValuePair[];
  leadOptions: LabelValuePair[];
}

export type TaskRowProps = TaskItemRowProps<TaskItem> & {
  fieldOptions: TaskFieldOptions;
  onFieldSave: (id: number, payload: TaskFormDataUpdate) => Promise<boolean>;
};
