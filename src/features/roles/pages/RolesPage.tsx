import { Plus, MoreHorizontal, Edit2, Trash2, X } from 'lucide-react';
import { useRolesData } from '../hooks/useRolesData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import './RolesPage.css';
import { columns } from '../constants';
import { permissionsData } from '../constants/permissions';

const RolesPage = () => {
  const d = useRolesData();

  return (
    <div className="account-page">
      <PageHeader title="Roles" description="Create and manage user roles and permissions" />

      <SettingsTabs />

      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        {!d.showForm ? (
          <>
            <div className="table-container">
              <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery}
                onAdd={d.handleAddClick} addLabel="Add Role" />
              <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
                dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
                onEdit={d.handleEditClick} onDelete={(item) => { d.handleDeleteClick(item); }} />
              <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
                startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.filteredData.length}
                onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange} />
            </div>
          </>
        ) : (
          <div className="form-container">
            <div className="form-header">
              <h3>{d.editingItem ? 'Edit Role' : 'Create New Role'}</h3>
              <button className="btn btn-secondary" onClick={d.handleBackClick}>Cancel</button>
            </div>
            <div className="form-body">
              <div className="form-group">
                <label>Role Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="Enter role name"
                  value={d.roleName} onChange={(e) => d.setRoleName(e.target.value)} />
              </div>
              <div className="permissions-section">
                <h4>Permissions</h4>
                {Object.entries(permissionsData).map(([module, permsList]) => (
                  <div key={module} className="permission-module">
                    <div className="module-header"><h5>{module}</h5></div>
                    <div className="module-permissions">
                      {permsList.map((perm, pIdx) => (
                        <div key={pIdx} className="permission-group">
                          <div className="permission-header">
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input"
                                id={'select-all-' + module + '-' + pIdx}
                                checked={d.checkAllSelected(perm.name, perm.actions)}
                                onChange={() => d.handleSelectAll(perm.name, perm.actions)} />
                              <label className="form-check-label" htmlFor={'select-all-' + module + '-' + pIdx}>{perm.name}</label>
                            </div>
                          </div>
                          <div className="permission-actions">
                            {perm.actions.map((action, aIdx) => (
                              <div key={aIdx} className="form-check">
                                <input type="checkbox" className="permission form-check-input"
                                  id={'permission-' + module + '-' + pIdx + '-' + aIdx}
                                  checked={d.isChecked(perm.name, action)}
                                  onChange={(e) => d.handlePermissionChange(perm.name, action, e.target.checked)} />
                                <label className="form-check-label"
                                  htmlFor={'permission-' + module + '-' + pIdx + '-' + aIdx}>{action}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary px-4">
                  {d.editingItem ? 'Update Role' : 'Save Role'}
                </button>
                <button type="button" className="btn btn-secondary ms-2 px-4" onClick={d.handleBackClick}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.name}
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default RolesPage;
