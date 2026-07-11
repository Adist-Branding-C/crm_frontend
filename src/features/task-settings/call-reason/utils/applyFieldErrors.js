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
        if (lower.includes('name')) {
            setFieldError('name', message);
            return 'name';
        }
    }
    return null;
}
//# sourceMappingURL=applyFieldErrors.js.map