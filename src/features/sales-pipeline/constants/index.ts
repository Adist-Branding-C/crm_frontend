import type { ActiveView } from '../types';

export const PIPELINE_PAGINATION_LIMIT = 15;

export const VIEW_EMPTY_MESSAGE: Record<ActiveView, string> = {
  deals: 'No deal stages configured for this pipeline yet.',
  leads: 'No lead stages configured for this pipeline yet.',
  tasks: 'No task stages configured for this pipeline yet.',
};
