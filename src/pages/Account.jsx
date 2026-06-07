// import React, { useState } from 'react';
// import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
// import { MoreHorizontal, Search, Edit2, Trash2, MapPin, Plus, X, Users } from 'lucide-react';
// import PageHeader from '../components/PageHeader';
// import SettingsTabs from '../components/SettingsTabs';
// import './Account.css';

// const staffData = [
//   { id: 1, name: 'Dr Expert Edulinks', phone: '919656349000', email: 'info@drexpertedu.com', role: 'Admin', designation: '', status: 'Active' },
//   { id: 2, name: 'Lana', phone: '917025619000', email: 'lana@drexpertedu.com', role: '', designation: '', status: 'Active' },
//   // { id: 3, name: 'Rahmath', phone: '919744639000', email: 'noora@drexpertedu.com', role: '', designation: '', status: 'Active' },
//   // { id: 4, name: 'Dilshana', phone: '919744739000', email: 'Chaithanya@gmail.com', role: '', designation: '', status: 'Active' },
//   // { id: 5, name: 'Nesri', phone: '917025749000', email: 'ayshanesri@gmail.com', role: '', designation: '', status: 'Active' },
//   // { id: 6, name: 'Aysha', phone: '917025769000', email: 'ayshashameela@gmail.com', role: '', designation: '', status: 'Active' },
//   // { id: 7, name: 'Rameesa', phone: '917025739000', email: 'Rameesa@gmail.com', role: '', designation: '', status: 'Active' },
//   // { id: 8, name: 'Nandana K', phone: '917025729000', email: 'Nandanak@gmail.com', role: '', designation: '', status: 'Active' },
//   // { id: 9, name: 'Fida Fathima', phone: '917025719000', email: 'fidafathima@gmail.com', role: '', designation: '', status: 'Active' },
// ];

// const AgentPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [showDrawer, setShowDrawer] = useState(false);
//   const [editingStaff, setEditingStaff] = useState(null);
//   const [deletingStaff, setDeletingStaff] = useState(null);
//   const [deleteConfirmText, setDeleteConfirmText] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     assignedStaff: ''
//   });

