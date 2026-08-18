import React, { useState } from 'react';
import { X, Loader2, Eye, EyeOff } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import { companyDataService } from '../services/companyDataService';
import { addCompanyValidationSchema } from '../validations/addCompany.validation';
import { COMPANY_STATUS_OPTIONS } from '../constants';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';
import { getErrorMessage } from '../../../shared/utils/error';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '../../../shared/constants/countryCodes';
import type { Company, NewCompany } from '../types';
import type { CreateCompanyPayload } from '../types/request';

interface Props {
  isOpen: boolean;
  editingCompany: Company | null;
  onSaved: (action: 'created' | 'updated') => void;
  onClose: () => void;
}

const BASE_INITIAL_VALUES: NewCompany = {
  name: '',
  contactPersonName: '',
  email: '',
  phoneNumber: '',
  countryCode: DEFAULT_COUNTRY_CODE,
  address: '',
  gstNumber: '',
  dateOfRegistration: '',
  status: CompanyStatus.ACTIVE,
  adminPassword: '',
};

const AddCompanyModal: React.FC<Props> = ({ isOpen, editingCompany, onSaved, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const isEditing = !!editingCompany;
  const initialValues: NewCompany = editingCompany
    ? {
        name: editingCompany.name,
        contactPersonName: editingCompany.contactPersonName,
        email: editingCompany.email,
        phoneNumber: editingCompany.phone,
        countryCode: DEFAULT_COUNTRY_CODE,
        address: editingCompany.address,
        gstNumber: editingCompany.gstNumber,
        dateOfRegistration: editingCompany.dateOfRegistration?.slice(0, 10) ?? '',
        status: editingCompany.status,
        adminPassword: '',
      }
    : BASE_INITIAL_VALUES;

  const handleSubmit = async (values: NewCompany, { setStatus }: { setStatus: (status: string) => void }) => {
    setStatus('');
    const payload: CreateCompanyPayload = {
      name: values.name.trim(),
      contactPersonName: values.contactPersonName.trim(),
      email: values.email.trim(),
      phoneNumber: values.phoneNumber.trim(),
      countryCode: values.countryCode.trim(),
      status: values.status,
    };
    if (values.address.trim()) payload.address = values.address.trim();
    if (values.gstNumber.trim()) payload.gstNumber = values.gstNumber.trim();
    if (values.dateOfRegistration) payload.dateOfRegistration = values.dateOfRegistration;
    if (!isEditing) payload.adminPassword = values.adminPassword.trim();
    try {
      if (isEditing && editingCompany) {
        await companyDataService.updateCompany(editingCompany.companyId, payload);
      } else {
        await companyDataService.createCompany(payload);
      }
      onSaved(isEditing ? 'updated' : 'created');
      onClose();
    } catch (err: unknown) {
      setStatus(getErrorMessage(err, 'An unexpected error occurred'));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Company' : 'Add New Company'}</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <Formik initialValues={initialValues} validationSchema={addCompanyValidationSchema(isEditing)} onSubmit={handleSubmit}>
          {({ errors, touched, isSubmitting, values, handleChange, handleBlur, submitForm, status }) => (
            <>
              <div className="modal-body">
                {status && <div className="alert alert-danger">{status}</div>}
                <Form>
                  <div className="form-group">
                    <label>Company Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter company name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name ? 'error' : ''}
                    />
                    {errors.name && touched.name && <div className="error-text">{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label>Contact Person Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="contactPersonName"
                      placeholder="Enter contact person name"
                      value={values.contactPersonName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.contactPersonName && touched.contactPersonName ? 'error' : ''}
                    />
                    {errors.contactPersonName && touched.contactPersonName && <div className="error-text">{errors.contactPersonName}</div>}
                  </div>
                  <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? 'error' : ''}
                    />
                    {errors.email && touched.email && <div className="error-text">{errors.email}</div>}
                  </div>
                 <div className="form-group">
                    <label>Phone <span className="required">*</span></label>
                    <div className="phone-field-group">
                      <select
                        name="countryCode"
                        value={values.countryCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`phone-country-code${errors.countryCode && touched.countryCode ? ' error' : ''}`}
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={`${c.country}-${c.code}`} value={c.code}>{c.code} {c.country}</option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.phoneNumber && touched.phoneNumber ? 'error' : ''}
                      />
                    </div>
                    {errors.countryCode && touched.countryCode && <div className="error-text">{errors.countryCode}</div>}
                    {errors.phoneNumber && touched.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
                  </div>
                  {!isEditing && (
                    <div className="form-group">
                      <label>Admin Password <span className="required">*</span></label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="adminPassword"
                          placeholder="Enter password for the company admin login"
                          value={values.adminPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.adminPassword && touched.adminPassword ? 'error' : ''}
                          style={{ width: '100%', paddingRight: '2.25rem' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          style={{
                            position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#6b7280',
                          }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.adminPassword && touched.adminPassword && <div className="error-text">{errors.adminPassword}</div>}
                    </div>
                  )}
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>GST Number</label>
                      <input
                        type="text"
                        name="gstNumber"
                        placeholder="Enter GST number"
                        value={values.gstNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Registration</label>
                      <input
                        type="date"
                        name="dateOfRegistration"
                        value={values.dateOfRegistration}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <Field as="select" name="status">
                      {COMPANY_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Field>
                    <FormikError name="status" component="div" className="error-text" />
                  </div>
                </Form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" type="button" onClick={submitForm} disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={16} className="spin" /> {isEditing ? 'Saving...' : 'Adding...'}</> : isEditing ? 'Save Changes' : 'Add Company'}
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCompanyModal;
