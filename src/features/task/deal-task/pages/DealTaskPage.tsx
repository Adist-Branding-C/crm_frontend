import { useDealTaskPage } from '../hooks';
import AddDealTaskDrawer from '../components/AddDealTaskDrawer';
import DeleteDealTaskModal from '../components/DeleteDealTaskModal';
import DealTaskTable from '../components/DealTaskTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './DealTaskPage.css';

const DealTaskPage = () => {
  const {
    dealTask,
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
  } = useDealTaskPage();

  return (
    <div className="account-page">
      <PageHeader title="Deal Tasks" description="Manage your deal tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <DealTaskTable
          data={filteredData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddClick}
          addLabel="Add Deal Task"
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        />
        <AddDealTaskDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? dealTask.editValidationSchema : dealTask.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={dealTask.isLoading}
          error={dealTask.error}
          isEditing={!!editingItem}
          deals={dealTask.deals}
          dealListLoading={dealTask.dealListLoading}
          staffOptions={staffOptions}
        />
        <DeleteDealTaskModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.title || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
      </div>
    </div>
  );
};

export default DealTaskPage;
