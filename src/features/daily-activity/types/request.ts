export interface GetActivitiesParams {
  pageNumber: number;
  limit: number;
  timezoneOffsetMinutes: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  actorId?: string;
  activityType?: string;
}
