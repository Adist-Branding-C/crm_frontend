import { COMPANIES_API_ENDPOINTS } from '../types/enum';

/**
 * Company CRUD route builder consumed by companyDataService (Company Management page).
 */
export const companyById = (companyId: string) => `${COMPANIES_API_ENDPOINTS.COMPANIES}/${companyId}`;
