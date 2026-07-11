// Generic Record -> query-string builder shared by every entity mapper's toQueryParams (crm-frontend-coding-standerd check #3).
export function buildQueryParams(params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
        }
    });
    return queryParams.toString();
}
//# sourceMappingURL=queryParams.util.js.map