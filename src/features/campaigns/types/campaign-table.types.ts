import type { Campaign } from './campaign.types';

export interface CampaignColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface CampaignTableProps {
  data: Campaign[];
  columns: CampaignColumn[];
  sortConfig: { key: string | null; direction: 'asc' | 'desc' };
  actionMenuOpen: number | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  rowsPerPage: number;
  onSort: (key: string) => void;
  onToggleActionMenu: (id: number | null) => void;
  onDelete: (id: number) => void;
  onEdit: (campaign: Campaign) => void;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface CampaignTableRowProps {
  row: Campaign;
  columns: CampaignColumn[];
  actionMenuOpen: number | null;
  onToggleActionMenu: (id: number | null) => void;
  onDelete: (id: number) => void;
  onEdit: (campaign: Campaign) => void;
}

export interface CampaignNameCellProps {
  name: Campaign['name'];
}

export interface CampaignTypeBadgeProps {
  type: string;
}

export interface CampaignProgressCellProps {
  percent: number;
}

export interface CampaignCreatedByCellProps {
  createdByName?: Campaign['createdByName'];
  createdBy: Campaign['createdBy'];
}

export interface CampaignDateCellProps {
  date?: string;
}

export interface CampaignActionCellProps {
  campaign: Campaign;
  isOpen: boolean;
  onToggle: (id: number | null) => void;
  onDelete: (id: number) => void;
  onEdit: (campaign: Campaign) => void;
}
