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
  } = useCampaignTaskPage();

  return (
    <div className="account-page">
      <PageHeader title="Campaign Tasks" description="Manage your campaign tasks" />
      <SettingsTabs items={taskTabs} />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <CampaignTaskTable
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
          addLabel="Add Campaign Task"
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
