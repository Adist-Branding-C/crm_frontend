import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useAgent } from '../hooks/useAgent';
import AddAgentDrawer from '../components/AddAgentDrawer';
import DeleteAgentModal from '../components/DeleteAgentModal';
import AgentTable from '../components/AgentTable';
import './AgentPage.css';

const AgentPage = () => {
  const agent = useAgent();
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const filteredData = useMemo(
    () => agent.agentList.filter(item =>
      (item.fullName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || '').includes(searchQuery)
    ),
    [agent.agentList, searchQuery]
  );

  const handleCloseDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const handleSubmit = useCallback(async (values, helpers) => {
    const success = await agent.handleAddAgent(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [agent.handleAddAgent, handleCloseDrawer]);

  const handleEditClick = useCallback((item) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await agent.handleDeleteAgent(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, agent.handleDeleteAgent]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues = useMemo(
    () => editingItem
      ? {
          fullName: editingItem.fullName || editingItem.name || '',
          email: editingItem.email || '',
          phone: editingItem.phone || '',
          password: '',
          confirmPassword: '',
          designationId: editingItem.designationId || editingItem.designation || '',
          status: editingItem.status || '',
        }
      : agent.initialValues,
    [editingItem, agent.initialValues]
  );

  const handleEditSubmit = useCallback(async (values, helpers) => {
    if (!editingItem) return;
    const success = await agent.handleUpdateAgent(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, agent.handleUpdateAgent, handleCloseDrawer]);

  return (
    <>
      <div className="task-panel">
        <span className="usage-quote">
          <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Staffs Used
        </span>
        <div className="task-nav">
          <button className="btn btn-primary" onClick={handleAddClick}>
            <Plus size={16} /> Add Staff
          </button>
        </div>
      </div>
      <div className="agent-table-wrapper">
        <AgentTable
          data={filteredData.slice(0, rowsPerPage)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          totalRecords={filteredData.length}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={setDropdownOpen}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      <AddAgentDrawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        validationSchema={editingItem ? agent.editValidationSchema : agent.validationSchema}
        initialValues={drawerInitialValues}
        onSubmit={editingItem ? handleEditSubmit : handleSubmit}
        isLoading={agent.isLoading}
        error={agent.error}
        isEditing={!!editingItem}
        designationOptions={agent.designationOptions}
        onFetchDesignations={agent.fetchDesignations}
      />
      <DeleteAgentModal
        isOpen={!!deletingItem}
        itemName={deletingItem?.fullName || deletingItem?.name || ''}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </>
  );
};

export default AgentPage;
