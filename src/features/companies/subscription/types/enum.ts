/**
 * Subscription CRUD route prefix, used to build the actual endpoint URLs in
 * constants/subscriptionApiEndpoints.ts and called directly by subscriptionDataService.
 */
export enum SUBSCRIPTIONS_API_ENDPOINTS {
  SUBSCRIPTIONS = '/subscriptions',
}

/**
 * Renewal-queue CRUD route prefix, used to build the actual endpoint URLs in
 * constants/subscriptionApiEndpoints.ts and called directly by renewalQueueDataService.
 */
export enum RENEWAL_QUEUE_API_ENDPOINTS {
  QUEUES = '/subscription-queues',
}
