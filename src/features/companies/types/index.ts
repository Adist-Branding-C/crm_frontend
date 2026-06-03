export interface PlanHistory {
  plan: string;
  startDate: string;
  endDate: string;
  price: number;
}

export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  staffCount: number;
  leads: number;
  deals: number;
  revenue: number;
  status: string;
  createdAt: string;
  expiryDate: string;
  plansHistory: PlanHistory[];
}

export interface CompanyFilters {
  plan: string;
  status: string;
}

export interface CompanyStats {
  totalCompanies: number;
  expiredCustomers: number;
  soonExpire: number;
  totalStaff: number;
  totalRevenue: number;
}

export interface RenewalData {
  staffCount: string;
  perStaffPrice: string;
  plan: string;
}

export interface NewCompany {
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
}

export interface CompaniesFiltersProps {
  filters: CompanyFilters;
  onFilterChange: (filters: CompanyFilters) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

import type { SortConfig } from '../../../shared/types/sort';

export interface CompaniesTableProps {
  data: Company[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  selectedRows: number[];
  onSelectAll: () => void;
  onSelectRow: (id: number) => void;
  onView: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
}

export interface CompaniesToolbarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onAddCompany: () => void;
}

export interface CompaniesStatsGridProps {
  stats: CompanyStats;
}

export interface CompaniesPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}
