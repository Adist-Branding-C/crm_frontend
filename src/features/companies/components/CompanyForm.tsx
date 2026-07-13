import React from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ValidationAlert from '../../../shared/components/ValidationAlert';
import { addCompanyValidationSchema } from '../validations/addCompany.validation';
import { COMPANY_STATUS_OPTIONS } from '../constants';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';
import { getErrorMessage } from '../../../shared/utils/error';
import { mapCompanyToFormValues } from '../mappers/companyMapper';
import type { NewCompany } from '../types';
import type { CompanyFormProps } from '../types/component.types';

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

/**
 * Pure form content for creating/editing a company - owns field state, validation, and
 * submission wiring (including its own submit-error display) only. No modal/drawer shell
 * markup. The actual create/update request is orchestrated by whoever passes in onSubmit -
 * this component just awaits it and surfaces a thrown error locally.
 *
 * Used by:
 * - CompaniesPage (composed inside the shared Modal shell)
 */
const CompanyForm: React.FC<CompanyFormProps> = ({ editingCompany, onSubmit, onCancel }) => {
  const isEditing = !!editingCompany;
  const initialValues: NewCompany = editingCompany ? mapCompanyToFormValues(editingCompany) : BASE_INITIAL_VALUES;

  const handleSubmit = async (values: NewCompany, { setStatus }: { setStatus: (status: string) => void }) => {
    setStatus('');
    try {
      await onSubmit(values);
    } catch (err: unknown) {
      setStatus(getErrorMessage(err, 'An unexpected error occurred'));
    }
  };

  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={addCompanyValidationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting, values, handleChange, handleBlur, submitForm, status, setStatus }) => (
        <>
          <div className="modal-body">
            <ValidationAlert message={status || null} onClose={() => setStatus('')} />
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
            <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
            <button className="btn btn-primary" type="button" onClick={submitForm} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 size={16} className="spin" /> {isEditing ? 'Saving...' : 'Adding...'}</> : isEditing ? 'Save Changes' : 'Add Company'}
            </button>
          </div>
        </>
      )}
    </Formik>
  );
};

export default CompanyForm;
