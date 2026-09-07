/**
 * REST endpoints for the pipeline/stage/transition CRUD backing the
 * canvas builder.
 *
 * Used by:
 * - dealPipeline.service.ts
 */
export const DEAL_PIPELINE_API_ENDPOINTS = {
  GET_ALL: '/deal-pipelines',
  GET_ONE: (id: number) => `/deal-pipelines/${id}`,
  CREATE: '/deal-pipelines',
  UPDATE: (id: number) => `/deal-pipelines/${id}`,
  SET_DEFAULT: (id: number) => `/deal-pipelines/${id}/set-default`,
  ACTIVATE: (id: number) => `/deal-pipelines/${id}/activate`,
  DELETE: (id: number) => `/deal-pipelines/${id}`,

  STAGES: (pipelineId: number) => `/deal-pipelines/${pipelineId}/stages`,
  STAGE: (pipelineId: number, stageId: number) =>
    `/deal-pipelines/${pipelineId}/stages/${stageId}`,

  TRANSITIONS: (pipelineId: number) => `/deal-pipelines/${pipelineId}/transitions`,
  TRANSITION: (pipelineId: number, transitionId: number) =>
    `/deal-pipelines/${pipelineId}/transitions/${transitionId}`,
};
