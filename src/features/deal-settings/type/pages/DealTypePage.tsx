import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import { useDealTypePage } from '../hooks';
import DealTypeTable from '../components/DealTypeTable';
import AddDealTypeDrawer from '../components/AddDealTypeDrawer';
import DeleteDealTypeModal from '../components/DeleteDealTypeModal';
import './DealTypePage.css';

const DealTypePage = () => {
  const d = useDealTypePage();

  return (
    <div className="account-page">
      <PageHeader title="Deal Types" description="Manage deal categories and their status" />
      <SettingsTabs items={dealSettingsTabs} />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <DealTypeTable data={d.filteredData} searchQuery={d.searchQuery}
          onSearchChange={d.handleSearchChange} onAdd={d.handleAddClick} addLabel="Add Deal Type"
          rowsPerPage={d.limit} onRowsPerPageChange={d.handleLimitChange}
          startIndex={d.startIndex} dropdownOpen={d.dropdownOpen}
          onToggleDropdown={d.setDropdownOpen} onEdit={d.handleEditClick} onDelete={d.handleDeleteClick}
          page={d.page} totalPages={d.meta.totalPages} total={d.meta.total}
          onPageChange={d.handlePageChange} />
      </div>
      <AddDealTypeDrawer isOpen={d.showForm} formData={d.formData}
        onChange={d.handleFormChange} onSave={d.handleSave}
        onClose={d.handleCloseForm} isEditing={!!d.editingItem} />
      <DeleteDealTypeModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.name ?? ''}
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default DealTypePage;
