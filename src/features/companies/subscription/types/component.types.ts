import type { SubscriptionDetail, SubscriptionHistoryEntry, RenewalQueueEntry } from './index';
import type {
  CreateSubscriptionPayload,
  UpdateStaffCountPayload,
  UpdateSubscriptionStatusPayload,
  CancelSubscriptionPayload,
  CreateRenewalQueuePayload,
  UpdateRenewalQueuePayload,
} from './request';

export type CancelAction = 'thisMonth' | 'spot' | null;

export interface StaffPricingFieldsProps {
  errors: { staffCount?: string; perStaffPrice?: string };
  touched: { staffCount?: boolean; perStaffPrice?: boolean };
}

export interface SubscriptionTotalPreviewProps {
  staffCount: number | '';
  perStaffPrice: number | '';
  durationInDays: number | '';
  label?: string;
}

export interface SubscriptionOverviewCardProps {
  subscription: SubscriptionDetail;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onUpdateStaffCount: (payload: UpdateStaffCountPayload) => Promise<boolean>;
  onUpdateStatus: (payload: UpdateSubscriptionStatusPayload) => Promise<boolean>;
  onCancelSubscription: (payload: CancelSubscriptionPayload) => Promise<boolean>;
}

export interface EditStaffCountModalProps {
  isOpen: boolean;
  subscription: SubscriptionDetail;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onSubmit: (values: UpdateStaffCountPayload) => Promise<boolean>;
  onClose: () => void;
}

export interface UpdateSubscriptionStatusModalProps {
  isOpen: boolean;
  subscription: SubscriptionDetail;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onSubmit: (values: UpdateSubscriptionStatusPayload) => Promise<boolean>;
  onClose: () => void;
}

export interface RenewalQueueFormValues {
  renewalDate: string;
  validFrom: string;
  durationInDays: number | '';
  staffCount: number | '';
  perStaffPrice: number | '';
  immediate: boolean;
}

export interface RenewalQueueFormModalProps {
  isOpen: boolean;
  editingQueue: RenewalQueueEntry | null;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onSubmit: (values: RenewalQueueFormValues) => Promise<boolean>;
  onClose: () => void;
}

export interface RenewalQueueSectionProps {
  companyId: string;
  queue: RenewalQueueEntry | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onCreate: (payload: CreateRenewalQueuePayload) => Promise<boolean>;
  onUpdate: (payload: UpdateRenewalQueuePayload) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
  onApplyNow: () => Promise<boolean>;
}

export interface AssignSubscriptionFormValues {
  validFrom: string;
  durationInDays: number | '';
  staffCount: number | '';
  perStaffPrice: number | '';
  remark: string;
}

export interface AssignSubscriptionFormProps {
  companyId: string;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onSubmit: (payload: CreateSubscriptionPayload) => Promise<boolean>;
}

export interface SubscriptionHistoryTableProps {
  history: SubscriptionHistoryEntry[];
  isLoading: boolean;
}

export interface SubscriptionHistoryRowProps {
  entry: SubscriptionHistoryEntry;
}
