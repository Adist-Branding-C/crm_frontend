// TODO: salesAgents should be fetched from backend instead of hardcoded.
// Backend returns agent as a string field on each deal.
export const salesAgents = [
    { id: 1, name: 'All Agents' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Mike Johnson' },
    { id: 5, name: 'Emily Brown' },
];
// TODO: dealTypes has no backend equivalent. Disabled filter. Awaiting backend field.
export const dealTypes = [
    { id: 1, name: 'All Types' },
    { id: 2, name: 'New Business' },
    { id: 3, name: 'Renewal' },
    { id: 4, name: 'Expansion' },
    { id: 5, name: 'Upsell' },
];
// Column header colors keyed by statusId from backend
export const DEAL_STAGE_COLORS = {
    1: '#6366f1',
    2: '#8b5cf6',
    3: '#06b6d4',
    4: '#f59e0b',
    5: '#f97316',
    6: '#10b981',
    7: '#ef4444',
};
export const PIPELINE_PAGINATION_LIMIT = 15;
export function stageColor(id) {
    return DEAL_STAGE_COLORS[id] ?? '#6b7280';
}
const TASK_STAGE_COLORS = {
    Pending: '#f59e0b',
    'In Progress': '#3b82f6',
    Completed: '#10b981',
    'On Hold': '#f97316',
    Cancelled: '#ef4444',
};
export function taskStageColor(status) {
    return TASK_STAGE_COLORS[status] ?? '#6b7280';
}
//# sourceMappingURL=index.js.map