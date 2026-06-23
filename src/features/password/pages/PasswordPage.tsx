import { Eye, EyeOff, Lock, KeyRound, CheckCircle, XCircle } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import { usePasswordData } from '../hooks/usePasswordData';
import './PasswordPage.css';

const PasswordPage = () => {
  const {
    formData,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    successMessage,
    errorMessage,
    passwordStrength,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    handleInputChange,
    handleSubmit,
  } = usePasswordData();

  return (
    <div className="account-page">
      <PageHeader title="Change Password" description="Update your account password" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>

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
                          type={showCurrentPassword ? 'text' : 'password'}
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
                          type={showNewPassword ? 'text' : 'password'}
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
                          type={showConfirmPassword ? 'text' : 'password'}
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
  );
};

export default PasswordPage;
