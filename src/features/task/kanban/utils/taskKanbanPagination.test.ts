import { describe, expect, it } from 'vitest';
import { getKanbanLoadMoreState } from './taskKanbanPagination';

describe('getKanbanLoadMoreState', () => {
  it('hides the button when all items are already loaded', () => {
    expect(getKanbanLoadMoreState({ totalCount: 20, loadedCount: 20, defaultLimit: 10, hasNext: false })).toEqual({
      hasMore: false,
      remaining: 0,
      requestedLimit: 0,
    });
  });

  it('shows the final remaining item when one item is left', () => {
    expect(getKanbanLoadMoreState({ totalCount: 21, loadedCount: 20, defaultLimit: 10, hasNext: true })).toEqual({
      hasMore: true,
      remaining: 1,
      requestedLimit: 1,
    });
  });

  it('keeps one remaining item request within the final page', () => {
    expect(getKanbanLoadMoreState({ totalCount: 21, loadedCount: 10, defaultLimit: 10, hasNext: true })).toEqual({
      hasMore: true,
      remaining: 11,
      requestedLimit: 10,
    });
  });

  it('returns no more when the stage is empty', () => {
    expect(getKanbanLoadMoreState({ totalCount: 0, loadedCount: 0, defaultLimit: 10, hasNext: false })).toEqual({
      hasMore: false,
      remaining: 0,
      requestedLimit: 0,
    });
  });

  it('respects server pagination even when loaded count is less than total', () => {
    expect(getKanbanLoadMoreState({ totalCount: 30, loadedCount: 15, defaultLimit: 10, hasNext: false })).toEqual({
      hasMore: true,
      remaining: 15,
      requestedLimit: 10,
    });
  });
});
