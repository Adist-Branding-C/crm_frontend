import type { LabelValuePair } from '../../../shared/types/common';
import type { DealStageFormData } from '../types/request';

export const DEAL_OUTCOME_OPTIONS: LabelValuePair[] = [
  { value: 'OPEN', label: 'Open' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
];

/** Default swatch offered per outcome when a stage is created - purely a
 * starting suggestion, the color picker lets an admin pick any hex value. */
export const DEFAULT_STAGE_COLOR_BY_OUTCOME: Record<string, string> = {
  OPEN: '#2563eb',
  WON: '#059669',
  LOST: '#dc2626',
};

export const ADD_STAGE_INITIAL_VALUES: DealStageFormData = {
  name: '',
  probability: 20,
  outcome: 'OPEN',
  color: DEFAULT_STAGE_COLOR_BY_OUTCOME.OPEN ?? '#2563eb',
};

/** Horizontal fallback layout for stages that have never been dragged
 * (positionX/positionY null) - spaced by sortOrder, not by id, so a newly
 * inserted stage lands after the ones an admin already arranged. */
export const CANVAS_AUTO_LAYOUT = {
  NODE_WIDTH: 220,
  NODE_GAP_X: 260,
  START_Y: 120,
};
