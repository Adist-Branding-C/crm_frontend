export function formatAddedBy(name, type) {
    const trimmedName = name?.trim();
    const label = type ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() : '';
    if (trimmedName && label)
        return `${trimmedName} ${label}`;
    if (trimmedName)
        return trimmedName;
    if (label)
        return label;
    return '-';
}
//# sourceMappingURL=addedBy.util.js.map