import type { Company, CompanyFilters, CompanyStats, NewCompany } from './index';

export interface CompaniesFiltersProps {
  initialValues: CompanyFilters;
  onApply: (values: CompanyFilters) => void;
  onClear: () => void;
}

export interface CompaniesStatsGridProps {
  stats: CompanyStats;
}

export interface CompanyRowActionsProps {
  company: Company;
  onView: (company: Company) => void;
  onEdit: (company: Company) => void;
  onManageSubscription: (company: Company) => void;
}

export interface CompanyFormProps {
  editingCompany: Company | null;
  onSubmit: (values: NewCompany) => Promise<void>;
  onCancel: () => void;
}

export interface CompanyDetailsProps {
  company: Company;
}

export interface UseCompanyFormParams {
  editingCompany: Company | null;
  onRefreshList: () => void;
  onRefreshStats: () => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
  onClose: () => void;
}
