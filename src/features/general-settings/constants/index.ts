import type { Option } from '../types';

export const timezones: Option[] = [
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'America/New_York' },
  { value: 'Europe/London', label: 'Europe/London' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai' },
];

export const currencies: Option[] = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' },
  { value: 'AED', label: 'AED' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

export const SETTINGS_LABELS: Record<string, string> = {
  globalSearch: 'Global Search',
  searchNumberMasking: 'Search Number Masking',
  enableWebSound: 'Enable Web Sound',
  enableAttendanceStatus: 'Enable Attendance Status',
  enableIvrAppNotification: 'Enable IVR App Notification',
  staffChangeEnquirySource: 'Staff can change Enquiry Source',
  enableBranchFilter: 'Enable branch vise filter',
  enableWebNotification: 'Enable Web Notification',
  enableWebIvrCalling: 'Enable Web IVR Calling',
  enableDeletedAgentFilter: 'Enable Deleted Agent in filter',
};

export const TIMEZONE_LABEL = 'Time Zone';
export const CURRENCY_LABEL = 'Currency';

export const DEFAULT_SETTINGS = {
  globalSearch: true,
  searchNumberMasking: false,
  enableWebSound: true,
  enableAttendanceStatus: true,
  enableIvrAppNotification: false,
  staffChangeEnquirySource: false,
  timezone: 'Asia/Kolkata',
  enableBranchFilter: true,
  enableWebNotification: true,
  enableWebIvrCalling: false,
  currency: 'INR',
  enableDeletedAgentFilter: false,
};
