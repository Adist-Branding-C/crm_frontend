import type { TaskStageFormData } from '../types/request';

export const TASK_WORKFLOW_API_ENDPOINTS = {
  GET_ALL: '/task-workflows',
  GET_DEFAULT: '/task-workflows/default',
  GET_ONE: (id: number) => `/task-workflows/${id}`,
  CREATE: '/task-workflows',
  UPDATE: (id: number) => `/task-workflows/${id}`,
  SET_DEFAULT: (id: number) => `/task-workflows/${id}/set-default`,
  DELETE: (id: number) => `/task-workflows/${id}`,
  STAGES: (workflowId: number) => `/task-workflows/${workflowId}/stages`,
  STAGE: (workflowId: number, stageId: number) => `/task-workflows/${workflowId}/stages/${stageId}`,
};

export const ADD_WORKFLOW_INITIAL_VALUES = {
  name: '',
};

export const ADD_STAGE_INITIAL_VALUES: TaskStageFormData = {
  name: '',
  color: '#2563eb',
};

export const CANVAS_AUTO_LAYOUT = {
  NODE_WIDTH: 200,
  NODE_GAP_X: 260,
  START_Y: 120,
};
