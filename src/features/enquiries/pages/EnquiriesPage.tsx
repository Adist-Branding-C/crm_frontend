import { Eye, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import LeadDetailDrawer from '../../../components/LeadDetailDrawer';
import {
  Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell,
  ActionMenu, TablePagination, TableWrapper,
  useTablePagination, useTableSort,
} from '../../../shared/components/table';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useLeadsFetch } from '../hooks/useLeadsFetch';
import { useEnquiriesFilter } from '../hooks/useEnquiriesFilter';
import { useEnquiriesActions } from '../hooks/useEnquiriesActions';
import { useEnquiriesUI } from '../hooks/useEnquiriesUI';
import { COLUMNS } from '../constants';
import SearchBox from '../../../shared/components/toolbar/SearchBox';
import FilterButton from '../../../shared/components/toolbar/FilterButton';
import SortDropdown from '../../../shared/components/toolbar/SortDropdown';
import ActionsDropdown from '../../../shared/components/toolbar/ActionsDropdown';
import AddLeadButton from '../../../shared/components/toolbar/AddLeadButton';
import EnquiriesFilters from '../components/EnquiriesFilters';
import './EnquiriesPage.css';

const EnquiriesPage = () => {
  const pagination = useTablePagination();
  const sort = useTableSort(pagination.resetPage);
  const filter = useEnquiriesFilter(pagination.resetPage);

  const { leads, isLoading, error, totalItems, totalPages, refetch } = useLeadsFetch({
    debouncedSearch: filter.debouncedSearch,
    filters: filter.filters,
    sortConfig: sort.sortConfig,
    currentPage: pagination.currentPage,
    rowsPerPage: pagination.rowsPerPage,
  });
  
  const actions = useEnquiriesActions(refetch);
  const ui = useEnquiriesUI();
  const { selectedIds, handleSelectAll, handleSelectRow } = useTableSelection<string>();

  return (
    <PageContainer>
      <PageHeader title="Leads" description="Potential customers showing interest in a product or service." />

      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <SearchBox searchQuery={filter.searchQuery} onSearchChange={filter.setSearchQuery} />
          <FilterButton showFilters={ui.showFilters} onClick={() => ui.setShowFilters(!ui.showFilters)} />
          <SortDropdown
            sortConfig={sort.sortConfig}
            showDropdown={ui.showSortDropdown}
            dropdownClosing={ui.sortDropdownClosing}
            dropdownRef={ui.sortDropdownRef}
            onOpen={ui.openSortDropdown}
            onClose={ui.closeSortDropdown}
            onSortAsc={sort.handleSortAsc}
            onSortDesc={sort.handleSortDesc}
          />
          <ActionsDropdown
            showDropdown={ui.showActionsDropdown}
            dropdownClosing={ui.actionsDropdownClosing}
            dropdownRef={ui.actionsDropdownRef}
            onOpen={ui.openActionsDropdown}
            onClose={ui.closeActionsDropdown}
          />
        </div>
        <div className="toolbar-right">
          <AddLeadButton onClick={() => ui.setIsDrawerOpen(true)} />
        </div>
      </div>

      {ui.showFilters && (
        <EnquiriesFilters
          filters={filter.filters}
          onFilterChange={filter.setFilters}
          onClearFilters={filter.clearFilters}
          onClose={() => ui.setShowFilters(false)}
        />
      )}

      <TableWrapper isLoading={isLoading} error={error} columns={COLUMNS.length} isEmpty={!isLoading && !error && leads.length === 0} emptyMessage="No enquiries found">
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS.map(col => (
                <TableHeaderCell
                  key={col.key}
                  isCheckbox={col.key === 'checkbox'}
                  sortable={!!col.sortable}
                  sortKey={col.key}
                  sortConfig={sort.sortConfig}
                  onSort={sort.handleSort}
                  checked={leads.length > 0 && selectedIds.length === leads.length}
                  onCheckboxChange={(checked) => handleSelectAll(leads.map(item => item.id), checked)}
                >
                  {col.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map(row => (
              <TableRow key={row.id} selected={selectedIds.includes(row.id)}>
                <TableCell>
                  <input type="checkbox" checked={selectedIds.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                </TableCell>
                <TableCell className="action-cell">
                  <ActionMenu
                    isOpen={ui.actionMenuOpen === row.id}
                    buttonRect={ui.actionMenuOpen === row.id ? ui.actionMenuButtonRect : null}
                    onToggle={(rect) => {
                      if (ui.actionMenuOpen === row.id) {
                        ui.setActionMenuOpen(null);
                        ui.setActionMenuButtonRect(null);
                      } else {
                        ui.setActionMenuOpen(row.id);
                        ui.setActionMenuButtonRect(rect);
                      }
                    }}
                    onClose={() => { ui.setActionMenuOpen(null); ui.setActionMenuButtonRect(null); }}
                  >
                    <button onClick={() => { ui.setActionMenuOpen(null); ui.setActionMenuButtonRect(null); }}>
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        ui.setActionMenuOpen(null);
                        ui.setActionMenuButtonRect(null);
                        if (window.confirm('Are you sure you want to delete this lead?')) actions.handleDeleteLead(row.id);
                      }}
                      className="delete"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                    <button
                      onClick={() => { ui.setActionMenuOpen(null); ui.setActionMenuButtonRect(null); ui.setSelectedLead(row); }}
                      className="whatsapp"
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </ActionMenu>
                </TableCell>
                <TableCell className="lead-name-cell" onClick={() => ui.setSelectedLead(row)}>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.agentId}</TableCell>
                <TableCell>{row.purpose?.purpose || '-'}</TableCell>
                <TableCell>
                  <span className={`badge badge-${(row.type?.type || '').toLowerCase().replace(/\s+/g, '-')}`}>
                    {row.type?.type || '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`badge badge-${(row.status?.status || '').toLowerCase()}`}>
                    {row.status?.status || '-'}
                  </span>
                </TableCell>
                <TableCell>{row.source?.source || '-'}</TableCell>
                <TableCell>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}</TableCell>
                <TableCell>{row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : '-'}</TableCell>
                <TableCell>{row.nextFollowUpDate ? new Date(row.nextFollowUpDate).toLocaleDateString() : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          startIndex={pagination.startIndex}
          rowsPerPage={pagination.rowsPerPage}
          totalItems={totalItems}
          onPageChange={pagination.setCurrentPage}
          onRowsPerPageChange={pagination.handleRowsPerPageChange}
        />
      </TableWrapper>

      <AddLeadDrawer isOpen={ui.isDrawerOpen} onClose={() => ui.setIsDrawerOpen(false)} onSuccess={refetch} />
      <LeadDetailDrawer lead={ui.selectedLead} isOpen={!!ui.selectedLead} onClose={() => ui.setSelectedLead(null)} />
    </PageContainer>
  );
};

export default EnquiriesPage;
