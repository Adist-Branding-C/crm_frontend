import axiosInstance from '../../../api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/common';
import type { CalendarApiDateItem } from '../types';

export interface CalendarQueryParams {
  startDate: string;
  endDate: string;
}

class CalendarService {
  async getCalendar(params: CalendarQueryParams): Promise<CalendarApiDateItem[]> {
    const response = await axiosInstance.get<ApiResponse<{ items: CalendarApiDateItem[] }>>(
      '/calendar',
      { params },
    );
    return response.data.data?.items ?? [];
  }
}

export const calendarService = new CalendarService();
