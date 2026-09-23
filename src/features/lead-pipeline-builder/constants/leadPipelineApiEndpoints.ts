/**
 * REST endpoints for the pipeline/stage/transition CRUD backing the canvas
 * builder. 
 *
 * Used by:
 * - leadPipeline.service.ts
 */
export const LEAD_PIPELINE_API_ENDPOINTS = {
  GET_ALL: '/lead-pipelines',
  GET_ONE: (id: number) => `/lead-pipelines/${id}`,
  CREATE: '/lead-pipelines',
  UPDATE: (id: number) => `/lead-pipelines/${id}`,
  SET_DEFAULT: (id: number) => `/lead-pipelines/${id}/set-default`,
  DELETE: (id: number) => `/lead-pipelines/${id}`,

  STAGES: (pipelineId: number) => `/lead-pipelines/${pipelineId}/stages`,
  STAGE: (pipelineId: number, statusId: string) =>
    `/lead-pipelines/${pipelineId}/stages/${statusId}`,

  TRANSITIONS: (pipelineId: number) => `/lead-pipelines/${pipelineId}/transitions`,
  TRANSITION: (pipelineId: number, transitionId: number) =>
    `/lead-pipelines/${pipelineId}/transitions/${transitionId}`,
};
