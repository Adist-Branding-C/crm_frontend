import { Plus, Loader2, Pencil, X } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import { FIELD_TYPE_OPTIONS } from '../../../../shared/constants/fieldTypes';
import DropdownValuesField from './DropdownValuesField';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { dealAdditionalFieldValidationSchema } from '../validations/deal-additional-field.validation';
import type { AddDealAdditionalFieldFormPanelProps } from '../types/add-deal-additional-field-form-panel.types';

const DealAdditionalFieldFormPanel = ({
  editingItem,
  initialValues,
  onSubmit,
  isSaving,
  error,
  onClearError,
  onCancelEdit,
}: AddDealAdditionalFieldFormPanelProps) => (
  <div className={`card${editingItem ? ' card--editing' : ''}`}>
    <div className="card-header">
      <div className="card-header-title">
        {editingItem && <Pencil size={16} className="card-header-icon" />}
        <h5>{editingItem ? 'Edit Field' : 'Add Field'}</h5>
      </div>
      {editingItem && (
        <button type="button" className="cancel-edit-btn" onClick={onCancelEdit}>
          <X size={14} /> Cancel
        </button>
      )}
    </div>
    {editingItem && (
      <p className="editing-subtitle">Editing: "{editingItem.field}"</p>
    )}
    <div className="card-body">
      <ValidationAlert message={error} onClose={onClearError} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={dealAdditionalFieldValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
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
              <FormikError name="fieldName" component="small" className="field-error-text" />
            </div>
            <div className="form-group">
              <label>Select Type <span className="text-danger">*</span></label>
              <Field as="select" name="fieldType" className="form-control">
                <option value="">Select Type</option>
                {FIELD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Field>
              <FormikError name="fieldType" component="small" className="field-error-text" />
            </div>
            {values.fieldType === 'Dropdown' && <DropdownValuesField />}
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? (
                <><Loader2 size={16} className="spin" /> Saving...</>
              ) : (
                <><Plus size={16} /> {editingItem ? 'Update' : 'Add Field'}</>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default DealAdditionalFieldFormPanel;
