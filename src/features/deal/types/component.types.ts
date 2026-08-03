import type { DealItem, DealStatusFilters, DealAdditionalFieldDef } from './interface';
import type { LabelValuePair } from '../../../shared/types/common';
import type { Schema } from 'yup';
import type { FormikHelpers } from 'formik';

export interface DealFormProps {
  editingItem?: DealItem | null;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: import('../../../shared/types/drawers').DealFormData;
  onSubmit: (
    values: import('../../../shared/types/drawers').DealFormData,
    helpers: FormikHelpers<import('../../../shared/types/drawers').DealFormData>,
  ) => Promise<void | boolean>;
  isLoading?: boolean;
  error?: string | null;
  onCancel: () => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export interface DealFiltersProps {
  filters: DealStatusFilters;
  onFilterChange: (filters: DealStatusFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isLoadingOptions?: boolean;
}

export interface DealSortDropdownProps {
  sortBy: string | null;
  sortOrder: string;
  onSortChange: (field: string, direction: string) => void;
}

export interface DealActionMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  row: DealItem;
  onEdit: (item: DealItem) => void;
  onDelete: (id: number) => void;
  onWhatsApp: (item: DealItem) => void;
  onMessage: (item: DealItem) => void;
}

export interface DealAdditionalFieldControlProps {
  field: DealAdditionalFieldDef;
  value: string;
  onChange: (value: string) => void;
}

export interface DealDynamicAdditionalFieldsProps {
  fields: DealAdditionalFieldDef[];
  values: Record<string, unknown>;
  errors: Record<string, unknown>;
  touched: Record<string, unknown>;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
}

export interface DealRowProps {
  deal: DealItem;
  columns: Array<{ key: string; label: string; sortable?: boolean }>;
  additionalFieldColumns: string[];
  isSelected: boolean;
  onSelectRow: (id: string, checked: boolean) => void;
  actionMenu: {
    isOpen: boolean;
    buttonRect: DOMRect | null;
    onOpen: (id: number, rect: DOMRect) => void;
    onClose: () => void;
  };
  onEditDeal: (item: DealItem) => void;
  onDeleteDeal: (deal: DealItem) => void;
  onSendWhatsapp: (item: DealItem, message?: string) => void;
  onMessage: (item: DealItem) => void;
  hasWhatsappTemplates: boolean;
  whatsappTemplatesLoading: boolean;
  whatsappTemplatesError: boolean;
  staffOptions: LabelValuePair[];
  onFieldSave: (dealId: string, payload: { agentId?: string; startDate?: string; endDate?: string }) => Promise<boolean>;
}
