export interface GetActivitiesParams {
  pageNumber: number;
  limit: number;
  timezoneOffsetMinutes: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  actorId?: string;
  activityType?: string;
  period?: 'today' | 'week' | 'month' | 'custom' | 'all';
  from?: string;
  to?: string;
}
