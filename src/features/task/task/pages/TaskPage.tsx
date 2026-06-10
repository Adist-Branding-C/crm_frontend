import { useTaskPage } from '../hooks';
import AddTaskDrawer from '../components/AddTaskDrawer';
import DeleteTaskModal from '../components/DeleteTaskModal';
import TaskTable from '../components/TaskTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './TaskPage.css';

const TaskPage = () => {
  const {
    task,
    searchQuery, setSearchQuery,
    rowsPerPage, setRowsPerPage,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
    totalRecords,
    drawerInitialValues,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
  } = useTaskPage();

  return (
    <div className="account-page">
      <PageHeader title="Task" description="Manage your tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <TaskTable
          data={filteredData.slice(0, rowsPerPage)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          totalRecords={totalRecords}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddClick}
          addLabel="Add Task"
        />
        <AddTaskDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? task.editValidationSchema : task.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={task.isLoading}
          error={task.error}
          isEditing={!!editingItem}
        />
        <DeleteTaskModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.title || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
      </div>
    </div>
  );
};

export default TaskPage;
