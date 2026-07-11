export function mapApiLeadToDisplay(api) {
    return {
        id: api.id,
        name: api.name,
        phone: api.phone,
        assignedTo: api.agentName || 'Unassigned',
        purpose: api.purpose,
        type: api.type,
        status: api.status,
        source: api.source,
        createdAt: api.createdAt,
        updatedAt: api.updatedAt,
        nextFollowUp: api.nextFollowUpDate ?? '',
    };
}
//# sourceMappingURL=leadMappers.js.map