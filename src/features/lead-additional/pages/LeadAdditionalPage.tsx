import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, X, FileText, Tag, Globe, Layers } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import '../../../pages/LeadSettings.css';

const menuItems = [
  { id: 'purpose', label: 'Purpose', link: '/settings/lead-settings/purpose', icon: FileText },
  { id: 'status', label: 'Status', link: '/settings/lead-settings/status', icon: Tag },
  { id: 'source', label: 'Source', link: '/settings/lead-settings/source', icon: Globe },
  { id: 'types', label: 'Types', link: '/settings/lead-settings/types', icon: Layers },
  { id: 'additional', label: 'Additional Fields', link: '/settings/lead-settings/additional', icon: FileText },
];

interface AdditionalField {
  id: number;
  field: string;
  type: string;
  inFilter: boolean;
  inList: boolean;
  required: boolean;
  purpose: boolean;
}

const initialData: AdditionalField[] = [
  { id: 1, field: 'Assigned Date', type: 'DateTime', inFilter: false, inList: true, required: false, purpose: false },
  { id: 2, field: 'Date', type: 'Date', inFilter: true, inList: true, required: false, purpose: false },
  { id: 3, field: 'Remarks', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
  { id: 4, field: 'location', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
];

const LeadAdditionalPage = () => {
  const [data, setData] = useState(initialData);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<AdditionalField | null>(null);
  const [deletingItem, setDeletingItem] = useState<AdditionalField | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fieldName: '',
    fieldType: '',
    inFilter: false,
    inList: false,
    required: false,
    purpose: false,
  });

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ fieldName: '', fieldType: '', inFilter: false, inList: false, required: false, purpose: false });
  };

  const handleEditClick = (item: AdditionalField) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({
      fieldName: item.field,
      fieldType: item.type,
      inFilter: item.inFilter,
      inList: item.inList,
      required: item.required,
      purpose: item.purpose,
    });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: AdditionalField) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setData(prev => prev.filter(item => item.id !== deletingItem!.id));
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(prev => prev.map(item =>
        item.id === editingItem.id ? {
          ...item,
          field: formData.fieldName,
          type: formData.fieldType,
          inFilter: formData.inFilter,
          inList: formData.inList,
          required: formData.required,
          purpose: formData.purpose,
        } : item
      ));
    } else {
      setData(prev => [...prev, {
        id: Date.now(),
        field: formData.fieldName,
        type: formData.fieldType,
        inFilter: formData.inFilter,
        inList: formData.inList,
        required: formData.required,
        purpose: formData.purpose,
      }]);
    }
    handleCloseForm();
  };

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />

      <div className="lead-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.link}
                className={`menu-item ${item.id === 'additional' ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="settings-content">
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
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="datetime">DateTime</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="checkbox">Checkbox</option>
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
