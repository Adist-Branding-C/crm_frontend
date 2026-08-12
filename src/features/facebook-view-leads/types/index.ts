export type FacebookLeadStatus = 'received' | 'processing' | 'processed' | 'failed';

export interface FacebookLead {
  id: string;
  leadgenId: string;
  workflowId: string | null;
  workflowName: string;
  status: FacebookLeadStatus;
  leadId: string | null;
  errorCode: string | null;
  errorMessage: string | null;
  rawFieldData: Record<string, string> | null;
  createdAt: string;
}

export interface Workflow {
  id: string;
  name: string;
}

export interface Filters {
  dateFrom: string;
  dateTo: string;
  workflow: string;
  status: string;
}

export interface LeadStats {
  total: number;
  processed: number;
  failed: number;
  processing: number;
  received: number;
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
  loading: boolean;
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
  workflows: Workflow[];
  onFilterChange: (field: keyof Filters, value: string) => void;
  onClearClick: () => void;
}
