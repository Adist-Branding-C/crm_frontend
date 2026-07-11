export function formatDisplayDate(dateStr) {
    if (!dateStr)
        return '-';
    return new Date(dateStr).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).replace(',', '');
}
//# sourceMappingURL=date.utils.js.map