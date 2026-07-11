export function parseApiError(err) {
    if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        const data = axiosErr.response?.data;
        return {
            message: data?.message || 'Network error. Please try again.',
            ...(data?.errors ? { errors: data.errors } : {}),
            ...(data?.field ? { field: data.field } : {}),
        };
    }
    if (err && typeof err === 'object' && 'message' in err) {
        return { message: err.message };
    }
    return { message: 'Network error. Please try again.' };
}
//# sourceMappingURL=parseApiError.js.map