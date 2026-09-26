/**
 * Lead CRUD routes consumed by leadDataService (enquiries/leads page).
 */
export enum LEAD_API_ENDPOINTS {
  LEADS = '/leads',
  LEADS_DELETED = '/leads/deleted',
}

export const leadReassignableTasksCountEndpoint = (leadId: string) =>
  `${LEAD_API_ENDPOINTS.LEADS}/${leadId}/reassignable-tasks/count`;
