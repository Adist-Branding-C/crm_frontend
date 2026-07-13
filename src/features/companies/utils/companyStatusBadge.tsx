import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';

/**
 * Renders a company's Active/Inactive status as a pill badge.
 *
 * Used by:
 * - CompaniesPage (companies table columns config)
 */
export function getCompanyStatusBadge(status: string) {
  return (
    <span className={`status-badge ${status}`}>
      {status === CompanyStatus.ACTIVE ? 'Active' : 'Inactive'}
    </span>
  );
}
