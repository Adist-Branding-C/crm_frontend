import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Edit2, X, Save, CheckCircle, Zap, Calendar, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Account.css';
import SettingsTabs from '../components/SettingsTabs';

const subMenuItems = [
  { id: 'agent', title: 'Agent', link: '/account' },
  { id: 'roles', title: 'Roles', link: '/account/roles' },
  { id: 'department', title: 'Departments', link: '/account/department' },
  { id: 'workmode', title: 'Staff Work Modes', link: '/account/workmode' },
  { id: 'checkout', title: 'Checkout Note', link: '/account/checkout' },
  { id: 'designation', title: 'Designations', link: '/account/designation' },
  { id: 'branch', title: 'Branch', link: '/account/branch' },
  { id: 'mailconfig', title: 'Mail Configuration', link: '/account/mailconfig' },
  { id: 'emailtemplate', title: 'Email Template', link: '/account/emailtemplate' },
  { id: 'whatsapptemplate', title: 'Whatsapp Template', link: '/account/whatsapptemplate' },
  { id: 'profile', title: 'Profile', link: '/account/profile' },
  { id: 'password', title: 'Change Password', link: '/account/password' },
];

const ProfilePage = () => {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: 'DR EXPERT EDULINKS',
    email: 'info@drexpertedu.com',
    mobile: '919656349000',
    address: '',
    gstNumber: '',
  });

  const profileData = {
    customerId: 'C5C8CD46',
    dateOfRegistration: '2025-11-05 14:16:52',
    accountStatus: 'Active',
    firstLetter: 'D'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    setShowForm(false);
  };

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="My Profile" description="View and manage your profile information" />

          <SettingsTabs />


          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="credit-cards">
                <div className="credit-card credit-total">
                  <p>Total Credits</p>
                  <h5>0</h5>
                </div>
                <div className="credit-card credit-used">
                  <p>Used Credits</p>
                  <h5>0</h5>
                </div>
                <div className="credit-card credit-balance">
                  <p>Credits Balance</p>
                  <h5>0</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="plan-details-card mb-5">
                <div className="card-header">
                  <h6>Plan Details</h6>
                </div>
                <div className="card-body">
                  <div className="plan-details-stats">
                    <div className="plan-stat-item">
                      <div className="stat-icon status-icon">
                        <CheckCircle size={20} />
                      </div>
                      <div className="stat-content">
                        <h5 className="status-active">Active</h5>
                        <p>Account Status</p>
                      </div>
                    </div>
                    <div className="plan-stat-item">
                      <div className="stat-icon plan-icon">
                        <Zap size={20} />
                      </div>
                      <div className="stat-content">
                        <h5>-</h5>
                        <p>No Active Plans</p>
                      </div>
                    </div>
                    <div className="plan-stat-item">
                      <div className="stat-icon expiry-icon">
                        <Calendar size={20} />
                      </div>
                      <div className="stat-content">
                        <h5>-</h5>
                        <p>Valid Until</p>
                      </div>
                    </div>
                    <div className="plan-stat-item">
                      <div className="stat-icon renewal-icon">
                        <RefreshCw size={20} />
                      </div>
                      <div className="stat-content">
                        <h5>-</h5>
                        <p>Auto Renewal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-5 col-md-5">
              <div className="profile-sidebar-card">
                <div className="user-avatar-section">
                  <div className="profile-avatar" style={{ background: '#6167e6' }}>
                    {profileData.firstLetter}
                  </div>
                </div>
                <div className="profile-name-section">
                  <h5>{formData.name}</h5>
                </div>
                <div className="contact-info-section">
                  <div className="section-header">
                    <h5>Contact info</h5>
                    <button className="edit-icon" onClick={() => setShowForm(true)}>
                      <Edit2 size={14} />
                    </button>
                  </div>
                  <ul className="contact-list">
                    <li>
                      <i className="fa fa-map-marker"></i>
                      {formData.address || 'Not Available'}
                    </li>
                    <li>
                      <i className="fa fa-mobile"></i>
                      {formData.mobile}
                    </li>
                    <li>
                      <i className="fa fa-envelope-o"></i>
                      {formData.email}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="profile-details-card">
                <div className="details-header">
                  <h4>My Profile Details</h4>
                  <button className="btn btn-sm btn-primary" onClick={() => setShowForm(true)}>
                    <Edit2 size={14} /> Edit
                  </button>
                </div>
                <div className="details-body">
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Customer Id</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{profileData.customerId}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Name</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{formData.name}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Email</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{formData.email}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Mobile Number</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{formData.mobile}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Address</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{formData.address || '-'}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">GST Number</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{formData.gstNumber || '-'}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Date of Registration</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{profileData.dateOfRegistration}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Account Status</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{profileData.accountStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="drawer-overlay" onClick={() => setShowForm(false)}>
          <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>Edit Profile</h5>
              <button className="drawer-close" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    className="form-control"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} /> Save Changes
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;