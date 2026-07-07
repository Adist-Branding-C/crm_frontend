import { MoreHorizontal, Edit2, Trash2, Plus, Search, Loader2, Check, X } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import DrawerShell from '../../../shared/components/crud/DrawerShell';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { ACTION_SEARCH } from '../../../shared/constants/actionLabels';
import { MAIL_DRIVER_OPTIONS, ENCRYPTION_OPTIONS } from '../constants';
import { mailConfigValidationSchema } from '../validations/mailConfig.validation';
import { useMailConfigData } from '../hooks/useMailConfigData';
import './MailConfigPage.css';

const MailConfigPage = () => {
  const {
    isLoading,
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    drawerInitialValues,
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    dropdownOpen,
    setDropdownOpen,
    filteredData,
    toastMessage,
    toastType,
    showToast,
    setShowToast,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
    handleSubmit,
  } = useMailConfigData();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader
            title="Mail Configuration"
            description="Configure email settings"
            action={
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Config
              </button>
            }
          />

          <SettingsTabs />

          <div className="table-container">
            <div className="table-header-controls">
              <div className="entries-select">
                <label>Show
                  <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                    {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  entries
                </label>
              </div>
              <div className="search-input">
                <Search size={16} />
                <input
                  type="search"
                  placeholder={ACTION_SEARCH}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Driver/Host</th>
                    <th>Port/Encryption</th>
                    <th>Username</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="dataTables_empty">Loading...</td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="dataTables_empty">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    filteredData.slice(0, rowsPerPage).map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.driver} {item.host ? `(${item.host})` : ''}</td>
                        <td>{item.port}/{item.encryption || '-'}</td>
                        <td>{item.username || '-'}</td>
                        <td>{item.isActive ? 'Yes' : 'No'}</td>
                        <td>
                          <div className="dropdown-container">
                            <button
                              className="dropdown-toggle"
                              onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
                            >
                              <MoreHorizontal size={16} />
                            </button>
                            {dropdownOpen === item.id && (
                              <div className="dropdown-menu">
                                <a className="dropdown-item" onClick={() => handleEditClick(item)}>
                                  <Edit2 size={14} /> Edit
                                </a>
                                <a className="dropdown-item" onClick={() => handleDeleteClick(item)}>
                                  <Trash2 size={14} /> Delete
                                </a>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="table-info">
                {filteredData.length === 0
                  ? 'Showing 0 to 0 of 0 entries'
                  : `Showing 1 to ${Math.min(rowsPerPage, filteredData.length)} of ${filteredData.length} entries`
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <DrawerShell isOpen={showForm} title={editingItem ? 'Edit Mail Config' : 'Add Mail Config'} onClose={handleCloseForm}>
        <Formik
          enableReinitialize
          initialValues={drawerInitialValues}
          validationSchema={mailConfigValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, dirty, submitCount, isSubmitting }) => {
            const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
            const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

            return (
              <Form noValidate>
                <div className="form-group">
                  <label>Mail Driver <span className="text-danger">*</span></label>
                  <Field as="select" name="driver" className={fieldClass('driver')}>
                    <option value="">Select Driver</option>
                    {MAIL_DRIVER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </Field>
                  {showError('driver') && errors.driver && <small className="field-error-text">{errors.driver}</small>}
                </div>
                <div className="form-group">
                  <label>Host <span className="text-danger">*</span></label>
                  <Field type="text" name="host" className={fieldClass('host')} placeholder="mail.example.com" />
                  {showError('host') && errors.host && <small className="field-error-text">{errors.host}</small>}
                </div>
                <div className="form-group">
                  <label>Port <span className="text-danger">*</span></label>
                  <Field type="text" name="port" className={fieldClass('port')} placeholder="587" />
                  {showError('port') && errors.port && <small className="field-error-text">{errors.port}</small>}
                </div>
                <div className="form-group">
                  <label>Encryption</label>
                  <Field as="select" name="encryption" className="form-control">
                    <option value="">Select</option>
                    {ENCRYPTION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </Field>
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <Field type="text" name="username" className="form-control" placeholder="username" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <Field type="password" name="password" className="form-control" placeholder="password" />
                </div>
                <div className="form-group">
                  <label>From Email <span className="text-danger">*</span></label>
                  <Field type="email" name="fromEmail" className={fieldClass('fromEmail')} placeholder="noreply@example.com" />
                  {showError('fromEmail') && errors.fromEmail && <small className="field-error-text">{errors.fromEmail}</small>}
                </div>
                <div className="form-group">
                  <label>From Name</label>
                  <Field type="text" name="fromName" className="form-control" placeholder="Company Name" />
                </div>
                <div className="form-group form-check">
                  <Field type="checkbox" id="isActive" name="isActive" className="form-check-input" />
                  <label htmlFor="isActive" className="form-check-label">Active</label>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (!!editingItem && !dirty)}>
                    {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : (editingItem ? 'Update' : 'Save')}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Cancel</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DrawerShell>

      {deletingItem && (
        <div className="modal-overlay" onClick={() => setDeletingItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <button className="modal-close" onClick={() => setDeletingItem(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="delete-warning">
                Are you sure you want to delete this mail configuration?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={() => setDeletingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className={`toast-notification toast-${toastType}`} onClick={() => setShowToast(false)}>
          {toastType === 'success' ? <Check size={18} /> : <X size={18} />}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default MailConfigPage;
