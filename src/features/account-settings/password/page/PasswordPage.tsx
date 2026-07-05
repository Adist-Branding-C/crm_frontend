import { Eye, EyeOff, Lock, KeyRound, CheckCircle, XCircle, Loader2, Check, X } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { usePasswordData } from '../hooks/usePasswordData';
import { changePasswordValidationSchema } from '../validations';
import { INITIAL_PASSWORD_FORM } from '../constants';
import './PasswordPage.css';

const PasswordPage = () => {
  const {
    isLoading,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    toastMessage,
    toastType,
    showToast,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    setShowToast,
    getPasswordStrength,
    handleSubmit,
  } = usePasswordData();

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
                  <Formik
                    enableReinitialize
                    initialValues={INITIAL_PASSWORD_FORM}
                    validationSchema={changePasswordValidationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched, submitCount }) => {
                      const passwordStrength = getPasswordStrength(values.newPassword);
                      const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;

                      return (
                        <Form>
                          <div className="form-group">
                            <label>Current Password <span className="text-danger">*</span></label>
                            <div className="password-input-wrapper">
                              <Lock size={18} className="input-icon" />
                              <Field
                                type={showCurrentPassword ? 'text' : 'password'}
                                name="currentPassword"
                                className="form-control with-icon"
                                placeholder="Enter current password"
                              />
                              <span
                                className="field-icon"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </span>
                            </div>
                            {showError('currentPassword') && errors.currentPassword && (
                              <small className="field-error-text">{errors.currentPassword}</small>
                            )}
                          </div>

                          <div className="form-group">
                            <label>New Password <span className="text-danger">*</span></label>
                            <div className="password-input-wrapper">
                              <KeyRound size={18} className="input-icon" />
                              <Field
                                type={showNewPassword ? 'text' : 'password'}
                                name="newPassword"
                                className="form-control with-icon"
                                placeholder="Enter new password"
                              />
                              <span
                                className="field-icon"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </span>
                            </div>
                            {values.newPassword && (
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
                            {showError('newPassword') && errors.newPassword && (
                              <small className="field-error-text">{errors.newPassword}</small>
                            )}
                          </div>

                          <div className="form-group">
                            <label>Confirm Password <span className="text-danger">*</span></label>
                            <div className="password-input-wrapper">
                              <KeyRound size={18} className="input-icon" />
                              <Field
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                className="form-control with-icon"
                                placeholder="Confirm new password"
                              />
                              <span
                                className="field-icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </span>
                            </div>
                            {values.confirmPassword && values.newPassword === values.confirmPassword && (
                              <span className="text-success">
                                <CheckCircle size={14} /> Passwords match
                              </span>
                            )}
                            {values.confirmPassword && values.newPassword !== values.confirmPassword && (
                              <span className="text-danger">
                                <XCircle size={14} /> Passwords do not match
                              </span>
                            )}
                            {showError('confirmPassword') && errors.confirmPassword && (
                              <small className="field-error-text">{errors.confirmPassword}</small>
                            )}
                          </div>

                          <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                              {isLoading ? <Loader2 size={16} className="spin" /> : <Lock size={16} />}
                              {' '} Change Password
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className={`toast-notification toast-${toastType}`} onClick={() => setShowToast(false)}>
          {toastType === 'success' ? <Check size={18} /> : <X size={18} />}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordPage;
