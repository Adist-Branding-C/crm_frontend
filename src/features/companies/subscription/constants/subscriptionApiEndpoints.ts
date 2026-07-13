import { SUBSCRIPTIONS_API_ENDPOINTS, RENEWAL_QUEUE_API_ENDPOINTS } from '../types/enum';

/**
 * Company subscription route builders consumed by subscriptionDataService
 * (Company Subscription Management page).
 */
export const subscriptionByCompanyId = (companyId: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/${companyId}`;
export const subscriptionHistoryByCompanyId = (companyId: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/history/${companyId}`;
export const subscriptionStaffCountById = (id: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/${id}/staff-count`;
export const subscriptionStatusById = (id: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/${id}/status`;
export const subscriptionCancelById = (id: string) => `${SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS}/${id}/cancel`;

/**
 * Renewal-queue route builders consumed by renewalQueueDataService (Company Subscription
 * Management page's "Renewal Queue" section).
 */
export const queueByCompanyId = (companyId: string) => `${RENEWAL_QUEUE_API_ENDPOINTS.QUEUES}/company/${companyId}`;
export const queueById = (id: string) => `${RENEWAL_QUEUE_API_ENDPOINTS.QUEUES}/${id}`;
export const applyQueueNow = (id: string) => `${RENEWAL_QUEUE_API_ENDPOINTS.QUEUES}/${id}/apply`;
