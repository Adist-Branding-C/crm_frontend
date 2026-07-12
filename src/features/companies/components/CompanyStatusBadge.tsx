import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';
import type { CompanyStatusBadgeProps } from '../types';

const CompanyStatusBadge = ({ status }: CompanyStatusBadgeProps) => (
  <span className={`status-badge ${status}`}>{status === CompanyStatus.ACTIVE ? 'Active' : 'Inactive'}</span>
);

export default CompanyStatusBadge;
