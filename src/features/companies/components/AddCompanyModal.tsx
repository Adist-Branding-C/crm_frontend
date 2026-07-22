import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import { companyDataService } from '../services/companyDataService';
import { addCompanyValidationSchema } from '../validations/addCompany.validation';
import { COMPANY_STATUS_OPTIONS } from '../constants';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';
import { getErrorMessage } from '../../../shared/utils/error';
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
  address: '',
  gstNumber: '',
  dateOfRegistration: '',
  status: CompanyStatus.ACTIVE,
};

const AddCompanyModal: React.FC<Props> = ({ isOpen, editingCompany, onSaved, onClose }) => {
  if (!isOpen) return null;

  const isEditing = !!editingCompany;
  const initialValues: NewCompany = editingCompany
    ? {
        name: editingCompany.name,
        contactPersonName: editingCompany.contactPersonName,
        email: editingCompany.email,
        phoneNumber: editingCompany.phone,
        address: editingCompany.address,
        gstNumber: editingCompany.gstNumber,
        dateOfRegistration: editingCompany.dateOfRegistration?.slice(0, 10) ?? '',
        status: editingCompany.status,
      }
    : BASE_INITIAL_VALUES;

  const handleSubmit = async (values: NewCompany, { setStatus }: { setStatus: (status: string) => void }) => {
    setStatus('');
    const payload: CreateCompanyPayload = {
      name: values.name.trim(),
      contactPersonName: values.contactPersonName.trim(),
      email: values.email.trim(),
      phoneNumber: values.phoneNumber.trim(),
      status: values.status,
    };
    if (values.address.trim()) payload.address = values.address.trim();
    if (values.gstNumber.trim()) payload.gstNumber = values.gstNumber.trim();
    if (values.dateOfRegistration) payload.dateOfRegistration = values.dateOfRegistration;
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
        <Formik initialValues={initialValues} validationSchema={addCompanyValidationSchema} onSubmit={handleSubmit}>
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
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.phoneNumber && touched.phoneNumber ? 'error' : ''}
                    />
                    {errors.phoneNumber && touched.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
                  </div>
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
