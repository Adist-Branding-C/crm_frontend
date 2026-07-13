import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { COMPANY_STATUS_OPTIONS, EMPTY_COMPANY_FILTERS } from '../constants';
import { SUBSCRIPTION_STATUS_OPTIONS } from '../subscription/constants/subscriptionStatusOptions';
import { companyFiltersValidationSchema } from '../validations/companyFilters.validation';
import type { CompaniesFiltersProps } from '../types/component.types';

const CompaniesFilters: React.FC<CompaniesFiltersProps> = ({ initialValues, onApply, onClear }) => (
  <Formik initialValues={initialValues} validationSchema={companyFiltersValidationSchema} onSubmit={onApply}>
    {({ errors, touched, resetForm }) => (
      <Form className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Status</label>
            <Field as="select" name="status">
              <option value="">All Status</option>
              {COMPANY_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Field>
          </div>
          <div className="filter-group">
            <label>Plan Status</label>
            <Field as="select" name="subscriptionStatus">
              <option value="">All Plans</option>
              {SUBSCRIPTION_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Field>
          </div>
          <div className="filter-group">
            <label>Licensed Seats</label>
            <div className="date-range-input">
              <div>
                <Field type="number" name="minLicensedSeats" min={0} placeholder="Min" className={errors.minLicensedSeats && touched.minLicensedSeats ? 'error' : ''} />
                <ErrorMessage name="minLicensedSeats" component="small" className="field-error-text" />
              </div>
              <span>to</span>
              <div>
                <Field type="number" name="maxLicensedSeats" min={0} placeholder="Max" className={errors.maxLicensedSeats && touched.maxLicensedSeats ? 'error' : ''} />
                <ErrorMessage name="maxLicensedSeats" component="small" className="field-error-text" />
              </div>
            </div>
          </div>
          <div className="filter-group">
            <label>Price Per Staff (₹)</label>
            <div className="date-range-input">
              <div>
                <Field type="number" name="minPerStaffPrice" min={0} placeholder="Min" className={errors.minPerStaffPrice && touched.minPerStaffPrice ? 'error' : ''} />
                <ErrorMessage name="minPerStaffPrice" component="small" className="field-error-text" />
              </div>
              <span>to</span>
              <div>
                <Field type="number" name="maxPerStaffPrice" min={0} placeholder="Max" className={errors.maxPerStaffPrice && touched.maxPerStaffPrice ? 'error' : ''} />
                <ErrorMessage name="maxPerStaffPrice" component="small" className="field-error-text" />
              </div>
            </div>
          </div>
          <div className="filter-group">
            <label className="checkbox-item">
              <Field type="checkbox" name="soonExpiring" />
              Soon expiring only
            </label>
          </div>
          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">{ACTION_FILTER}</button>
            <button type="button" className="btn btn-secondary" onClick={() => { resetForm({ values: EMPTY_COMPANY_FILTERS }); onClear(); }}>{ACTION_CLEAR}</button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default CompaniesFilters;
