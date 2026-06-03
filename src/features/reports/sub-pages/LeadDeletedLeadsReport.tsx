import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, RotateCcw } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import { useDeletedLeadsData } from '../hooks/useDeletedLeadsData';
import DeletedLeadsToolbar from '../components/DeletedLeadsToolbar';
import DeletedLeadsFilters from '../components/DeletedLeadsFilters';
import './ReportsSubPages.css';

const LeadDeletedLeadsReport = () => {
  const d = useDeletedLeadsData();

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Leads" description="View and restore previously deleted leads" />

      <DeletedLeadsToolbar
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
        showFilters={d.showFilters}
        onToggleFilters={() => d.setShowFilters(!d.showFilters)}
        sortConfig={d.sortConfig}
        showSortDropdown={d.showSortDropdown}
        sortDropdownClosing={d.sortDropdownClosing}
        sortDropdownRef={d.sortDropdownRef}
        onSetShowSortDropdown={d.setShowSortDropdown}
        onCloseSortDropdown={d.closeSortDropdown}
        onSortDesc={d.handleSortDesc}
        onSortAsc={d.handleSortAsc}
        selectedCount={d.selectedIds.length}
        onRecoverAll={d.handleRecoverAll}
      />

      {d.showFilters && (
        <DeletedLeadsFilters
          filters={d.filters}
          onFilterChange={d.setFilters}
          onClearFilters={d.clearFilters}
          onClose={() => d.setShowFilters(false)}
        />
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={d.paginatedData.length > 0 && d.selectedIds.length === d.paginatedData.length}
                onChange={(e) => d.handleSelectAll(d.paginatedData.map(x => x.id), e.target.checked)} /></th>
              <th>Action</th>
              <th onClick={() => d.handleSort('name')} className="sortable">Name {d.sortConfig.key === 'name' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('phone')} className="sortable">Phone {d.sortConfig.key === 'phone' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('location')} className="sortable">Location {d.sortConfig.key === 'location' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('assignedTo')} className="sortable">Assigned To {d.sortConfig.key === 'assignedTo' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('purpose')} className="sortable">Purpose {d.sortConfig.key === 'purpose' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('type')} className="sortable">Type {d.sortConfig.key === 'type' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('status')} className="sortable">Status {d.sortConfig.key === 'status' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('source')} className="sortable">Source {d.sortConfig.key === 'source' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('createdAt')} className="sortable">Created At {d.sortConfig.key === 'createdAt' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th onClick={() => d.handleSort('deletedAt')} className="sortable">Deleted At {d.sortConfig.key === 'deletedAt' && (d.sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</th>
              <th>Delete Reason</th>
            </tr>
          </thead>
          <tbody>
            {d.paginatedData.map(row => (
              <tr key={row.id} className={d.selectedIds.includes(row.id) ? 'selected' : ''}>
                <td><input type="checkbox" checked={d.selectedIds.includes(row.id)} onChange={() => d.handleSelectRow(row.id)} /></td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      if (d.actionMenuOpen === row.id) { d.setActionMenuOpen(null); d.setActionMenuButtonRect(null); }
                      else { d.setActionMenuOpen(row.id); d.setActionMenuButtonRect(rect); }
                    }}>
                      <MoreHorizontal size={16} />
                    </button>
                    {d.actionMenuOpen === row.id && d.actionMenuButtonRect && (
                      <ActionDropdownPortal isOpen={d.actionMenuOpen === row.id} buttonRect={d.actionMenuButtonRect}
                        onClose={() => { d.setActionMenuOpen(null); d.setActionMenuButtonRect(null); }}>
                        <button onClick={() => { d.handleRecoverLead(row.id); d.setActionMenuOpen(null); d.setActionMenuButtonRect(null); }}>
                          <RotateCcw size={14} /> Recover
                        </button>
                      </ActionDropdownPortal>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell" onClick={() => d.setSelectedLead(row)}>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.location}</td>
                <td>{row.assignedTo}</td>
                <td>{row.purpose}</td>
                <td><span className={`badge badge-${row.type.toLowerCase().replace(' ', '-')}`}>{row.type}</span></td>
                <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                <td>{row.source}</td>
                <td>{row.createdAt}</td>
                <td>{row.deletedAt}</td>
                <td>{row.deleteReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminPagination
        currentPage={d.currentPage}
        totalPages={d.totalPages}
        startIndex={d.startIndex}
        rowsPerPage={d.rowsPerPage}
        totalItems={d.filteredData.length}
        onPageChange={d.setCurrentPage}
        onRowsPerPageChange={d.handleRowsPerPageChange}
      />

      <LeadDetailDrawer lead={d.selectedLead} isOpen={!!d.selectedLead} onClose={() => d.setSelectedLead(null)} />
    </div>
  );
};

export default LeadDeletedLeadsReport;
