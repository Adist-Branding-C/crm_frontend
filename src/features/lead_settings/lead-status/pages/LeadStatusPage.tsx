import { useLeadStatusData } from '../hooks/useLeadStatusData';
import AdminToolbar from '../../../../shared/components/crud/AdminToolbar';
import { Table, TableHeader, TableBody, TableRow, TableActions, TablePagination } from '../../../../shared/components/Table';
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { leadTabs } from '../../../../shared/constants/navigation';
import './LeadStatusPage.css';
import { formFields, columns } from '../constants';

const LeadStatusPage = () => {
  const d = useLeadStatusData();

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Status" description="Manage lead statuses and conversion metrics" />
      <SettingsTabs items={leadTabs} />
      <div className="table-container">
        <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Status" />
        <Table>
          <TableHeader columns={columns} />
          <TableBody skeletonCols={columns.length}>
            {d.paginatedData.map((item, idx) => (
              <tr key={item.id}>
                <td>{d.startIndex + idx + 1}</td>
                {columns.map(col => (
                  <TableRow key={col.key} item={item} column={col} />
                ))}
                <td>
                  <TableActions item={item} dropdownOpen={d.dropdownOpen}
                    onToggleDropdown={d.setDropdownOpen} onEdit={d.handleEdit}
                    onDelete={d.handleDeleteClick} />
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
        <TablePagination currentPage={d.currentPage} totalPages={d.totalPages}
          startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.filteredData.length}
          onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
          prevNextOnly={true} />
      </div>
      <AdminFormDrawer isOpen={d.showForm} title="Status" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.status} itemType="status"
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default LeadStatusPage;
