import React from 'react';
import { Plus } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { FIELD_TYPE_OPTIONS } from '../../../../shared/constants/fieldTypes';
import { dealAdditionalFieldValidationSchema } from '../validations/deal-additional-field.validation';
import type { AddDealAdditionalFieldFormPanelProps } from '../types/add-deal-additional-field-form-panel.types';

const DealAdditionalFieldFormPanel: React.FC<AddDealAdditionalFieldFormPanelProps> = ({
  initialValues, editingItem, onSubmit,
}) => (
  <div className="card">
    <div className="card-header">
      <h5>Add Field</h5>
    </div>
    <div className="card-body">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={dealAdditionalFieldValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <Field type="checkbox" name="inFilter" />
                Is Shown in filter
              </label>
              <label className="checkbox-item">
                <Field type="checkbox" name="inList" />
                Show in list
              </label>
              <label className="checkbox-item">
                <Field type="checkbox" name="required" />
                Is Required?
              </label>
            </div>
            <div className="form-group">
              <label>Field Name <span className="text-danger">*</span></label>
              <Field type="text" name="fieldName" className="form-control" placeholder="Enter field name" />
              {touched.fieldName && errors.fieldName && <small className="field-error-text">{errors.fieldName}</small>}
            </div>
            <div className="form-group">
              <label>Select Type <span className="text-danger">*</span></label>
              <Field as="select" name="fieldType" className="form-control">
                <option value="">Select Type</option>
                {FIELD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Field>
              {touched.fieldType && errors.fieldType && <small className="field-error-text">{errors.fieldType}</small>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Plus size={16} /> {editingItem ? 'Update' : 'Add Field'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default DealAdditionalFieldFormPanel;
