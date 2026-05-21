import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, MessageSquare, Phone, ArrowUp, ArrowDown, SortAsc, SortDesc, Check } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import './EnquiriesPage.css';
import './DealsPage.css';
import './DealTasksPage.css';

interface DealItem {
  id: number;
  dealId: string;
  dealName: string;
  lead: string;
  mobile: string;
  amount: number;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  agent: string;
  createdBy: string;
  createdAt: string;
}

interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

interface FiltersState {
  status: string;
  type: string;
  dateRange: { start: string; end: string };
  assignedTo: string;
}

const sampleData: DealItem[] = [
  { id: 1, dealId: 'DL001', dealName: 'Website Development', lead: 'Rahul Sharma', mobile: '9876543210', amount: 150000, status: 'win', type: 'sales', startDate: '2024-01-15', endDate: '2024-02-15', agent: 'John Doe', createdBy: 'Admin', createdAt: '2024-01-10' },
  { id: 2, dealId: 'DL002', dealName: 'CRM Implementation', lead: 'Priya Patel', mobile: '9876543211', amount: 200000, status: 'pending', type: 'sales', startDate: '2024-01-20', endDate: '2024-03-20', agent: 'Jane Smith', createdBy: 'Admin', createdAt: '2024-01-12' },
  { id: 3, dealId: 'DL003', dealName: 'Annual Maintenance', lead: 'Amit Kumar', mobile: '9876543212', amount: 50000, status: 'invoice', type: 'renewal', startDate: '2024-02-01', endDate: '2024-02-28', agent: 'Mike Johnson', createdBy: 'Admin', createdAt: '2024-01-14' },
];

const DealsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<DealItem | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [deals, setDeals] = useState<DealItem[]>(sampleData);

  const [filters, setFilters] = useState<FiltersState>({
    status: '',
    type: '',
    dateRange: { start: '', end: '' },
    assignedTo: '',
  });

  const columns = [
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
    { key: 'createdAt', label: 'Created At', sortable: true }
  ];

  const filteredData = useMemo(() => {
    let data = [...deals];

    if (searchQuery) {
      data = data.filter(item =>
        item.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery) ||
        item.dealId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }
    if (filters.type) {
      data = data.filter(item => item.type === filters.type);
    }
    if (filters.assignedTo) {
      data = data.filter(item => item.agent === filters.assignedTo);
    }

    if (sortConfig.key) {
      const key = sortConfig.key as keyof DealItem;
      data.sort((a, b) => {
        if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchQuery, filters, sortConfig, deals]);

  const totalDealAmount = useMemo(() => {
    return filteredData.reduce((sum, deal) => sum + (Number(deal.amount) || 0), 0);
  }, [filteredData]);

  const totalDealsCount = filteredData.length;

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortDirection = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      type: '',
      dateRange: { start: '', end: '' },
      assignedTo: '',
    });
    setShowFilters(false);
  };

  const handleAddDeal = () => {
    setEditingDeal(null);
    setIsDrawerOpen(true);
  };

  const handleEditDeal = (deal: DealItem) => {
    setEditingDeal(deal);
    setIsDrawerOpen(true);
    setActionMenuOpen(null);
  };

  const handleSaveDeal = (data: { dealName: string; lead: string; mobile: string; amount: string; status: string; type: string; startDate: string; endDate: string; assignAgent: string }) => {
    if (editingDeal) {
      setDeals(prev => prev.map(deal =>
        deal.id === editingDeal.id
          ? { ...deal, dealName: data.dealName, lead: data.lead, mobile: data.mobile, amount: Number(data.amount), status: data.status, type: data.type, startDate: data.startDate, endDate: data.endDate, agent: data.assignAgent }
          : deal
      ));
    } else {
      const newDeal: DealItem = {
        id: Date.now(),
        dealId: `DL00${deals.length + 1}`,
        dealName: data.dealName,
        lead: data.lead,
        mobile: data.mobile,
        amount: Number(data.amount),
        status: data.status,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
        agent: data.assignAgent,
        createdBy: 'Admin',
        createdAt: new Date().toISOString().split('T')[0] ?? ''
      };
      setDeals(prev => [...prev, newDeal]);
    }
    setCurrentPage(1);
  };

  const handleDeleteDeal = (id: number) => {
    setDeals(prev => prev.filter(deal => deal.id !== id));
    setActionMenuOpen(null);
  };

  const handleExportCSV = () => {
    const headers = ['Deal Id', 'Deal Name', 'Lead', 'Mobile', 'Amount', 'Status', 'Type', 'Start Date', 'End Date', 'Agent', 'Created By', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(deal => [
        deal.dealId,
        `"${deal.dealName}"`,
        `"${deal.lead}"`,
        deal.mobile,
        deal.amount,
        deal.status,
        deal.type,
        deal.startDate,
        deal.endDate,
        deal.agent,
        deal.createdBy,
        deal.createdAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'deals.csv';
    link.click();
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      'win': 'deal-win',
      'lost': 'deal-lost',
      'invoice': 'deal-invoice',
      'pending': 'deal-pending'
    };
    const labelMap: Record<string, string> = {
      'win': 'Deal Win',
      'lost': 'Deal Lost',
      'invoice': 'Invoice',
      'pending': 'Pending'
    };
    return <span className={`badge badge-${statusMap[status] ?? ''}`}>{labelMap[status] ?? status}</span>;
  };

  const getTypeBadge = (type: string) => {
    const typeMap: Record<string, string> = {
      'sales': 'type-sales',
      'registration': 'type-registration',
      'renewal': 'type-renewal',
      'upsell': 'type-upsell'
    };
    const labelMap: Record<string, string> = {
      'sales': 'Sales',
      'registration': 'Registration',
      'renewal': 'Renewal',
      'upsell': 'Upsell'
    };
    return <span className={`badge badge-${typeMap[type] ?? ''}`}>{labelMap[type] ?? type}</span>;
  };

  const renderStatsRow = () => (
    <div className="deals-stats-row">
      <div className="stat-item">
        <span className="stat-label">Total Deal Amount:</span>
        <span className="stat-value">₹{totalDealAmount.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Total Deals Count:</span>
        <span className="stat-value">{totalDealsCount}</span>
      </div>
    </div>
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Deals" 
        description="Track sales opportunities, aiding management and conversion of potential customers." 
      />

      {renderStatsRow()}

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Filter
            <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
          </button>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowSortDropdown(!showSortDropdown)}>
              <ArrowUp size={16} />
              Sort By
              <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
            </button>
            {showSortDropdown && (
              <div className="premium-dropdown sort-dropdown dropup">
                <div className="dropdown-header">Sort By</div>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('createdAt'); handleSortDirection('createdAt', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Newest First</span>
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('createdAt'); handleSortDirection('createdAt', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Oldest First</span>
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'amount' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('amount'); handleSortDirection('amount', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Highest Amount</span>
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'amount' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('amount'); handleSortDirection('amount', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Lowest Amount</span>
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'startDate' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('startDate'); handleSortDirection('startDate', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Start Date (Newest)</span>
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'startDate' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('startDate'); handleSortDirection('startDate', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Start Date (Oldest)</span>
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'dealName' && sortConfig.direction === 'asc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('dealName'); handleSortDirection('dealName', 'asc'); setShowSortDropdown(false); }}
                >
                  <ArrowDown size={16} />
                  <span>Name (A-Z)</span>
                </button>
                <button 
                  className={`dropdown-item ${sortConfig.key === 'dealName' && sortConfig.direction === 'desc' ? 'selected' : ''}`}
                  onClick={() => { handleSort('dealName'); handleSortDirection('dealName', 'desc'); setShowSortDropdown(false); }}
                >
                  <ArrowUp size={16} />
                  <span>Name (Z-A)</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary" onClick={handleAddDeal}>
            <Plus size={16} />
            Deals
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All</option>
                <option value="win">Deal Win</option>
                <option value="lost">Deal Lost</option>
                <option value="invoice">Invoice</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Type</label>
              <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="">All</option>
                <option value="sales">Sales</option>
                <option value="registration">Registration</option>
                <option value="renewal">Renewal</option>
                <option value="upsell">Upsell</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range-input">
                <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
                <span>to</span>
                <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
              </div>
            </div>
            <div className="filter-group">
              <label>Assigned To</label>
              <select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
                <option value="">Select</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                  {col.key === 'checkbox' ? (
                    <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
                  ) : (
                    <>
                      {col.label}
                      {col.sortable && sortConfig.key === col.key && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && (
                      <div className="action-dropdown">
                        <button><Eye size={14} /> View Deal</button>
                        <button onClick={() => handleEditDeal(row)}><Edit2 size={14} /> Edit Deal</button>
                        <button><Phone size={14} /> WhatsApp</button>
                        <button><MessageSquare size={14} /> Message</button>
                        <button onClick={() => handleDeleteDeal(row.id)} className="delete"><Trash2 size={14} /> Delete</button>
                      </div>
                    )}
                  </div>
                </td>
                <td>{row.dealId}</td>
                <td className="lead-name-cell">{row.dealName}</td>
                <td>{row.lead}</td>
                <td>{row.mobile}</td>
                <td>₹{Number(row.amount).toLocaleString()}</td>
                <td>{getStatusBadge(row.status)}</td>
                <td>{getTypeBadge(row.type)}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
                <td>{row.agent}</td>
                <td>{row.createdBy}</td>
                <td>{row.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Show entries:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
      
      <AddDealDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingDeal(null);
        }} 
        deal={editingDeal ? {
          dealName: editingDeal.dealName,
          lead: editingDeal.lead,
          mobile: editingDeal.mobile,
          amount: String(editingDeal.amount),
          status: editingDeal.status,
          type: editingDeal.type,
          startDate: editingDeal.startDate,
          endDate: editingDeal.endDate,
          assignAgent: editingDeal.agent,
        } : null}
        onSave={handleSaveDeal}
      />
    </PageContainer>
  );
};

export default DealsPage;