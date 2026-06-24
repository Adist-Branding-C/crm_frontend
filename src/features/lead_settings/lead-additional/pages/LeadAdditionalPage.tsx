import { MoreHorizontal, Edit2, Trash2, Plus, X } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { leadTabs } from '../../../../shared/constants/navigation';
import { FIELD_TYPE_OPTIONS } from '../../../../shared/constants/fieldTypes';
import { useLeadAdditionalData } from '../hooks/useLeadAdditionalData';
import './LeadAdditionalPage.css';

const LeadAdditionalPage = () => {
  const {
    data,
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    dropdownOpen,
    setDropdownOpen,
    formData,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
    handleInputChange,
    handleSubmit,
  } = useLeadAdditionalData();

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />
      <SettingsTabs items={leadTabs} />
      <div className="additional-fields-layout">
        <div className="additional-form-panel">
          <div className="card">
            <div className="card-header">
              <h5>Add Field</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="checkbox-group">
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="inFilter"
                      checked={formData.inFilter}
                      onChange={handleInputChange}
                    />
                    Is Shown in filter
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="inList"
                      checked={formData.inList}
                      onChange={handleInputChange}
                    />
                    Show in list
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="required"
                      checked={formData.required}
                      onChange={handleInputChange}
                    />
                    Is Required?
                  </label>
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      name="purpose"
                      checked={formData.purpose}
                      onChange={handleInputChange}
                    />
                    Connect with lead purpose?
                  </label>
                </div>
                <div className="form-group">
                  <label>Field Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="fieldName"
                    className="form-control"
                    placeholder="Enter field name"
                    value={formData.fieldName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Select Type <span className="text-danger">*</span></label>
                  <select
                    name="fieldType"
                    className="form-control"
                    value={formData.fieldType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type</option>
                    {FIELD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} /> {editingItem ? 'Update' : 'Add Field'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="additional-table-panel">
          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Field</th>
                    <th>Type</th>
                    <th>in filter</th>
                    <th>in list</th>
                    <th>Required</th>
                    <th>Purpose</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.field}</td>
                      <td>{item.type}</td>
                      <td>
                        <span className={`badge ${item.inFilter ? 'badge-success' : 'badge-secondary'}`}>
                          {item.inFilter ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${item.inList ? 'badge-success' : 'badge-secondary'}`}>
                          {item.inList ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${item.required ? 'badge-success' : 'badge-secondary'}`}>
                          {item.required ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${item.purpose ? 'badge-success' : 'badge-secondary'}`}>
                          {item.purpose ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown-container">
                          <button
                            className="dropdown-toggle"
                            onClick={() => setDropdownOpen(dropdownOpen === `add_${item.id}` ? null : `add_${item.id}`)}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {dropdownOpen === `add_${item.id}` && (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
              <p>Are you sure you want to delete <strong>{deletingItem.field}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>Confirm</button>
              <button className="btn btn-secondary" onClick={() => setDeletingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadAdditionalPage;
