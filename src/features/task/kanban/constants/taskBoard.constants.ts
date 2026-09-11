export const TASK_BOARD_VIEW_STORAGE_KEY = 'adist:task-board:view';
export const TASK_BOARD_WORKFLOW_STORAGE_KEY = 'adist:task-board:workflowId';

export const TAB_TO_TASK_TYPE: Record<string, string> = {
  task: 'NORMAL',
  'call-task': 'CALL_TASK',
  'campaign-task': 'CAMPAIGN_TASK',
  'deal-task': 'DEAL_TASK',
};

export const TASK_TYPE_LABELS: Record<string, string> = {
  NORMAL: 'Task',
  CALL_TASK: 'Call',
  CAMPAIGN_TASK: 'Campaign',
  DEAL_TASK: 'Deal',
};

export const KANBAN_PAGE_SIZE = 20;
