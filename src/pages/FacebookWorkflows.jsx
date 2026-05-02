import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Edit2, Trash2, ChevronLeft, X, Check, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './FacebookWorkflows.css';

const facebookPages = [
  { id: 1, name: 'GetLead Official' },
  { id: 2, name: 'CRM Solutions' },
  { id: 3, name: 'Sales Tools' },
];

const facebookForms = [
  { id: 1, pageId: 1, name: 'Contact Form - Demo Request' },
  { id: 2, pageId: 1, name: 'Product Inquiry Form' },
  { id: 3, pageId: 2, name: 'Support Request Form' },
  { id: 4, pageId: 2, name: 'Feedback Form' },
  { id: 5, pageId: 3, name: 'Newsletter Signup' },
];

const facebookFields = [
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'full_name', label: 'Full Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'company', label: 'Company' },
  { value: 'city', label: 'City' },
  { value: 'state', label: 'State' },
  { value: 'country', label: 'Country' },
  { value: 'gender', label: 'Gender' },
  { value: 'age', label: 'Age' },
  { value: 'dob', label: 'Date of Birth' },
  { value: 'education', label: 'Education' },
  { value: 'occupation', label: 'Occupation' },
  { value: 'custom_question_1', label: 'Custom Question 1' },
  { value: 'custom_question_2', label: 'Custom Question 2' },
];

const crmFields = [
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'full_name', label: 'Full Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'company', label: 'Company' },
  { value: 'designation', label: 'Designation' },
  { value: 'address', label: 'Address' },
  { value: 'city', label: 'City' },
  { value: 'state', label: 'State' },
  { value: 'country', label: 'Country' },
  { value: 'pincode', label: 'Pincode' },
  { value: 'website', label: 'Website' },
  { value: 'industry', label: 'Industry' },
  { value: 'source', label: 'Source' },
  { value: 'status', label: 'Status' },
  { value: 'assigned_to', label: 'Assigned To' },
  { value: 'notes', label: 'Notes' },
  { value: 'custom_field_1', label: 'Custom Field 1' },
  { value: 'custom_field_2', label: 'Custom Field 2' },
];

let workflowsStore = [
  { id: 1, name: 'Demo Request Flow', pageName: 'GetLead Official', formName: 'Contact Form - Demo Request', status: 'active', createdAt: '2026-04-20' },
  { id: 2, name: 'Product Inquiry Handler', pageName: 'GetLead Official', formName: 'Product Inquiry Form', status: 'active', createdAt: '2026-04-18' },
  { id: 3, name: 'Support Ticket Flow', pageName: 'CRM Solutions', formName: 'Support Request Form', status: 'inactive', createdAt: '2026-04-15' },
];

const FacebookWorkflowsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [workflows, setWorkflows] = useState(workflowsStore);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingWorkflow, setDeletingWorkflow] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const filteredWorkflows = useMemo(() => {
    let filtered = [...workflows];
    
    if (searchQuery) {
      filtered = filtered.filter(w => 
        w.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter) {
      filtered = filtered.filter(w => w.status === statusFilter);
    }
    
    return filtered;
  }, [workflows, searchQuery, statusFilter]);

  const paginatedWorkflows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredWorkflows.slice(start, start + rowsPerPage);
  }, [filteredWorkflows, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredWorkflows.length / rowsPerPage);

  const handleDelete = (workflow) => {
    setDeletingWorkflow(workflow);
    setShowDeleteModal(true);
    setActionMenuOpen(null);
  };

  const confirmDelete = () => {
    const newWorkflows = workflows.filter(w => w.id !== deletingWorkflow.id);
    setWorkflows(newWorkflows);
    workflowsStore = newWorkflows;
    setShowDeleteModal(false);
    setDeletingWorkflow(null);
  };

  return (
    <div className="facebook-workflows-page">
      <PageHeader 
        title="Facebook Integration" 
        description="Manage Facebook lead form workflows and routing"
        breadcrumb={[
          { label: 'GL Connect', link: '/user/gl-connect' },
          { label: 'Facebook Integration' }
        ]}
      />

      <div className="workflows-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search by workflow name..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          
          <select 
            className="status-filter"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <select 
            className="rows-per-page"
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
        
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={() => navigate('/facebook/workflows/create')}>
            <Plus size={16} />
            Create Workflow
          </button>
        </div>
      </div>

      {filteredWorkflows.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <h3>No workflows created yet</h3>
          <p>Connect Facebook forms and automate lead routing.</p>
          <button className="btn btn-primary" onClick={() => navigate('/facebook/workflows/create')}>
            <Plus size={16} />
            Create First Workflow
          </button>
        </div>
      ) : (
        <div className="workflows-table-wrapper">
          <table className="workflows-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Workflow Name</th>
                <th>Facebook Page Name</th>
                <th>Lead Form Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWorkflows.map((workflow, index) => (
                <tr key={workflow.id}>
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td>
                    <button 
                      className="workflow-name-link"
                      onClick={() => navigate(`/facebook/workflows/${workflow.id}/edit`)}
                    >
                      {workflow.name}
                    </button>
                  </td>
                  <td>{workflow.pageName}</td>
                  <td>{workflow.formName}</td>
                  <td>
                    <span className={`status-badge ${workflow.status}`}>
                      {workflow.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{workflow.createdAt}</td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        className="action-menu-btn"
                        onClick={() => setActionMenuOpen(actionMenuOpen === workflow.id ? null : workflow.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {actionMenuOpen === workflow.id && (
                        <div className="action-dropdown">
                          <button onClick={() => { navigate(`/facebook/workflows/${workflow.id}/edit`); setActionMenuOpen(null); }}>
                            <Edit2 size={14} /> Edit
                          </button>
                          <button className="delete-action" onClick={() => handleDelete(workflow)}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredWorkflows.length > 0 && (
        <div className="pagination-bar">
          <span className="showing-text">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredWorkflows.length)} of {filteredWorkflows.length} entries
          </span>
          <div className="pagination-controls">
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Workflow?</h3>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <AlertTriangle size={24} />
                <p>This action cannot be undone.</p>
              </div>
              <p className="delete-message">Are you sure you want to delete <strong>{deletingWorkflow?.name}</strong>?</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CreateWorkflowPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    pageId: '',
    formId: '',
    mappings: [{ label: '', value: '' }],
    status: 'active'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const addMapping = () => {
    setFormData({ ...formData, mappings: [...formData.mappings, { label: '', value: '' }] });
  };

  const updateMapping = (index, field, value) => {
    const newMappings = [...formData.mappings];
    newMappings[index][field] = value;
    setFormData({ ...formData, mappings: newMappings });
  };

  const removeMapping = (index) => {
    if (formData.mappings.length > 1) {
      const newMappings = formData.mappings.filter((_, i) => i !== index);
      setFormData({ ...formData, mappings: newMappings });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Workflow name is required';
    if (!formData.pageId) newErrors.pageId = 'Facebook page is required';
    if (!formData.formId) newErrors.formId = 'Lead form is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    
    const page = facebookPages.find(p => p.id === Number(formData.pageId));
    const form = facebookForms.find(f => f.id === Number(formData.formId));
    
    const newWorkflow = {
      id: Date.now(),
      name: formData.name,
      pageName: page?.name || '',
      formName: form?.name || '',
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    workflowsStore.push(newWorkflow);
    navigate('/facebook/workflows');
  };

  return (
    <div className="create-workflow-page">
      <div className="page-header-with-toggle">
        <div className="header-content">
          <PageHeader 
            title="Create Workflow" 
            description="Create a new Facebook lead workflow"
            breadcrumb={[
              { label: 'GL Connect', link: '/user/gl-connect' },
              { label: 'Facebook Integration', link: '/facebook/workflows' },
              { label: 'Create Workflow' }
            ]}
          />
        </div>
        <div className="header-actions">
          <button className="facebook-connect-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.637H7.9v-3.577h2.3V9.275c0-2.18 1.313-3.396 3.3-3.396.955 0 1.95.16 1.95.16v2.133h-1.097c-1.078 0-1.413.676-1.413 1.37v1.645h2.393l-.383 3.577h-2.01v8.637C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Connect with Facebook
          </button>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={formData.status === 'active'}
              onChange={(e) => handleChange('status', e.target.checked ? 'active' : 'inactive')}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">{formData.status === 'active' ? 'On' : 'Off'}</span>
          </label>
        </div>
      </div>

      <div className="workflow-form-card">
        <div className="form-group">
          <label>Workflow Name <span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="Enter workflow name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Choose Facebook Page <span className="required">*</span></label>
            <select 
              value={formData.pageId}
              onChange={(e) => handleChange('pageId', e.target.value)}
              className={errors.pageId ? 'error' : ''}
            >
              <option value="">Select Facebook Page</option>
              {facebookPages.map(page => (
                <option key={page.id} value={page.id}>{page.name}</option>
              ))}
            </select>
            {errors.pageId && <span className="error-message">{errors.pageId}</span>}
          </div>

          <div className="form-group">
            <label>Select Lead Form <span className="required">*</span></label>
            <select 
              value={formData.formId}
              onChange={(e) => handleChange('formId', e.target.value)}
              className={errors.formId ? 'error' : ''}
            >
              <option value="">Select Lead Form</option>
              {facebookForms
                .filter(f => !formData.pageId || f.pageId === Number(formData.pageId))
                .map(form => (
                  <option key={form.id} value={form.id}>{form.name}</option>
                ))
              }
            </select>
            {errors.formId && <span className="error-message">{errors.formId}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Field Mapping</label>
          <div className="mapping-rows">
            {formData.mappings.map((mapping, index) => (
              <div key={index} className="mapping-row">
                <select 
                  value={mapping.label}
                  onChange={(e) => updateMapping(index, 'label', e.target.value)}
                >
                  <option value="">Select Facebook Field</option>
                  {facebookFields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                  ))}
                </select>
                <select 
                  value={mapping.value}
                  onChange={(e) => updateMapping(index, 'value', e.target.value)}
                >
                  <option value="">Select CRM Field</option>
                  {crmFields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                  ))}
                </select>
                <button 
                  className="remove-mapping-btn"
                  onClick={() => removeMapping(index)}
                  disabled={formData.mappings.length === 1}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button className="add-mapping-btn" onClick={addMapping}>
              <Plus size={16} /> Add Field Mapping
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Workflow
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/facebook/workflows')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const EditWorkflowPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const workflow = workflowsStore.find(w => w.id === Number(id));
  
  const [formData, setFormData] = useState({
    name: workflow?.name || '',
    pageId: facebookPages.find(p => p.name === workflow?.pageName)?.id || '',
    formId: facebookForms.find(f => f.name === workflow?.formName)?.id || '',
    mappings: [{ label: '', value: '' }],
    status: workflow?.status || 'active'
  });
  const [errors, setErrors] = useState({});

  if (!workflow) {
    return <Navigate to="/facebook/workflows" />;
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const addMapping = () => {
    setFormData({ ...formData, mappings: [...formData.mappings, { label: '', value: '' }] });
  };

  const updateMapping = (index, field, value) => {
    const newMappings = [...formData.mappings];
    newMappings[index][field] = value;
    setFormData({ ...formData, mappings: newMappings });
  };

  const removeMapping = (index) => {
    if (formData.mappings.length > 1) {
      const newMappings = formData.mappings.filter((_, i) => i !== index);
      setFormData({ ...formData, mappings: newMappings });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Workflow name is required';
    if (!formData.pageId) newErrors.pageId = 'Facebook page is required';
    if (!formData.formId) newErrors.formId = 'Lead form is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) return;
    
    const page = facebookPages.find(p => p.id === Number(formData.pageId));
    const form = facebookForms.find(f => f.id === Number(formData.formId));
    
    const index = workflowsStore.findIndex(w => w.id === Number(id));
    if (index !== -1) {
      workflowsStore[index] = {
        ...workflowsStore[index],
        name: formData.name,
        pageName: page?.name || '',
        formName: form?.name || '',
        status: formData.status
      };
    }
    
    navigate('/facebook/workflows');
  };

  const handleDelete = () => {
    const index = workflowsStore.findIndex(w => w.id === Number(id));
    if (index !== -1) {
      workflowsStore.splice(index, 1);
    }
    navigate('/facebook/workflows');
  };

  return (
    <div className="create-workflow-page">
      <div className="page-header-with-toggle">
        <div className="header-content">
          <PageHeader 
            title="Edit Workflow" 
            description="Edit the Facebook lead workflow"
            breadcrumb={[
              { label: 'GL Connect', link: '/user/gl-connect' },
              { label: 'Facebook Integration', link: '/facebook/workflows' },
              { label: 'Edit Workflow' }
            ]}
          />
        </div>
        <div className="header-actions">
          <button className="facebook-connect-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.637H7.9v-3.577h2.3V9.275c0-2.18 1.313-3.396 3.3-3.396.955 0 1.95.16 1.95.16v2.133h-1.097c-1.078 0-1.413.676-1.413 1.37v1.645h2.393l-.383 3.577h-2.01v8.637C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Connect with Facebook
          </button>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={formData.status === 'active'}
              onChange={(e) => handleChange('status', e.target.checked ? 'active' : 'inactive')}
            />
            <span className="toggle-slider"></span>
            <span className="toggle-label">{formData.status === 'active' ? 'On' : 'Off'}</span>
          </label>
        </div>
      </div>

      <div className="workflow-form-card">
        <div className="form-group">
          <label>Workflow Name <span className="required">*</span></label>
          <input 
            type="text" 
            placeholder="Enter workflow name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Choose Facebook Page <span className="required">*</span></label>
            <select 
              value={formData.pageId}
              onChange={(e) => handleChange('pageId', e.target.value)}
              className={errors.pageId ? 'error' : ''}
            >
              <option value="">Select Facebook Page</option>
              {facebookPages.map(page => (
                <option key={page.id} value={page.id}>{page.name}</option>
              ))}
            </select>
            {errors.pageId && <span className="error-message">{errors.pageId}</span>}
          </div>

          <div className="form-group">
            <label>Select Lead Form <span className="required">*</span></label>
            <select 
              value={formData.formId}
              onChange={(e) => handleChange('formId', e.target.value)}
              className={errors.formId ? 'error' : ''}
            >
              <option value="">Select Lead Form</option>
              {facebookForms
                .filter(f => !formData.pageId || f.pageId === Number(formData.pageId))
                .map(form => (
                  <option key={form.id} value={form.id}>{form.name}</option>
                ))
              }
            </select>
            {errors.formId && <span className="error-message">{errors.formId}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Field Mapping</label>
          <div className="mapping-rows">
            {formData.mappings.map((mapping, index) => (
              <div key={index} className="mapping-row">
                <select 
                  value={mapping.label}
                  onChange={(e) => updateMapping(index, 'label', e.target.value)}
                >
                  <option value="">Select Facebook Field</option>
                  {facebookFields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                  ))}
                </select>
                <select 
                  value={mapping.value}
                  onChange={(e) => updateMapping(index, 'value', e.target.value)}
                >
                  <option value="">Select CRM Field</option>
                  {crmFields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                  ))}
                </select>
                <button 
                  className="remove-mapping-btn"
                  onClick={() => removeMapping(index)}
                  disabled={formData.mappings.length === 1}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button className="add-mapping-btn" onClick={addMapping}>
              <Plus size={16} /> Add Field Mapping
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Workflow
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/facebook/workflows')}>
            Cancel
          </button>
          <button className="btn btn-danger-outline" onClick={handleDelete}>
            Delete Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

const FacebookWorkflows = () => {
  return (
    <Routes>
      <Route path="" element={<FacebookWorkflowsPage />} />
      <Route path="create" element={<CreateWorkflowPage />} />
      <Route path=":id/edit" element={<EditWorkflowPage />} />
    </Routes>
  );
};

export default FacebookWorkflows;