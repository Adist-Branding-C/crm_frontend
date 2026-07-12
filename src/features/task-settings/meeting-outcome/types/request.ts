export interface MeetingOutcomeFormData {
  name: string;
  status: string;
}

export interface FetchMeetingOutcomesParams {
  pageNumber: number;
  limit: number;
  search?: string;
}
