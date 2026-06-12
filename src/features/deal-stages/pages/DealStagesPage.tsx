// import { useDealStagesData } from '../hooks/useDealStagesData';
// import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
// import AdminTable from '../../../shared/components/crud/AdminTable';
// import AdminPagination from '../../../shared/components/crud/AdminPagination';
// import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
// import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
// import PageHeader from '../../../shared/components/layout/PageHeader';
// import SettingsTabs from '../../../shared/components/SettingsTabs';
// import { dealSettingsTabs } from '../../deal-settings/shared/dealSettingsTabs';
// import './DealStagesPage.css';
// import { formFields, columns } from '../constants';

// const DealStagesPage = () => {
//   const d = useDealStagesData();

//   return (
//     <div className="deal-settings-page">
//       <PageHeader title="Deal Stages" description="Manage deal pipeline stages" />
//       <SettingsTabs items={dealSettingsTabs} />
//       <div className="table-container">
//         <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Stage" />
//         <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
//           dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
//           onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
//         <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
//           startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.filteredData.length}
//           onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
//           prevNextOnly />
//       </div>
//       <AdminFormDrawer isOpen={d.showForm} title="Stage" fields={formFields}
//         formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
//         isEditing={!!d.editingItem} />
//       <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.status} itemType="stage"
//         onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
//     </div>
//   );
// };

// export default DealStagesPage;
