import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, KeyRound, CheckCircle, XCircle } from 'lucide-react';
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

const PasswordPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Weak', color: '#ef4444' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: '#f59e0b' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 4, text: 'Strong', color: '#22c55e' };
    }
    return { strength: 3, text: 'Good', color: '#3b82f6' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      setErrorMessage('Please enter your current password');
      return;
    }

    if (formData.newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      return;
    }

    console.log('Password change submitted:', formData);
    setSuccessMessage('Password changed successfully!');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Change Password" description="Update your account password" />

          <SettingsTabs />


          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="password-page-card">
                <div className="card-header">
                  <h5>Change Password</h5>
                </div>
                <div className="card-body">
                  {successMessage && (
                    <div className="alert alert-success">
                      <CheckCircle size={18} />
                      {successMessage}
                    </div>
                  )}

                  {errorMessage && (
                    <div className="alert alert-danger">
                      <XCircle size={18} />
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Current Password <span className="text-danger">*</span></label>
                      <div className="password-input-wrapper">
                        <Lock size={18} className="input-icon" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          required
                          className="form-control with-icon"
                          placeholder="Enter current password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                        />
                        <span
                          className="field-icon"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>New Password <span className="text-danger">*</span></label>
                      <div className="password-input-wrapper">
                        <KeyRound size={18} className="input-icon" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          required
                          className="form-control with-icon"
                          placeholder="Enter new password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                        <span
                          className="field-icon"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                      </div>
                      {formData.newPassword && (
                        <div className="password-strength">
                          <div className="strength-bar">
                            <div
                              className="strength-fill"
                              style={{
                                width: `${passwordStrength.strength * 25}%`,
                                background: passwordStrength.color
                              }}
                            />
                          </div>
                          <span className="strength-text" style={{ color: passwordStrength.color }}>
                            {passwordStrength.text}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Confirm Password <span className="text-danger">*</span></label>
                      <div className="password-input-wrapper">
                        <KeyRound size={18} className="input-icon" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          required
                          className="form-control with-icon"
                          placeholder="Confirm new password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                        <span
                          className="field-icon"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                      </div>
                      {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                        <span className="text-success">
                          <CheckCircle size={14} /> Passwords match
                        </span>
                      )}
                      {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                        <span className="text-danger">
                          <XCircle size={14} /> Passwords do not match
                        </span>
                      )}
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        <Lock size={16} /> Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;