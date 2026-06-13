import { useCampaignTaskPage } from '../hooks';
import AddCampaignTaskDrawer from '../components/AddCampaignTaskDrawer';
import DeleteCampaignTaskModal from '../components/DeleteCampaignTaskModal';
import CampaignTaskTable from '../components/CampaignTaskTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { taskTabs } from '../../shared/taskTabs';
import './CampaignTaskPage.css';

const CampaignTaskPage = () => {
  const {
    campaignTask,
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
    campaignOptions,
    page,
    limit,
    totalPages,
    totalItems,
    handlePageChange,
    handleLimitChange,
  } = useCampaignTaskPage();

  return (
    <div className="account-page">
      <PageHeader title="Campaign Tasks" description="Manage your campaign tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <CampaignTaskTable
          data={filteredData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onAdd={handleAddClick}
          addLabel="Add Campaign Task"
          page={page}
          limit={limit}
          totalPages={totalPages}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        />
        <AddCampaignTaskDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? campaignTask.editValidationSchema : campaignTask.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={campaignTask.isLoading}
          error={campaignTask.error}
          isEditing={!!editingItem}
          staffOptions={staffOptions}
          campaignOptions={campaignOptions}
        />
        <DeleteCampaignTaskModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.title || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
      </div>
    </div>
  );
};

export default CampaignTaskPage;
