/**
 * Company CRUD routes consumed by companyDataService (Company Management page).
 */
export enum COMPANIES_API_ENDPOINTS {
  COMPANIES = '/companies',
  STATISTICS = '/companies/statistics',
}

export const companyById = (companyId: string) => `${COMPANIES_API_ENDPOINTS.COMPANIES}/${companyId}`;
