import type { FacebookLeadStatus } from '../../../shared/constants/enums';

export interface FacebookLead {
  id: number;
  workflowName: string;
  name: string;
  phone: string;
  additionalData: {
    city: string;
    course: string;
    email: string;
    campaign: string;
  };
  status: FacebookLeadStatus;
  leadStatus: string;
  createdAt: string;
  failureReason: string;
}

import type { SelectOption } from '../../../shared/types/common';

export type Workflow = SelectOption;

export interface Filters {
  dateFrom: string;
  dateTo: string;
  workflow: string;
  search: string;
}

export interface LeadStats {
  total: number;
  success: number;
  failed: number;
  new: number;
  duplicate: number;
  pending: number;
}

export interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface ClearConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export interface LeadsTableProps {
  data: FacebookLead[];
  onViewDetails: (lead: FacebookLead) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (value: string) => void;
}

export interface LeadDetailsModalProps {
  isOpen: boolean;
  lead: FacebookLead | null;
  onClose: () => void;
}

export interface SummaryCardsProps {
  stats: LeadStats;
}

export interface FilterCardProps {
  filters: Filters;
  onFilterChange: (field: keyof Filters, value: string) => void;
  onClearClick: () => void;
}
