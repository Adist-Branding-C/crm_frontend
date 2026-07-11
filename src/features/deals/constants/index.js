export const initialDealFilters = {
    status: '',
    type: '',
    dateRange: { start: '', end: '' },
    assignedTo: '',
};
export const dealColumns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: 'dealId', label: 'Deal Id', sortable: true },
    { key: 'dealName', label: 'Deal Name', sortable: true },
    { key: 'lead', label: 'Lead', sortable: true },
    { key: 'mobile', label: 'Mobile', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'endDate', label: 'End Date', sortable: true },
    { key: 'agent', label: 'Agent', sortable: true },
    { key: 'createdBy', label: 'Created By', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
];
export const sampleDeals = [
    { id: 1, dealId: 'DL001', dealName: 'Website Development', lead: 'Rahul Sharma', mobile: '9876543210', amount: 150000, status: 'win', type: 'sales', startDate: '2024-01-15', endDate: '2024-02-15', agent: 'John Doe', createdBy: 'Admin', createdAt: '2024-01-10' },
    { id: 2, dealId: 'DL002', dealName: 'CRM Implementation', lead: 'Priya Patel', mobile: '9876543211', amount: 200000, status: 'pending', type: 'sales', startDate: '2024-01-20', endDate: '2024-03-20', agent: 'Jane Smith', createdBy: 'Admin', createdAt: '2024-01-12' },
    { id: 3, dealId: 'DL003', dealName: 'Annual Maintenance', lead: 'Amit Kumar', mobile: '9876543212', amount: 50000, status: 'invoice', type: 'renewal', startDate: '2024-02-01', endDate: '2024-02-28', agent: 'Mike Johnson', createdBy: 'Admin', createdAt: '2024-01-14' },
];
//# sourceMappingURL=index.js.map