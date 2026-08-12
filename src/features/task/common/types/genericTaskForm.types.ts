import type { ReactNode } from 'react';
import type { Schema } from 'yup';
import type { FormikHelpers } from 'formik';
import type { PreviewSection } from '../../../../shared/components/preview/PreviewCanvas';
import type { CategoryOption, StaffOption, LeadOption } from './options';

export interface TaskPreviewData {
  sections: PreviewSection[];
  payload: Record<string, unknown>;
  formValues: Record<string, unknown>;
}

export interface GenericTaskFormValues {
  title: string;
  description: string;
  categoryId?: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  leadId?: string | number;
  priority: string;
  status: string;
}

export interface GenericTaskFormProps {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: GenericTaskFormValues;
  onSubmit: (values: Record<string, unknown>, helpers: FormikHelpers<Record<string, unknown>>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
  draftId?: string | null;
  onDraftSaved?: (id: string) => void;
  onPreviewRequest?: (previewData: TaskPreviewData) => void;
  staffOptions: StaffOption[];
  staffLoading?: boolean;
  leadOptions?: LeadOption[];
  leadLoading?: boolean;
  /** Overrides the association dropdown's option source; falls back to leadOptions/leadLoading when omitted. */
  associationOptions?: LeadOption[];
  associationLoading?: boolean;
  associationFieldName?: string;
  associationLabel?: string;
  associationPlaceholder?: string;
  associationLoadingLabel?: string;
  associationEmptyMessage?: string;
  categoryOptions?: CategoryOption[];
  categoryLoading?: boolean;
  hideCategory?: boolean;
  children?: ReactNode;
}
