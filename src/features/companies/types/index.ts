export interface Company {
  companyId: string;
  name: string;
  contactPersonName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
  dateOfRegistration: string;
  status: string;
  leads: number;
  /** Placeholder - no per-company staff API exists yet. */
  staffCount: string;
  /** Mock value - no per-company deals API exists yet. */
  deals: number;
  createdAt: string;
}

export interface CompanyFilters {
  status: string;
}

export interface CompanyStats {
  totalCompanies: number;
  expiredCustomers: number;
  soonExpire: number;
  totalStaff: number;
  totalRevenue: number;
}

export interface NewCompany {
  name: string;
  contactPersonName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gstNumber: string;
  dateOfRegistration: string;
  status: string;
}

export interface CompaniesFiltersProps {
  filters: CompanyFilters;
  onFilterChange: (filters: CompanyFilters) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export interface CompaniesStatsGridProps {
  stats: CompanyStats;
}

export interface CompanyStatusBadgeProps {
  status: string;
}

export interface CompanyRowProps {
  company: Company;
  isSelected: boolean;
  onSelectRow: (companyId: string) => void;
  onView: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (companyId: string) => void;
}
