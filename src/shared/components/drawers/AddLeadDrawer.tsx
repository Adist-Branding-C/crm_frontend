import React from 'react';
import { X } from 'lucide-react';
import type { AddLeadDrawerProps } from '../../types/drawers';
import './AddLeadDrawer.css';

const AddLeadDrawer = ({ isOpen, onClose }: AddLeadDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Add New Lead</h2>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <form className="lead-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Enter phone number" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Assigned To</label>
              <select>
                <option value="">Select</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="mike">Mike Johnson</option>
              </select>
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <select>
                <option value="">Select</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
                <option value="demo">Demo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select>
                <option value="">Select</option>
                <option value="hot">Hot Lead</option>
                <option value="warm">Warm Lead</option>
                <option value="cold">Cold Lead</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select>
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="form-group">
              <label>Source</label>
              <select>
                <option value="">Select</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="email">Email Campaign</option>
              </select>
            </div>
            <div className="form-group">
              <label>Next Follow Up</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea placeholder="Enter notes" rows={4}></textarea>
            </div>
          </form>
        </div>
        <div className="drawer-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary">Save Lead</button>
        </div>
      </div>
    </div>
  );
};

export default AddLeadDrawer;