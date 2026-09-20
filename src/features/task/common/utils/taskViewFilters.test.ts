import { describe, expect, it } from 'vitest';
import { buildKanbanTaskQuery, buildUnifiedTaskListQuery, getBoardTaskTotalCount } from './taskViewFilters';

describe('task view filter sync', () => {
  it('uses the same task-type and search filter for table and kanban query params', () => {
    const filters = { taskType: 'CALL', search: 'follow up' };

    expect(buildUnifiedTaskListQuery(filters, 1, 25)).toEqual({
      pageNumber: 1,
      limit: 25,
      search: 'follow up',
      taskType: 'CALL',
    });

    expect(buildKanbanTaskQuery(filters, 'workflow-42')).toEqual({
      workflowId: 'workflow-42',
      search: 'follow up',
      taskType: 'CALL',
    });
  });

  it('counts the full filtered board dataset instead of the current loaded page', () => {
    expect(getBoardTaskTotalCount([
      { count: 4 },
      { count: 3 },
      { count: 2 },
    ])).toBe(9);
  });
});
