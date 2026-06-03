import { MoreHorizontal, Edit2, Trash2, X, Plus, Search } from 'lucide-react';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import './DepartmentPage.css';
import { columns, AGENTS_LIST } from '../constants';
import { useDepartmentData } from '../hooks/useDepartmentData';

const DepartmentPage = () => {
  const {
    paginatedData, filteredData, searchQuery, setSearchQuery,
    currentPage, totalPages, startIndex, rowsPerPage,
    handleRowsPerPageChange, setCurrentPage,
    showForm, handleCloseForm,
    deletingItem, setDeletingItem, handleConfirmDelete,
    editingItem, handleAddClick, handleEditClick, handleDeleteClick,
    dropdownOpen, setDropdownOpen,
    formData, setFormData,
    selectedAgents, showAgentDropdown, setShowAgentDropdown,
    dropdownPosition, setDropdownPosition, actionMenuRefs, calculateDropdownPosition,
    toggleAgent,
    handleAdd, handleEdit, handleSave,
  } = useDepartmentData();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Departments" description="Create and manage departments for your organization" />
          <SettingsTabs />
          <div className="table-container">
            <AdminToolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} onAdd={handleAdd} addLabel="Add Department" />
            <AdminTable data={paginatedData} columns={columns} startIndex={startIndex}
              dropdownOpen={-1} onToggleDropdown={() => {}} onEdit={() => {}} onDelete={() => {}}
              renderActions={(item) => (
                <div className="action-menu-container" style={{ position: 'relative' }}>
                  <button className={`action-btn ${dropdownOpen === item.id ? 'active' : ''}`}
                    ref={(el) => { actionMenuRefs.current[item.id] = el; }}
                    onClick={() => {
                      if (dropdownOpen === item.id) { setDropdownOpen(null); return; }
                      setDropdownPosition(calculateDropdownPosition(actionMenuRefs.current[item.id] ?? null));
                      setDropdownOpen(item.id);
                    }}>
                    <MoreHorizontal size={16} />
                  </button>
                  {dropdownOpen === item.id && (
                    <div className={`premium-dropdown action-dropdown ${dropdownPosition.vertical === 'top' ? 'dropup' : ''} ${dropdownPosition.horizontal === 'left' ? 'dropleft' : ''}`}>
                      <button className="dropdown-item" onClick={() => handleEdit(item)}><Edit2 size={14} /> Edit</button>
                      <button className="dropdown-item danger" onClick={() => { handleDeleteClick(item); setDropdownOpen(null); }}><Trash2 size={14} /> Delete</button>
                    </div>
                  )}
                </div>
              )} />
            <AdminPagination currentPage={currentPage} totalPages={totalPages}
              startIndex={startIndex} rowsPerPage={rowsPerPage} totalItems={filteredData.length}
              onPageChange={setCurrentPage} onRowsPerPageChange={handleRowsPerPageChange} />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="drawer-overlay" onClick={handleCloseForm}>
          <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>{editingItem ? 'Edit Department' : 'Add Department'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}><X size={20} /></button>
            </div>
            <div className="drawer-body">
              <form>
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input type="text" name="name" className="form-control" placeholder="Enter department name"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" name="description" placeholder="Enter description"
                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Agents</label>
                  <div className="multi-select-wrapper">
                    <div className="multi-select-trigger" onClick={() => setShowAgentDropdown(!showAgentDropdown)}>
                      <span>{selectedAgents.length > 0 ? `${selectedAgents.length} agents selected` : 'Select Agents'}</span>
                    </div>
                    {showAgentDropdown && (
                      <div className="multi-select-dropdown">
                        {AGENTS_LIST.map(agent => (
                          <label key={agent.id} className="multi-select-option">
                            <input type="checkbox" checked={selectedAgents.includes(agent.id)} onChange={() => toggleAgent(agent)} />
                            <span>{agent.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedAgents.length > 0 && (
                    <div className="selected-agents-tags">
                      {selectedAgents.map(id => {
                        const agent = AGENTS_LIST.find(a => a.id === id);
                        return agent ? <span key={id} className="agent-tag">{agent.name}<X size={12} onClick={() => toggleAgent(agent)} /></span> : null;
                      })}
                    </div>
                  )}
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleSave(); }}>
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <AdminDeleteModal isOpen={!!deletingItem} itemName={deletingItem?.name}
        onConfirm={handleConfirmDelete} onClose={() => setDeletingItem(null)} />
    </div>
  );
};

export default DepartmentPage;
