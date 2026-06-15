export const CAMPAIGN_TYPES = {
  LEAD_CAMPAIGN: 'Lead Campaign',
  DATA_POOL: 'Data Pool',
} as const;

export const CAMPAIGN_TYPE_OPTIONS = [
  { value: CAMPAIGN_TYPES.LEAD_CAMPAIGN, label: 'Lead Campaign' },
  { value: CAMPAIGN_TYPES.DATA_POOL, label: 'Data Pool' },
];

export const FILTER_BY_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export const SORT_BY_OPTIONS = [
  { value: 'Name', label: 'Name' },
  { value: 'Date', label: 'Date' },
  { value: 'Status', label: 'Status' },
];

export const TABLE_COLUMNS = [
  { key: 'slNo', label: 'Sl No' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'totalTasks', label: 'Total Tasks', sortable: true },
  { key: 'completedTasks', label: 'Completed Tasks', sortable: true },
  { key: 'completedPercent', label: 'Completed %', sortable: true },
  { key: 'createdBy', label: 'Created By', sortable: true },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'action', label: 'Action' },
];

export const INITIAL_FORM_DATA = {
  type: '',
  name: '',
  startDate: '',
  endDate: '',
  description: '',
  poolName: '',
  poolAgents: [] as string[],
  filterBy: '',
  sortBy: '',
};
