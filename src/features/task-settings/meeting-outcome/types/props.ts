import type { RefObject } from 'react';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { MeetingOutcomeItem } from './interface';
import type { MeetingOutcomeFormData } from './request';

export interface MeetingOutcomeActionsProps {
  item: MeetingOutcomeItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: MeetingOutcomeItem) => void;
  onDelete: (item: MeetingOutcomeItem) => void;
}

export interface MeetingOutcomeRowProps {
  item: MeetingOutcomeItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: MeetingOutcomeItem) => void;
  onDelete: (item: MeetingOutcomeItem) => void;
}

export interface MeetingOutcomeFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MeetingOutcomeFormData;
  onSubmit: (values: MeetingOutcomeFormData, helpers: FormikHelpers<MeetingOutcomeFormData>) => Promise<void | boolean>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  isEditing?: boolean;
  bodyRef?: RefObject<HTMLDivElement | null>;
}
