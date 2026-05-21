import { useState } from 'react';
import { Plus, MoreHorizontal, Edit2, Trash2, Search, X } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import '../../../pages/Account.css';

interface Role {
  id: number;
  name: string;
  permissions: string;
  createdAt: string;
  status: string;
}

const rolesData: Role[] = [
  { id: 1, name: 'Admin', permissions: 'All Access', createdAt: '2025-11-05', status: 'Active' },
  { id: 2, name: 'Manager', permissions: '25 permissions', createdAt: '2025-11-05', status: 'Active' },
  { id: 3, name: 'Staff', permissions: '15 permissions', createdAt: '2025-11-05', status: 'Active' },
];

const permissionsData: Record<string, { name: string; actions: string[] }[]> = {
  CRM: [
    { name: 'Home', actions: ['View'] },
    { name: 'Dashboard', actions: ['View', 'Dashboard'] },
    { name: 'Change Password', actions: ['View', 'Store'] },
    { name: 'Profile', actions: ['View', 'Show', 'Update'] },
    { name: 'Settings', actions: ['View'] },
    { name: 'User Data', actions: ['Update'] },
    { name: 'MailConfiguration', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data', 'Activate', 'Deactivate', 'Default'] },
    { name: 'Designations', actions: ['List', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Agent', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'View Dashboard', 'Location History', 'Location map', 'View Data'] },
    { name: 'Leads', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data', 'Import Page', 'TimeLine', 'Edit', 'TimeLine Edit', 'TimeLine Update', 'TimeLine Add Note', 'TimeLine Delete', 'Multiple Delete', 'Update lead profile', 'Timeline status change', 'Import Step1', 'Import step2', 'Import step3'] },
    { name: 'Activity', actions: ['View'] },
    { name: 'Facebook Leads', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Calendar', actions: ['List', 'Create', 'View', 'Edit'] },
    { name: 'Group', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Auto Assign', actions: ['List', 'Create', 'Store'] },
    { name: 'Assign To Agent', actions: ['Assign', 'Assign to Multiple'] },
    { name: 'Enquiry Source', actions: ['List', 'Store', 'View', 'Update', 'Delete', 'Data', 'Activate', 'Deactivate'] },
    { name: 'Enquiry Purpose', actions: ['List', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Enquiry Status', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Export', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Whatsapp Template', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data', 'Choose template'] },
    { name: 'SMS Templates', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Email Template', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Lead Types', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Fields', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Followup', actions: ['List', 'Add', 'Update', 'Data'] },
    { name: 'Tasks', actions: ['List', 'Data', 'Import', 'Import Data', 'Delete Multiple', 'Delete', 'Create from Timeline', 'Update', 'Show'] },
    { name: 'Task Category', actions: ['List', 'Data', 'Create', 'Edit', 'Update', 'Store', 'Delete'] },
    { name: 'Calls', actions: ['List', 'Complete Call', 'Complete call push', 'Complete multiple task'] },
    { name: 'Timeline', actions: ['Add Log'] },
    { name: 'Deals', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Get deal data', 'Update timeline data', 'Deal activity', 'Assign deal agent', 'Deal timeline note', 'Get deal note', 'Edit', 'Get Lead Company'] },
    { name: 'Reports', actions: ['Lead Reports', 'Deal Reports', 'Task Reports', 'Checking report', 'Attendance', 'Checking data', 'Attandance list', 'Attandace details'] },
    { name: 'Lead Reports', actions: ['Daily activity', 'Activity Data', 'Status Vise', 'Status vise data', 'Status Change', 'Status change data', 'Source Change', 'Source change data', 'Staff checkin', 'Checkin data', 'Import History', 'Api History', 'History data'] },
    { name: 'Deal Reports', actions: ['Deal Summary', 'Summary data', 'Deal Stage', 'Deal stage data', 'Lead conversion', 'Data'] },
    { name: 'Task Reports', actions: ['Task Vise', 'Data fetch', 'Lead vise', 'Data get'] },
    { name: 'Timeline Activities', actions: ['View Tasks', 'View Deals', 'View Activities', 'View Log Notes', 'View Orders', 'Update Tasks'] },
  ],
  SMS: [
    { name: 'Sms Dashboard', actions: ['View'] },
    { name: 'Compose SMS', actions: ['Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Dynamic Messaging', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Sender Id', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data'] },
    { name: 'API Template', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'SMS History', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
  ],
  IVR: [
    { name: 'Ivr Dashboard', actions: ['View'] },
    { name: 'Ivr Flow', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data'] },
    { name: 'Ivr Call Logs', actions: ['List', 'View', 'Data'] },
  ],
  Sales: [
    { name: 'Sales Dashboard', actions: ['View'] },
    { name: 'Product', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data'] },
    { name: 'Product Category', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Tax', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Coupon', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    { name: 'Pos', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
  ],
};

const RolesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});

  const filteredRoles = rolesData.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePermissionChange = (module: string, action: string, checked: boolean) => {
    setPermissions(prev => {
      if (checked) {
        return { ...prev, [module + '-' + action]: true };
      } else {
        const { [module + '-' + action]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const handleSelectAll = (module: string, actions: string[]) => {
    const allChecked = actions.every(action => permissions[module + '-' + action]);
    setPermissions(prev => {
      const updated = { ...prev };
      actions.forEach(action => {
        updated[module + '-' + action] = !allChecked;
      });
      return updated;
    });
  };

  const checkAllSelected = (module: string, actions: string[]) => {
    return actions.every(action => permissions[module + '-' + action]);
  };

  const isChecked = (module: string, action: string) => {
    return !!permissions[module + '-' + action];
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingRole(null);
    setRoleName('');
    setPermissions({});
  };

  const handleEditClick = (role: Role) => {
    setShowForm(true);
    setEditingRole(role);
    setRoleName(role.name);
    setPermissions({});
  };

  const handleBackClick = () => {
    setShowForm(false);
    setEditingRole(null);
    setRoleName('');
    setPermissions({});
  };

  const handleDeleteClick = (role: Role) => {
    setDeletingRole(role);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setDeletingRole(null);
  };

  const handleCloseDeleteModal = () => {
    setDeletingRole(null);
  };

  return (
    <div className="account-page">
      <PageHeader
        title="Roles"
        description="Create and manage user roles and permissions"
        action={
          <button className="btn btn-primary" onClick={handleAddClick}>
            <Plus size={16} /> Add Role
          </button>
        }
      />

      <SettingsTabs />

      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        {!showForm ? (
          <>
            <div className="table-container">
              <div className="table-header-controls">
                <div className="entries-select">
                  <label>Show
                    <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    entries
                  </label>
                </div>
                <div className="search-input">
                  <Search size={16} />
                  <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>

              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Role Name</th>
                      <th>Permissions</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoles.slice(0, rowsPerPage).map((role, index) => (
                      <tr key={role.id}>
                        <td>{index + 1}</td>
                        <td>{role.name}</td>
                        <td>{role.permissions}</td>
                        <td>{role.createdAt}</td>
                        <td>
                          <span className={'status-badge status-' + role.status.toLowerCase()}>
                            {role.status}
                          </span>
                        </td>
                        <td>
                          <div className="dropdown-container">
                            <button className="dropdown-toggle" onClick={() => setDropdownOpen(dropdownOpen === role.id ? null : role.id)}>
                              <MoreHorizontal size={16} />
                            </button>
                            {dropdownOpen === role.id && (
                              <div className="dropdown-menu">
                                <a className="dropdown-item" onClick={() => handleEditClick(role)}><Edit2 size={14} /> Edit</a>
                                <a className="dropdown-item" onClick={() => handleDeleteClick(role)}><Trash2 size={14} /> Delete</a>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <div className="table-footer-left">
                  <span className="limit-text">Limit: {filteredRoles.length}/{filteredRoles.length}</span>
                </div>
                <div className="table-info">
                  Showing 1 to {Math.min(rowsPerPage, filteredRoles.length)} of {filteredRoles.length} entries
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="form-container">
            <div className="form-header">
              <h3>{editingRole ? 'Edit Role' : 'Create New Role'}</h3>
              <button className="btn btn-secondary" onClick={handleBackClick}>Cancel</button>
            </div>

            <div className="form-body">
              <div className="form-group">
                <label>Role Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="Enter role name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
              </div>

              <div className="permissions-section">
                <h4>Permissions</h4>
                {Object.entries(permissionsData).map(([module, permissionsList]) => (
                  <div key={module} className="permission-module">
                    <div className="module-header">
                      <h5>{module}</h5>
                    </div>
                    <div className="module-permissions">
                      {permissionsList.map((perm, permIdx) => (
                        <div key={permIdx} className="permission-group">
                          <div className="permission-header">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={'select-all-' + module + '-' + permIdx}
                                checked={checkAllSelected(perm.name, perm.actions)}
                                onChange={() => handleSelectAll(perm.name, perm.actions)}
                              />
                              <label className="form-check-label" htmlFor={'select-all-' + module + '-' + permIdx}>
                                {perm.name}
                              </label>
                            </div>
                          </div>
                          <div className="permission-actions">
                            {perm.actions.map((action, actionIdx) => (
                              <div key={actionIdx} className="form-check">
                                <input
                                  type="checkbox"
                                  className="permission form-check-input"
                                  id={'permission-' + module + '-' + permIdx + '-' + actionIdx}
                                  checked={isChecked(perm.name, action)}
                                  onChange={(e) => handlePermissionChange(perm.name, action, e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor={'permission-' + module + '-' + permIdx + '-' + actionIdx}>
                                  {action}
                                </label>
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
                  {editingRole ? 'Update Role' : 'Save Role'}
                </button>
                <button type="button" className="btn btn-secondary ms-2 px-4" onClick={handleBackClick}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {deletingRole && (
        <div className="modal-overlay" onClick={handleCloseDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <button className="modal-close" onClick={handleCloseDeleteModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="delete-warning">
                Are you sure you want to delete <strong>{deletingRole.name}</strong> role?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPage;
