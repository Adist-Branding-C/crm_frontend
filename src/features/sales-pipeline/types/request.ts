export interface GetPipelineParams {
  search?: string | undefined;
  fromDate?: string | undefined;
  toDate?: string | undefined;
  agent?: string | undefined;
  // Deal-only - scopes the Kanban to one pipeline's stages. Omit to fall
  // back to the company's default pipeline (Lead/Task ignore this param).
  pipelineId?: number | undefined;
}
