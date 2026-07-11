const FIELD_MAP = {};
export function applyFieldErrors(errors, message, field, setFieldError) {
    if (field && message) {
        const mapped = FIELD_MAP[field] || field;
        setFieldError(mapped, message);
        return mapped;
    }
    if (errors && typeof errors === 'object') {
        let firstField = null;
        Object.entries(errors).forEach(([f, msgs]) => {
            const mapped = FIELD_MAP[f] || f;
            if (msgs?.length && !firstField)
                firstField = mapped;
            if (msgs?.length)
                setFieldError(mapped, msgs[0]);
        });
        return firstField;
    }
    if (message) {
        const lower = message.toLowerCase();
        if (lower.includes('title')) {
            setFieldError('title', message);
            return 'title';
        }
        if (lower.includes('description')) {
            setFieldError('description', message);
            return 'description';
        }
        if (lower.includes('date')) {
            setFieldError('scheduledDate', message);
            return 'scheduledDate';
        }
        if (lower.includes('time')) {
            setFieldError('scheduledTime', message);
            return 'scheduledTime';
        }
    }
    return null;
}
//# sourceMappingURL=applyFieldErrors.js.map