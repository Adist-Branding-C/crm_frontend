import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { ACTION_SEARCH } from '../../../shared/constants/actionLabels';
import { menuItems } from '../constants';
import { FIELD_TYPE_OPTIONS } from '../../../shared/constants/fieldTypes';
import { useDealAdditionalFieldsData } from '../hooks/useDealAdditionalFieldsData';
import './DealAdditionalFieldsPage.css';

const DealAdditionalFieldsPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    dropdownOpen,
    setDropdownOpen,
    formData,
    filteredData,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
    handleInputChange,
    handleSubmit,
  } = useDealAdditionalFieldsData();

  return (
    <div className="deal-settings-page">
      <PageHeader title="Deal Settings" description="Configure deal types, stages and custom fields" />

      <div className="deal-settings-layout">
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

              <div className="table-container">
                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Sl.No</th>
                        <th>Field</th>
                        <th>Type</th>
                        <th>in filter</th>
                        <th>in list</th>
                        <th>Required</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="dataTables_empty">
                            No data available in table
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((item, index) => (
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="table-footer">
                <div className="table-info">
                  {filteredData.length === 0
                    ? 'Showing 0 to 0 of 0 entries'
                    : `Showing 1 to ${Math.min(rowsPerPage, filteredData.length)} of ${filteredData.length} entries`
                  }
                </div>
                <div className="pagination">
                  <button className="paginate-button disabled">Previous</button>
                  <button className="paginate-button current">1</button>
                  <button className="paginate-button disabled">Next</button>
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

export default DealAdditionalFieldsPage;
