export const ADD_DEAL_TYPE_INITIAL_VALUES = {
    name: '',
    status: '',
};
export const DEAL_TYPE_FORM_FIELDS = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter deal type name' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
        ] },
];
//# sourceMappingURL=deal-type.constants.js.map