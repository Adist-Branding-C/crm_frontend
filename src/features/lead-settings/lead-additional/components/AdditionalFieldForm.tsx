import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Plus, Loader2, Pencil, X } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { FIELD_TYPE_OPTIONS } from '../../../../shared/constants/fieldTypes';
import DropdownValuesInput from './DropdownValuesInput';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import { FIELD_TYPES } from '../constants/fieldTypes';
import type { AdditionalFieldFormProps } from '../types/additional-field-form.types';
import './AdditionalFieldForm.css';

const AdditionalFieldForm = ({ form, status, purposes }: AdditionalFieldFormProps) => {
  const { validationSchema, initialValues, onSubmit, isEditing, editingFieldName, onCancelEdit } = form;
  const { isSaving, error, onClearError } = status;
  const formBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);
  const [currentDropdownValue, setCurrentDropdownValue] = useState('');

  return (
    <div className="additional-form-panel">
      <div className={`card${isEditing ? ' card--editing' : ''}`}>
        <div className="card-header">
          <div className="card-header-title">
            {isEditing && <Pencil size={16} className="card-header-icon" />}
            <h5>{isEditing ? 'Edit Field' : 'Add Field'}</h5>
          </div>
          {isEditing && onCancelEdit && (
            <button type="button" className="cancel-edit-btn" onClick={onCancelEdit}>
              <X size={14} /> Cancel
            </button>
          )}
        </div>
        {isEditing && editingFieldName && (
          <p className="editing-subtitle">Editing: "{editingFieldName}"</p>
        )}
        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, submitCount, isSubmitting, setFieldValue }) => {
              if (submitCount > prevSubmitCountRef.current) {
                prevSubmitCountRef.current = submitCount;
                if (Object.keys(errors).length > 0) {
                  requestAnimationFrame(() => scrollToFirstError(formBodyRef.current));
                }
              }

              const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
              const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

              const handleAddDropdownValue = () => {
                const trimmed = currentDropdownValue.trim();
                if (!trimmed) return;
                if (values.dropdownValues.some((v) => v.toLowerCase() === trimmed.toLowerCase())) return;
                setFieldValue('dropdownValues', [...values.dropdownValues, trimmed]);
                setCurrentDropdownValue('');
              };

              const handleRemoveDropdownValue = (index: number) => {
                setFieldValue('dropdownValues', values.dropdownValues.filter((_, i) => i !== index));
              };

              return (
                <div ref={formBodyRef}>
                  <ValidationAlert message={error} onClose={onClearError} />
                  <Form>
                    <div className="checkbox-group">
                      <label className="checkbox-item">
                        <Field type="checkbox" name="showInFilter" />
                        Is Shown in filter
                      </label>
                      <label className="checkbox-item">
                        <Field type="checkbox" name="showInList" />
                        Show in list
                      </label>
                      <label className="checkbox-item">
                        <Field type="checkbox" name="isRequired" />
                        Is Required?
                      </label>
                      <label className="checkbox-item">
                        <Field type="checkbox" name="connectWithLeadPurpose" />
                        Connect with lead purpose?
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Field Name <span className="text-danger">*</span></label>
                      <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter field name" />
                      {showError('name') && errors.name && <small className="field-error-text">{errors.name}</small>}
                    </div>
                    <div className="form-group">
                      <label>Select Type <span className="text-danger">*</span></label>
                      <Field as="select" name="fieldType" className={fieldClass('fieldType')}>
                        <option value="">Select Type</option>
                        {FIELD_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </Field>
                      {showError('fieldType') && errors.fieldType && <small className="field-error-text">{errors.fieldType}</small>}
                    </div>
                    {values.connectWithLeadPurpose && (
                      <div className="form-group">
                        <label>Select Purpose <span className="text-danger">*</span></label>
                        <Field as="select" name="purposeId" className={fieldClass('purposeId')}>
                          <option value="">Select Purpose</option>
                          {purposes.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                        </Field>
                        {showError('purposeId') && errors.purposeId && <small className="field-error-text">{errors.purposeId}</small>}
                      </div>
                    )}
                    {(values.fieldType === FIELD_TYPES.DROPDOWN || values.fieldType === FIELD_TYPES.CHECKBOX) && (
                      <>
                        <DropdownValuesInput
                          currentValue={currentDropdownValue}
                          values={values.dropdownValues}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentDropdownValue(e.target.value)}
                          onAdd={handleAddDropdownValue}
                          onRemove={handleRemoveDropdownValue}
                        />
                        {showError('dropdownValues') && errors.dropdownValues && (
                          <small className="field-error-text">{String(errors.dropdownValues)}</small>
                        )}
                      </>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={isSaving || isSubmitting}>
                      {isSaving || isSubmitting ? (
                        <><Loader2 size={16} className="spin" /> Saving...</>
                      ) : (
                        <><Plus size={16} /> {isEditing ? 'Update' : 'Add Field'}</>
                      )}
                    </button>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFieldForm;
