import type { ReactNode } from 'react';
import type { Schema } from 'yup';
import type { FormikHelpers } from 'formik';
import type { PreviewSection } from '../../../../shared/components/preview/PreviewCanvas';
import type { CategoryOption, StaffOption, LeadOption, DealOption, CampaignOption } from './options';
import type { RepeatType } from '../../task/types/interface';
import type { TaskTaskTypeKey } from './taskType.types';

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
  workflowId?: string;
  stageId?: string;
  repeatType?: RepeatType;
  repeatConfig?: {
    dayOfWeek?: number;
    dayOfMonth?: number | 'last';
  } | undefined;
  /** Unified mode fields - present only when unifiedMode is on. */
  taskType?: TaskTaskTypeKey | '';
  campaignId?: string;
  dealId?: string;
}

export interface GenericTaskFormProps {
  validationSchema:
    | Schema<Record<string, unknown>>
    | ((values: Record<string, unknown>) => Schema<Record<string, unknown>>);
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
  /** Two-way mode: shows the Task Type selector first and the one matching
   *  association field, wiring all four type configs instead of the fixed
   *  legacy props above. Defaults to false (backward compatible with calendar). */
  unifiedMode?: boolean;
  campaignOptions?: CampaignOption[];
  campaignLoading?: boolean;
  dealOptions?: DealOption[];
  dealLoading?: boolean;
  children?: ReactNode;
}