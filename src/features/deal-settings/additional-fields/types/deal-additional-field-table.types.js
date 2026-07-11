import { jsx as _jsx } from "react/jsx-runtime";
export const ADDITIONAL_FIELD_COLUMNS = [
    { key: 'field', label: 'Field' },
    { key: 'type', label: 'Type' },
    {
        key: 'inFilter',
        label: 'in filter',
        render: (item) => (_jsx("span", { className: `badge ${item.inFilter ? 'badge-success' : 'badge-secondary'}`, children: item.inFilter ? 'YES' : 'NO' })),
    },
    {
        key: 'inList',
        label: 'in list',
        render: (item) => (_jsx("span", { className: `badge ${item.inList ? 'badge-success' : 'badge-secondary'}`, children: item.inList ? 'YES' : 'NO' })),
    },
    {
        key: 'required',
        label: 'Required',
        render: (item) => (_jsx("span", { className: `badge ${item.required ? 'badge-success' : 'badge-secondary'}`, children: item.required ? 'YES' : 'NO' })),
    },
];
//# sourceMappingURL=deal-additional-field-table.types.js.map