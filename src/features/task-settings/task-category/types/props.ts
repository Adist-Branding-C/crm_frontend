import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { TaskCategoryItem } from './interface';
import type { TaskCategoryFormData } from './request';

export interface TaskCategoryActionsProps {
  item: TaskCategoryItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskCategoryItem) => void;
  onDelete: (item: TaskCategoryItem) => void;
}

export interface TaskCategoryRowProps {
  item: TaskCategoryItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskCategoryItem) => void;
  onDelete: (item: TaskCategoryItem) => void;
}

export interface TaskCategoryFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: TaskCategoryFormData;
  onSubmit: (values: TaskCategoryFormData, helpers: FormikHelpers<TaskCategoryFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
}

