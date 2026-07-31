import type { ReactNode } from 'react';
import type { Schema } from 'yup';
import type { FormikHelpers } from 'formik';
import type { CategoryOption, StaffOption, LeadOption } from './options';

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
  onSubmit: (values: any, helpers: FormikHelpers<any>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  isEditing: boolean;
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
