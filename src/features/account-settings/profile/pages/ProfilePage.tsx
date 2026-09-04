import { Edit2, X, Save, CheckCircle, Zap, Calendar, RefreshCw, Check, Loader2, AlertCircle } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { useProfileData } from '../hooks/useProfileData';
import { profileValidationSchema } from '../validations/profile.validation';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import { Skeleton } from '../../../../shared/components/Skeleton';
import './ProfilePage.css';
import { COUNTRY_CODES } from '../../../../shared/constants/countryCodes';

function formatDate(value: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString();
}

const ProfilePage = () => {
  const d = useProfileData();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="My Profile" description="View and manage your profile information" />

          <SettingsTabs />

          <div className="row">
            <div className="col-lg-12">
              <div className="plan-details-card mb-5">
                <div className="card-header">
                  <h6>Plan Details</h6>
                </div>
                <div className="card-body">
                  {d.error ? (
                    <div className="profile-fetch-error">
                      <AlertCircle size={16} />
                      <span>{d.error}</span>
                      <button type="button" className="btn btn-sm btn-secondary" onClick={() => d.retryFetchProfile()}>
                        Retry
                      </button>
                    </div>
                  ) : (
                    <div className="plan-details-stats">
                      <div className="plan-stat-item">
                        <div className="stat-icon status-icon">
                          <CheckCircle size={20} />
                        </div>
                        <div className="stat-content">
                          {d.isLoading ? <Skeleton width="3rem" height="1.5rem" /> : <h5 className="status-active">{d.planDetails.accountStatus ?? '—'}</h5>}
                          <p>Account Status</p>
                        </div>
                      </div>
                      <div className="plan-stat-item">
                        <div className="stat-icon plan-icon">
                          <Zap size={20} />
                        </div>
                        <div className="stat-content">
                          {d.isLoading ? <Skeleton width="3rem" height="1.5rem" /> : <h5>{d.planDetails.activePlanName || '—'}</h5>}
                          <p>Active Plan</p>
                        </div>
                      </div>
                      <div className="plan-stat-item">
                        <div className="stat-icon expiry-icon">
                          <Calendar size={20} />
                        </div>
                        <div className="stat-content">
                          {d.isLoading ? <Skeleton width="3rem" height="1.5rem" /> : <h5>{formatDate(d.planDetails.validUntil)}</h5>}
                          <p>Valid Until</p>
                        </div>
                      </div>
                      <div className="plan-stat-item">
                        <div className="stat-icon renewal-icon">
                          <RefreshCw size={20} />
                        </div>
                        <div className="stat-content">
                          {d.isLoading ? <Skeleton width="3rem" height="1.5rem" /> : <h5>{d.planDetails.autoRenewal ? 'Yes' : 'No'}</h5>}
                          <p>Auto Renewal</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-5 col-md-5">
              <div className="profile-sidebar-card">
                <div className="user-avatar-section">
                  <div className="profile-avatar" style={{ background: 'var(--primary)' }}>
                    {d.profileData.firstLetter}
                  </div>
                </div>
                <div className="profile-name-section">
                  <h5>{d.formData.name}</h5>
                </div>
                <div className="contact-info-section">
                  <div className="section-header">
                    <h5>Contact info</h5>
                    <button className="edit-icon" onClick={() => d.setShowForm(true)}>
                      <Edit2 size={14} />
                    </button>
                  </div>
                  <ul className="contact-list">
                    <li>
                      <i className="fa fa-mobile"></i>
                      {d.formData.countryCode ? `${d.formData.countryCode}\u00A0${d.formData.mobile}` : d.formData.mobile}
                    </li>
                    <li>
                      <i className="fa fa-envelope-o"></i>
                      {d.formData.email}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              <div className="profile-details-card">
                <div className="details-header">
                  <h4>My Profile Details</h4>
                  <button className="btn btn-sm btn-primary" onClick={() => d.setShowForm(true)}>
                    <Edit2 size={14} /> Edit
                  </button>
                </div>
                <div className="details-body">
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Customer Id</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{d.profileData.customerId}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Name</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{d.formData.name}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Email</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{d.formData.email}</p>
                    </div>
                  </div>
<div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Mobile Number</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">
                        {d.formData.countryCode ? `${d.formData.countryCode}\u00A0${d.formData.mobile}` : d.formData.mobile}
                      </p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Date of Registration</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{formatDate(d.profileData.dateOfRegistration)}</p>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="col-md-4">
                      <p className="detail-label">Account Status</p>
                    </div>
                    <div className="col-md-7">
                      <p className="detail-value">{d.profileData.accountStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DrawerShell isOpen={d.showForm} title="Edit Profile" onClose={() => d.setShowForm(false)}>
        <Formik
          enableReinitialize
          initialValues={d.formData}
          validationSchema={profileValidationSchema}
          onSubmit={d.handleSubmit}
        >
{({ errors, touched, dirty, submitCount, isSubmitting, values, handleBlur, setFieldValue, setFieldTouched }) => {
            const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
            const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

            return (
              <Form noValidate>
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <Field type="text" name="name" className={fieldClass('name')} />
                  {showError('name') && errors.name && <small className="field-error-text">{errors.name}</small>}
                </div>
                <div className="form-group">
                  <label>Email <span className="text-danger">*</span></label>
                  <Field type="email" name="email" className={fieldClass('email')} />
                  {showError('email') && errors.email && <small className="field-error-text">{errors.email}</small>}
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="phone-field-group">
                    <select
                      name="countryCode"
                      value={values.countryCode}
                      onChange={(e) => {
                        setFieldValue('countryCode', e.target.value);
                        setFieldTouched('countryCode', true, false);
                      }}
                      onBlur={handleBlur}
                      className={`phone-country-code${showError('countryCode') && errors.countryCode ? ' error' : ''}`}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={`${c.country}-${c.code}`} value={c.code}>{c.code} {c.country}</option>
                      ))}
                    </select>
                    <Field type="tel" name="mobile" className={fieldClass('mobile')} />
                  </div>
{showError('countryCode') && errors.countryCode && <small className="field-error-text">{errors.countryCode}</small>}
                  {showError('mobile') && errors.mobile && <small className="field-error-text">{errors.mobile}</small>}
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting || !dirty}>
                    {isSubmitting ? <Loader2 size={16} className="spin" /> : <Save size={16} />} Save Changes
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => d.setShowForm(false)}>Cancel</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DrawerShell>

      {d.showToast && (
        <div className={`toast-notification toast-${d.toastType}`} onClick={() => d.setShowToast(false)}>
          {d.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
          <span>{d.toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
