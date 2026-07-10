export interface GetActivitiesParams {
  pageNumber: number;
  limit: number;
  tzOffsetMinutes: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  actorId?: string;
  activityType?: string;
}
