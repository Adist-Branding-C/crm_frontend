import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { useWhatsappTemplatePage } from '../hooks/useWhatsappTemplatePage';
import AddWhatsappTemplateDrawer from '../components/AddWhatsappTemplateDrawer';
import DeleteWhatsappTemplateModal from '../components/DeleteWhatsappTemplateModal';
import WhatsappTemplateTable from '../components/WhatsappTemplateTable';
import './WhatsappTemplatePage.css';

const WhatsappTemplatePage = () => {
  const {
    whatsappTemplate,
    searchQuery, setSearchQuery,
    showDrawer,
    dropdownOpen, setDropdownOpen,
    editingItem,
    deletingItem,
    rowsPerPage, setRowsPerPage,
    filteredData,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
    drawerInitialValues,
  } = useWhatsappTemplatePage();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Templates
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Template
              </button>
            </div>
          </div>
          <div className="whatsapp-template-table-wrapper">
            <WhatsappTemplateTable
              data={filteredData.slice(0, rowsPerPage)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
              totalRecords={filteredData.length}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={setDropdownOpen}
              onEdit={(item) => { handleEditClick(item); setDropdownOpen(null); }}
              onDelete={(item) => { handleDeleteClick(item); setDropdownOpen(null); }}
            />
          </div>
          <AddWhatsappTemplateDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={whatsappTemplate.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={whatsappTemplate.isLoading}
            error={whatsappTemplate.error}
            isEditing={!!editingItem}
          />
          <DeleteWhatsappTemplateModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.templateName || deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default WhatsappTemplatePage;
