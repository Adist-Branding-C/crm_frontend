export interface DailyActivityRow {
  id: number;
  agentName: string;
  total: number;
  attendance: number;
  visitor: number;
  leadAdd: number;
  taskAdd: number;
  callTaskFeedback: number;
  dealsAdd: number;
  taskEdit: number;
  leadUpdate: number;
  noteAdd: number;
  callLogAdd: number;
  statusUpdated: number;
  purposeUpdated: number;
  voiceNoteAdd: number;
  fileNoteAdd: number;
}

export interface GLAPIRow {
  id: number;
  slNo: number;
  via: string;
  leadName: string;
  mobile: string;
  assignedTo: string;
  purpose: string;
  source: string;
  status: string;
  count: number;
  dateTime: string;
  updatedAt: string;
}

export interface DeletedLead {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  assignedTo: string;
  purpose: string;
  type: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  deleteReason: string;
  [key: string]: string | number;
}

export interface DealStageStat {
  stage: string;
  count: number;
  amount: number;
  color: string;
}

export interface DealAgentStat {
  id: number;
  name: string;
  totalDeals: number;
  openDeals: number;
  winDeals: number;
  closeDeals: number;
}

export interface LeadConversionDeal {
  id: number;
  dealCode: string;
  dealName: string;
  leadName: string;
  mobile: string;
  dealAmount: number;
  dealStatus: string;
  leadSource: string;
  lostReason: string;
  startDate: string;
  endDate: string;
  staffName: string;
  createdBy: string;
  updatedAt: string;
}

export interface TaskWiseRow {
  id: number;
  agentName: string;
  total: number;
  completed: number;
  pending: number;
  overDue: number;
}

export interface LeadChangeRow {
  id: number;
  slNum: number;
  leadName: string;
  mobile: string;
  leadSource: string;
  leadStatus: string;
  noteAddedBy: string;
  notes: string;
}

export interface TaskWorkRow {
  id: number;
  slNo: number;
  customerName: string;
  task: string;
  contactNumber: string;
  assignedTo: string;
  date: string;
  createdDate: string;
  completedDate: string;
  remark: string;
  status: string;
  workStartOn: string;
  workEndOn: string;
}

export interface GLDialerCall {
  id: number;
  customer: string;
  callType: string;
  agentName: string;
  callTime: string;
  duration: string;
}

export interface GLDialerAgentStat {
  id: number;
  agentName: string;
  answeredCalls: number;
}

export interface CallFeedbackEntry {
  id: number;
  leadName: string;
  number: string;
  agent: string;
  remark: string;
  callStatus: string;
  callTime: string;
}

export interface CheckinRow {
  id: number;
  shop: string;
  agent: string;
  note: string;
  typeIn: string;
  dateIn: string;
  locationIn: string;
  typeOut: string;
  dateOut: string;
  locationOut: string;
}

export interface AttendanceRow {
  id: number;
  agent: string;
  phone: string;
  workingDays: number;
  leave: number;
  duration: string;
}

export interface ReportCategory {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
}

export interface ReportOption {
  id: string;
  title: string;
  description: string;
  path: string;
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}
