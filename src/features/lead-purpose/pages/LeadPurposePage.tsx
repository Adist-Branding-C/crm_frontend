import { useLeadPurposeData } from '../hooks/useLeadPurposeData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import { Table, TableHeader, TableBody, TableRow, TableActions, TablePagination } from '../../../shared/components/Table';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import { leadTabs } from '../../../shared/constants/navigation';
import './LeadPurposePage.css';
import {  columns } from '../constants';
import { formFields } from '../../lead-status/constants';

const LeadPurposePage = () => {
  const d = useLeadPurposeData();

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Purpose" description="Define lead purposes" />
      <SettingsTabs items={leadTabs} />
      <div className="table-container">
        <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Lead Purpose" />
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
      <AdminFormDrawer isOpen={d.showForm} title="Lead Purpose" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.title} itemType="lead purpose"
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default LeadPurposePage;
