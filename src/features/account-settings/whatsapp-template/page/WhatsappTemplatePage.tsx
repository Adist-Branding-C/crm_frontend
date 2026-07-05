import { useWhatsappTemplatePage } from '../hooks/useWhatsappTemplatePage';
import WhatsappTemplateTable from '../components/WhatsappTemplateTable';
import AddWhatsappTemplateDrawer from '../components/AddWhatsappTemplateDrawer';
import DeleteWhatsappTemplateDialog from '../components/DeleteWhatsappTemplateDialog';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './WhatsappTemplatePage.css';

const WhatsappTemplatePage = () => {
  const p = useWhatsappTemplatePage();

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <WhatsappTemplateTable
          data={p.data}
          searchQuery={p.searchQuery}
          onSearchChange={p.onSearchChange}
          rowsPerPage={p.rowsPerPage}
          onRowsPerPageChange={p.onRowsPerPageChange}
          totalRecords={p.totalRecords}
          currentPage={p.currentPage}
          totalPages={p.totalPages}
          onPageChange={p.onPageChange}
          dropdownOpen={p.dropdownOpen}
          onToggleDropdown={p.onToggleDropdown}
          onEdit={p.onEdit}
          onDelete={p.onDelete}
          onAdd={p.onAdd}
        />
        <AddWhatsappTemplateDrawer
          isOpen={p.isOpen}
          onClose={p.onClose}
          validationSchema={p.validationSchema}
          initialValues={p.initialValues}
          onSubmit={p.onSubmit}
          isLoading={p.isLoading}
          error={p.error}
          isEditing={p.isEditing}
        />
        <DeleteWhatsappTemplateDialog
          isOpen={!!p.deletingItem}
          itemName={p.itemName}
          onConfirm={p.onConfirmDelete}
          onClose={p.onCloseDelete}
        />
      </div>
      <ToastNotification
        message={p.toastMessage}
        type={p.toastType}
        visible={p.showToast}
        onClose={p.onCloseToast}
      />
    </div>
  );
};

export default WhatsappTemplatePage;
