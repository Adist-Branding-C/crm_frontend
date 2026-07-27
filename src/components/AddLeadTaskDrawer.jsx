import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { PRIORITY_OPTIONS } from '../features/task/common/constants/priorityOptions';
import { STATUS_OPTIONS } from '../features/task/common/constants/statusOptions';
import './AddLeadDrawer.css';

const AddLeadTaskDrawer = ({ isOpen, onClose, onSubmit, task, isLoading, error, categoryOptions, staffOptions, isLoadingCategories, isLoadingStaff, categoriesError, staffError }) => {
  const cats = Array.isArray(categoryOptions) ? categoryOptions : [];
  const staffs = Array.isArray(staffOptions) ? staffOptions : [];
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    category: task?.category || '',
    scheduledDate: task?.scheduledDate || '',
    scheduledTime: task?.scheduledTime || '',
    assignedTo: task?.assignedTo || '',
    priority: task?.priority || '',
    status: task?.status || 'Pending',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.status) newErrors.status = 'Status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await onSubmit(formData);
    if (success) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <form className="lead-form" onSubmit={handleSubmit}>
            {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}

            <div className="form-group">
              <label>Title <span className="text-danger">*</span></label>
              <input type="text" name="title" placeholder="Enter task title" value={formData.title} onChange={handleChange} />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} rows={3} />
            </div>

            <div className="form-group">
              <label>Category</label>
              {categoriesError && <div className="error-text" style={{ fontSize: '0.75rem' }}>{categoriesError}</div>}
              <select name="category" value={formData.category} onChange={handleChange} disabled={isLoadingCategories}>
                <option value="">{isLoadingCategories ? 'Loading...' : 'Select a category'}</option>
                {cats.length === 0 && !isLoadingCategories && <option value="" disabled>No categories available</option>}
                {cats.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Scheduled Date</label>
                <input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Scheduled Time</label>
                <input type="time" name="scheduledTime" value={formData.scheduledTime} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Assigned To</label>
              {staffError && <div className="error-text" style={{ fontSize: '0.75rem' }}>{staffError}</div>}
              <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} disabled={isLoadingStaff}>
                <option value="">{isLoadingStaff ? 'Loading...' : 'Select a staff member'}</option>
                {staffs.length === 0 && !isLoadingStaff && <option value="" disabled>No staff available</option>}
                {staffs.map(staff => (
                  <option key={staff.value} value={staff.value}>{staff.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="">Select priority</option>
                {PRIORITY_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status <span className="text-danger">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="">Select status</option>
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <Loader2 size={16} className="spin" /> : task ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeadTaskDrawer;
