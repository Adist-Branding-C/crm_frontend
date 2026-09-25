export interface GetPipelineParams {
  search?: string | undefined;
  fromDate?: string | undefined;
  toDate?: string | undefined;
  agent?: string | undefined;
  // Scopes the Kanban to one pipeline's stages (Deal or Lead - the backend
  // respects this for both; Task has no pipeline concept). Omit to fall
  // back to the company's default pipeline. This unified board page
  // doesn't currently expose a picker for it - PipelineMapper.toQueryParams
  // never sends it - but the Leads page's own embedded Kanban tab
  // (EnquiriesPage) does, via its own params, not this mapper.
  pipelineId?: number | undefined;
}
