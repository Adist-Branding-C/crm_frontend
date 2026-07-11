export function getCreatedByLabel(createdBy) {
    if (!createdBy)
        return '-';
    if (typeof createdBy === 'string')
        return createdBy;
    return createdBy.name || createdBy.agentId || String(createdBy.id ?? '') || '-';
}
export function computeSlNo(index, currentPage, rowsPerPage) {
    return (currentPage - 1) * rowsPerPage + index + 1;
}
export function getCampaignTypeBadgeClass(type) {
    return `badge badge-${type.toLowerCase().replace(/ /g, '-')}`;
}
//# sourceMappingURL=campaign.utils.js.map