import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { CallReasonItem } from './interface';
import type { CallReasonFormData } from './request';

export interface CallReasonActionsProps {
  item: CallReasonItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallReasonItem) => void;
  onDelete: (item: CallReasonItem) => void;
}

export interface CallReasonRowProps {
  item: CallReasonItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallReasonItem) => void;
  onDelete: (item: CallReasonItem) => void;
}

export interface CallReasonFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: CallReasonFormData;
  onSubmit: (values: CallReasonFormData, helpers: FormikHelpers<CallReasonFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
}

