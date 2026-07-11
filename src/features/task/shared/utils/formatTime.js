export const formatTime = (time) => {
    if (!time)
        return '-';
    const parts = time.split(':');
    if (parts.length < 2)
        return '-';
    const h = parseInt(parts[0], 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${parts[1]} ${ampm}`;
};
//# sourceMappingURL=formatTime.js.map