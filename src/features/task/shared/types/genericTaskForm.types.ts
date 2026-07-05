import type { ReactNode } from 'react';
import type { Schema } from 'yup';
import type { FormikHelpers } from 'formik';

export interface CategoryOption {
  value: string;
  label: string;
}

export interface StaffOption {
  value: number;
  label: string;
}

export interface LeadOption {
  value: number;
  label: string;
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
  categoryOptions?: CategoryOption[];
  hideCategory?: boolean;
  children?: ReactNode;
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