//   const filteredData = staffData.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.phone.includes(searchQuery)
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditClick = (staff) => {
//     setEditingStaff(staff);
//     setFormData({
//       name: staff.name,
//       phone: staff.phone,
//       email: staff.email,
//       password: '',
//       confirmPassword: '',
//       assignedStaff: ''
//     });
//     setShowDrawer(true);
//   };

//   const handleAddClick = () => {
//     setEditingStaff(null);
//     setFormData({
//       name: '',
//       phone: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       assignedStaff: ''
//     });
//     setShowDrawer(true);
//   };

//   const handleCloseDrawer = () => {
//     setShowDrawer(false);
//     setEditingStaff(null);
//   };

//   const handleDeleteClick = (staff) => {
//     setDeletingStaff(staff);
//     setDeleteConfirmText('');
//     setDropdownOpen(null);
//   };

//   const handleConfirmDelete = () => {
//     const expectedText = 'Delete the staff ' + deletingStaff.name;
//     if (deleteConfirmText === expectedText) {
//       console.log('Deleting staff:', deletingStaff);
//       setDeletingStaff(null);
//       setDeleteConfirmText('');
//       alert('Staff deleted successfully');
//     }
//   };

//   const handleCloseDeleteModal = () => {
//     setDeletingStaff(null);
//     setDeleteConfirmText('');
//   };

//   return (
//     <div className="account-page">
//       <div className="account-layout">
//         <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
//           <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
//           <SettingsTabs />
//           <div className="task-panel">
//             <div className="usage-quote">
//               <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Staffs Used
//             </div>
//             <div className="task-nav">
//               <button className="btn btn-primary" onClick={handleAddClick}>
//                 <Plus size={16} /> Add Staff
//               </button>
//             </div>
//           </div>
//           <div className="table-container">
//             <div className="table-header-controls">
//               <div className="entries-select">
//                 <label>Show
//                   <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
//                     <option value="10">10</option>
//                     <option value="25">25</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                   </select>
//                   entries
//                 </label>
//               </div>
//               <div className="search-input">
//                 <Search size={16} />
//                 <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//               </div>
//             </div>
//             <div className="table-scroll">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Sl No</th>
//                     <th>Name</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                     <th>Role</th>
//                     <th>Designation</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.slice(0, rowsPerPage).map((item, index) => (
//                     <tr key={item.id}>
//                       <td>{index + 1}</td>
//                       <td>{item.name}</td>
//                       <td>{item.phone}</td>
//                       <td>{item.email}</td>
//                       <td>{item.role}</td>
//                       <td>{item.designation}</td>
//                       <td>
//                         <span className={'status-badge status-' + item.status.toLowerCase()}>
//                           {item.status}
//                         </span>
//                       </td>
//                       <td>
//                         {item.role === 'Admin' ? (
//                           <span className="status-badge status-admin">Admin</span>
//                         ) : (
//                           <div className="dropdown-container">
//                             <button className="dropdown-toggle" onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}>
//                               <MoreHorizontal size={16} />
//                             </button>
//                             {dropdownOpen === item.id && (
//                               <div className="dropdown-menu">
//                                 <a href="#" className="dropdown-item">Deactivate</a>
//                                 <a className="dropdown-item" onClick={() => handleEditClick(item)}><Edit2 size={14} /> Edit</a>
//                                 <a className="dropdown-item" onClick={() => handleDeleteClick(item)}><Trash2 size={14} /> Delete</a>
//                                 <a href={'/user/staff-location-history/' + item.id} className="dropdown-item"><MapPin size={14} /> History</a>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="table-footer">
//               <div className="table-footer-left">
//                 <span className="limit-text">Limit: {filteredData.length}/{filteredData.length}</span>
//               </div>
//               <div className="table-info">
//                 Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of {filteredData.length} entries
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showDrawer && (
//         <div className="drawer-overlay" onClick={handleCloseDrawer}>
//           <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
//             <div className="drawer-header">
//               <h5>{editingStaff ? 'Edit Staff' : 'Add Staff'}</h5>
//               <button className="drawer-close" onClick={handleCloseDrawer}>
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="drawer-body">
//               <form>
//                 <div className="form-group">
//                   <label>Name <span className="text-danger">*</span></label>
//                   <input type="text" name="name" className="form-control" placeholder="Enter name" value={formData.name} onChange={handleInputChange} />
//                 </div>
//                 <div className="form-group">
//                   <label>Phone Number <span className="text-danger">*</span></label>
//                   <input type="text" name="phone" className="form-control" placeholder="Enter phone number" value={formData.phone} onChange={handleInputChange} />
//                 </div>
//                 <div className="form-group">
//                   <label>Email <span className="text-danger">*</span></label>
//                   <input type="email" name="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
//                 </div>
//                 {!editingStaff && (
//                   <>
//                     <div className="form-group">
//                       <label>Password <span className="text-danger">*</span></label>
//                       <input type="password" name="password" className="form-control" placeholder="Enter password" value={formData.password} onChange={handleInputChange} />
//                     </div>
//                     <div className="form-group">
//                       <label>Confirm Password <span className="text-danger">*</span></label>
//                       <input type="password" name="confirmPassword" className="form-control" placeholder="Enter confirm password" value={formData.confirmPassword} onChange={handleInputChange} />
//                     </div>
//                   </>
//                 )}
//                 {editingStaff && (
//                   <>
//                     <div className="form-group">
//                       <label>New Password</label>
//                       <input type="password" name="password" className="form-control" placeholder="Enter new password (optional)" value={formData.password} onChange={handleInputChange} />
//                     </div>
//                     <div className="form-group">
//                       <label>Confirm New Password</label>
//                       <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm new password" value={formData.confirmPassword} onChange={handleInputChange} />
//                     </div>
//                   </>
//                 )}
//                 <div className="form-group">
//                   <label>Assigned Staff</label>
//                   <select name="assignedStaff" className="form-control" value={formData.assignedStaff} onChange={handleInputChange}>
//                     <option value="">Select Staff</option>
//                     {staffData.filter(s => s.role !== 'Admin').map(staff => (
//                       <option key={staff.id} value={staff.id}>{staff.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-actions">
//                   <button type="submit" className="btn btn-primary">
//                     {editingStaff ? 'Update' : 'Save'}
//                   </button>
//                   <button type="button" className="btn btn-secondary" onClick={handleCloseDrawer}>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       {deletingStaff && (
//         <div className="modal-overlay" onClick={handleCloseDeleteModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h5>Confirm Delete</h5>
//               <button className="modal-close" onClick={handleCloseDeleteModal}>
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="modal-body">
//               <p className="delete-warning">
//                 Are you sure you want to delete <strong>{deletingStaff.name}</strong>? This action cannot be undone.
//               </p>
//               <div className="delete-confirm-input">
//                 <label>Type <strong>Delete the staff {deletingStaff.name}</strong> to confirm:</label>
//                 <input type="text" className="form-control" placeholder="Type the confirmation text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-danger" disabled={deleteConfirmText !== 'Delete the staff ' + deletingStaff.name} onClick={handleConfirmDelete}>
//                 Delete Staff
//               </button>
//               <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const PlaceholderPage = ({ title }) => (
//   <div className="placeholder-page">
//     <div className="placeholder-content">
//       <h3>{title}</h3>
//       <p>This page is under development.</p>
//     </div>
//   </div>
// );

// const AccountRouter = () => (
//   <Routes>
//     <Route path="" element={<AgentPage />} />
//     <Route path="roles" element={<PlaceholderPage title="Roles" />} />
//     <Route path="department" element={<PlaceholderPage title="Departments" />} />
//     <Route path="workmode" element={<PlaceholderPage title="Staff Work Modes" />} />
//     <Route path="checkout" element={<PlaceholderPage title="Checkout Note" />} />
//     <Route path="designation" element={<PlaceholderPage title="Designations" />} />
//     <Route path="branch" element={<PlaceholderPage title="Branch" />} />
//     <Route path="mailconfig" element={<PlaceholderPage title="Mail Configuration" />} />
//     <Route path="emailtemplate" element={<PlaceholderPage title="Email Template" />} />
//     <Route path="whatsapptemplate" element={<PlaceholderPage title="Whatsapp Template" />} />
//     <Route path="profile" element={<PlaceholderPage title="Profile" />} />
//     <Route path="password" element={<PlaceholderPage title="Change Password" />} />
//     <Route path="*" element={<Navigate to="/account" replace />} />
//   </Routes>
// );

// export default AccountRouter;