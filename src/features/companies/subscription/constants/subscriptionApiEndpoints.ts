/**
 * Company subscription + renewal-queue routes consumed by subscriptionDataService
 * and renewalQueueDataService (Company Subscription Management page).
 */
export enum SUBSCRIPTIONS_API_ENDPOINTS {
  SUBSCRIPTIONS = '/subscriptions',
}

export const subscriptionByCompanyId = (companyId: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/${companyId}`;
export const subscriptionHistoryByCompanyId = (companyId: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/history/${companyId}`;
export const subscriptionStaffCountById = (id: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/${id}/staff-count`;
export const subscriptionStatusById = (id: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/${id}/status`;

export enum RENEWAL_QUEUE_API_ENDPOINTS {
  QUEUES = '/subscription-queues',
}

export const queueByCompanyId = (companyId: string) => `${RENEWAL_QUEUE_API_ENDPOINTS.QUEUES}/company/${companyId}`;
export const queueById = (id: string) => `${RENEWAL_QUEUE_API_ENDPOINTS.QUEUES}/${id}`;
export const applyQueueNow = (id: string) => `${RENEWAL_QUEUE_API_ENDPOINTS.QUEUES}/${id}/apply`;
