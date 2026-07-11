export const SAMPLE_LEADS = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', assignedTo: 'John Doe', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-15', updatedAt: '2024-01-20', nextFollowUp: '2024-01-25' },
    { id: 2, name: 'Priya Patel', phone: '9876543211', assignedTo: 'Jane Smith', purpose: 'Support', type: 'Cold Lead', status: 'Pending', source: 'Referral', createdAt: '2024-01-14', updatedAt: '2024-01-19', nextFollowUp: '2024-01-26' },
    { id: 3, name: 'Amit Kumar', phone: '9876543212', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-13', updatedAt: '2024-01-18', nextFollowUp: '2024-01-24' },
    { id: 4, name: 'Sneha Reddy', phone: '9876543213', assignedTo: 'Mike Johnson', purpose: 'Demo', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-12', updatedAt: '2024-01-17', nextFollowUp: '2024-01-23' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-11', updatedAt: '2024-01-16', nextFollowUp: '2024-01-22' },
    { id: 6, name: 'Ananya Gupta', phone: '9876543215', assignedTo: 'John Doe', purpose: 'Support', type: 'Warm Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-10', updatedAt: '2024-01-15', nextFollowUp: '2024-01-21' },
    { id: 7, name: 'Rajesh Verma', phone: '9876543216', assignedTo: 'Mike Johnson', purpose: 'Sales', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-09', updatedAt: '2024-01-14', nextFollowUp: '2024-01-20' },
    { id: 8, name: 'Kavitha Nair', phone: '9876543217', assignedTo: 'Jane Smith', purpose: 'Demo', type: 'Cold Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-08', updatedAt: '2024-01-13', nextFollowUp: '2024-01-19' },
    { id: 9, name: 'Arun Pillai', phone: '9876543218', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Referral', createdAt: '2024-01-07', updatedAt: '2024-01-12', nextFollowUp: '2024-01-18' },
    { id: 10, name: 'Lakshmi Menon', phone: '9876543219', assignedTo: 'Mike Johnson', purpose: 'Support', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-06', updatedAt: '2024-01-11', nextFollowUp: '2024-01-17' },
    { id: 11, name: 'Suresh Iyer', phone: '9876543220', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-05', updatedAt: '2024-01-10', nextFollowUp: '2024-01-16' },
    { id: 12, name: 'Meera Das', phone: '9876543221', assignedTo: 'John Doe', purpose: 'Demo', type: 'Warm Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-04', updatedAt: '2024-01-09', nextFollowUp: '2024-01-15' },
];
export const INITIAL_FILTERS = {
    type: '',
    status: '',
    source: '',
    assignedTo: '',
    dateRange: { start: '', end: '' },
};
export const COLUMNS = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'purpose', label: 'Purpose', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
    { key: 'updatedAt', label: 'Updated At', sortable: true },
    { key: 'nextFollowUp', label: 'Next Follow Up', sortable: true },
];
//# sourceMappingURL=index.js.map