import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { CallStatusItem } from './interface';
import type { CallStatusFormData } from './request';

export interface CallStatusActionsProps {
  item: CallStatusItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallStatusItem) => void;
  onDelete: (item: CallStatusItem) => void;
}

export interface CallStatusRowProps {
  item: CallStatusItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallStatusItem) => void;
  onDelete: (item: CallStatusItem) => void;
}

export interface CallStatusFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallStatusFormData;
  onSubmit: (values: CallStatusFormData, helpers: FormikHelpers<CallStatusFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
}

