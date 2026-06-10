import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const drawerOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.5)', zIndex: 9998, display: 'flex',
  justifyContent: 'flex-end',
};

const drawerPanelStyle = {
  width: '480px', maxWidth: '100%', background: 'white',
  height: '100%', display: 'flex', flexDirection: 'column',
  boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
};

const drawerHeaderStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb',
};

const drawerBodyStyle = {
  flex: 1, padding: '1.5rem', overflowY: 'auto',
};

const drawerFooterStyle = {
  display: 'flex', justifyContent: 'flex-end', gap: '0.75rem',
  padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb',
};

const fieldStyle = {
  marginBottom: '1.25rem',
};

const labelStyle = {
  display: 'block', fontSize: '0.875rem', fontWeight: 500,
  color: '#374151', marginBottom: '0.375rem',
};

const inputStyle = {
  width: '100%', padding: '0.625rem 0.75rem',
  border: '1px solid #d1d5db', borderRadius: '6px',
  fontSize: '0.875rem', boxSizing: 'border-box',
};

const selectStyle = {
  ...inputStyle, background: 'white', cursor: 'pointer',
};

const AddDealTaskDrawer = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '', category: 'call', date: '', priority: 'medium',
    assignedTo: '', status: 'pending',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ title: '', category: 'call', date: '', priority: 'medium', assignedTo: '', status: 'pending' });
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div style={drawerOverlayStyle} onClick={onClose}>
      <div style={drawerPanelStyle} onClick={(e) => e.stopPropagation()}>
        <div style={drawerHeaderStyle}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Add Task</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={drawerBodyStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Title *</label>
              <input style={inputStyle} value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Enter task title" required />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <select style={selectStyle} value={formData.category} onChange={(e) => handleChange('category', e.target.value)}>
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
                <option value="demo">Demo</option>
                <option value="follow-up">Follow-up</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Due Date</label>
              <input style={inputStyle} type="date" value={formData.date} onChange={(e) => handleChange('date', e.target.value)} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Priority</label>
              <select style={selectStyle} value={formData.priority} onChange={(e) => handleChange('priority', e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Assigned To</label>
              <select style={selectStyle} value={formData.assignedTo} onChange={(e) => handleChange('assignedTo', e.target.value)}>
                <option value="">Select person</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Status</label>
              <select style={selectStyle} value={formData.status} onChange={(e) => handleChange('status', e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div style={drawerFooterStyle}>
            <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', background: '#f3f4f6', color: '#374151', border: 'none' }}>Cancel</button>
            <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', background: '#3b82f6', color: 'white', border: 'none' }}>Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealTaskDrawer;
