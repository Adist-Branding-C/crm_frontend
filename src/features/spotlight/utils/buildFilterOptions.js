export function buildFilterOptions(items) {
    const uniqueTypes = new Map();
    const uniqueSources = new Map();
    const uniquePurposes = new Map();
    const uniqueStatuses = new Map();
    const uniqueAgents = new Map();
    items.forEach(item => {
        uniqueTypes.set(item.typeId, item.type);
        uniqueSources.set(item.sourceId, item.source);
        uniquePurposes.set(item.purposeId, item.purpose);
        uniqueStatuses.set(item.statusId, item.status);
        if (item.agentId)
            uniqueAgents.set(item.agentId, item.agentName);
    });
    return {
        leadTypes: Array.from(uniqueTypes, ([v, l]) => ({ value: String(v), label: l })),
        sources: Array.from(uniqueSources, ([v, l]) => ({ value: String(v), label: l })),
        purposes: Array.from(uniquePurposes, ([v, l]) => ({ value: String(v), label: l })),
        statuses: Array.from(uniqueStatuses, ([v, l]) => ({ value: String(v), label: l })),
        agents: Array.from(uniqueAgents, ([v, l]) => ({ value: v, label: l })),
    };
}
//# sourceMappingURL=buildFilterOptions.js.map