import { useCallTaskPage } from '../hooks';
import AddCallTaskDrawer from '../components/AddCallTaskDrawer';
import DeleteCallTaskModal from '../components/DeleteCallTaskModal';
import CallTaskTable from '../components/CallTaskTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './CallTaskPage.css';

const CallTaskPage = () => {
  const {
    callTask,
    searchQuery, setSearchQuery,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
    drawerInitialValues,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
    staffOptions,
    page,
    limit,
    totalPages,
    totalItems,
    handlePageChange,
    handleLimitChange,
  } = useCallTaskPage();

  return (
    <div className="account-page">
      <PageHeader title="Call Tasks" description="Manage your call tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <CallTaskTable
          data={filteredData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddClick}
          addLabel="Add Call Task"
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        />
        <AddCallTaskDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? callTask.editValidationSchema : callTask.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={callTask.isLoading}
          error={callTask.error}
          isEditing={!!editingItem}
          staffOptions={staffOptions}
        />
        <DeleteCallTaskModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.title || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
      </div>
    </div>
  );
};

export default CallTaskPage;
