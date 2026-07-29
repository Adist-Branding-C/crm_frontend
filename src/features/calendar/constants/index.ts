import type { Agent } from '../types';

// Real agents are fetched via useStaffOptions (see useCalendarData) and
// prepended with this sentinel - real Staff.id values are >= 1, so 0 can't
// collide with an actual agent.
export const ALL_AGENTS_ID = 0;
export const ALL_AGENTS: Agent = { id: ALL_AGENTS_ID, name: 'All Agents' };

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
