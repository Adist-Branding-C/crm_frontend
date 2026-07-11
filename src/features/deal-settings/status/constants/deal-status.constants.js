export const ADD_DEAL_STATUS_INITIAL_VALUES = {
    name: '',
    status: '',
};
export const DEAL_STATUS_FORM_FIELDS = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter deal status name' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
        ] },
];
//# sourceMappingURL=deal-status.constants.js.map