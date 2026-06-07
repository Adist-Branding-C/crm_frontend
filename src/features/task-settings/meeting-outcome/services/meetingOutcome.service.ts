import { fetchMeetingOutcomesApi, createMeetingOutcomeApi, updateMeetingOutcomeApi, deleteMeetingOutcomeApi } from './meetingOutcome.api';
import type { MeetingOutcomeFormData, MeetingOutcomeResponse } from '../types/index';

class MeetingOutcomeService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<MeetingOutcomeResponse> {
    return fetchMeetingOutcomesApi(params);
  }

  async create(data: MeetingOutcomeFormData): Promise<MeetingOutcomeResponse> {
    return createMeetingOutcomeApi(data);
  }

  async update(id: number, data: MeetingOutcomeFormData): Promise<MeetingOutcomeResponse> {
    return updateMeetingOutcomeApi(id, data);
  }

  async delete(id: number): Promise<Pick<MeetingOutcomeResponse, 'status' | 'message'>> {
    return deleteMeetingOutcomeApi(id);
  }
}

export const meetingOutcomeService = new MeetingOutcomeService();
