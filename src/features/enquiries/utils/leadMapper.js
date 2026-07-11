export function getLeadIds(leads) {
    return leads.map(item => item.leadId);
}
export function mapApiToUI(item) {
    return {
        id: item.id,
        leadId: item.leadId,
        name: item.name,
        phone: item.phone,
        countryCode: item.countryCode ?? '',
        email: item.email ?? '',
        location: item.location ?? '',
        address: item.address ?? '',
        assignedTo: item.agent ?? item.assignedTo ?? '',
        purpose: item.purpose ?? '',
        type: item.type ?? '',
        status: item.status ?? '',
        source: item.source ?? '',
        createdAt: item.createdAt ?? '',
        updatedAt: item.updatedAt ?? '',
        nextFollowUp: item.nextFollowUpDate ?? '',
        additionalFields: item.additionalFields ?? [],
    };
}
//# sourceMappingURL=leadMapper.js.map