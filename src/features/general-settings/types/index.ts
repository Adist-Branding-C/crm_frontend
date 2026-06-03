export interface GeneralSettings {
  globalSearch: boolean;
  searchNumberMasking: boolean;
  enableWebSound: boolean;
  enableAttendanceStatus: boolean;
  enableIvrAppNotification: boolean;
  staffChangeEnquirySource: boolean;
  timezone: string;
  enableBranchFilter: boolean;
  enableWebNotification: boolean;
  enableWebIvrCalling: boolean;
  currency: string;
  enableDeletedAgentFilter: boolean;
}

import type { LabelValuePair } from '../../../shared/types/common';

export type Option = LabelValuePair;
