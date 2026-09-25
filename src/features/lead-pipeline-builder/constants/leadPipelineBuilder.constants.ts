import type { LeadStageFormData } from '../types/request';

export const ADD_STAGE_INITIAL_VALUES: LeadStageFormData = {
  status: '',
  color: '#2563eb',
  conversion: false,
};

/** Horizontal fallback layout for stages that have never been dragged
 * (positionX/positionY null) - spaced by sortOrder, not by id, so a newly
 * inserted stage lands after the ones an admin already arranged. */
export const CANVAS_AUTO_LAYOUT = {
  NODE_WIDTH: 220,
  NODE_GAP_X: 260,
  START_Y: 120,
};
