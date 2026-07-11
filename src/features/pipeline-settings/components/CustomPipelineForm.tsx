import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../shared/components/ValidationAlert';
import { scrollToFirstError } from '../../../shared/utils/scrollToError.util';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import {
  CUSTOM_PIPELINE_COLUMN_NAME,
  CUSTOM_PIPELINE_COLUMN_ENTITY_TYPE,
  CUSTOM_PIPELINE_COLUMN_GROUP_BY,
  CUSTOM_PIPELINE_COLUMN_STATUS,
  PIPELINE_ENTITY_TYPE_OPTIONS,
  GROUP_BY_FIELD_OPTIONS,
} from '../constants';
import type { CustomPipelineFormProps } from '../types/custom-pipeline-form.types';

const CustomPipelineForm = ({ form, status }: CustomPipelineFormProps) => {
  const { validationSchema, initialValues, onSubmit, onCancel, isEditing } = form;
  const { isLoading, error, onClearError } = status;
  const formBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, submitCount, isSubmitting }) => {
        if (submitCount > prevSubmitCountRef.current) {
          prevSubmitCountRef.current = submitCount;
          if (Object.keys(errors).length > 0) {
            requestAnimationFrame(() => scrollToFirstError(formBodyRef.current));
          }
        }

        const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
        const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

        return (
          <div ref={formBodyRef}>
            <Form>
              <ValidationAlert message={error || null} onClose={onClearError} />

              <div className="form-group">
                <label>{CUSTOM_PIPELINE_COLUMN_NAME} <span className="text-danger">*</span></label>
                <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter pipeline name" />
                {showError('name') && errors.name && <small className="field-error-text">{errors.name}</small>}
              </div>

              <div className="form-group">
                <label>{CUSTOM_PIPELINE_COLUMN_ENTITY_TYPE} <span className="text-danger">*</span></label>
                <Field as="select" name="entityType" className={fieldClass('entityType')} disabled={isEditing}>
                  {PIPELINE_ENTITY_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Field>
                {isEditing && <small className="field-hint-text">The entity a pipeline applies to can&apos;t be changed after creation.</small>}
                {showError('entityType') && errors.entityType && <small className="field-error-text">{errors.entityType}</small>}
              </div>

              <div className="form-group">
                <label>{CUSTOM_PIPELINE_COLUMN_GROUP_BY} <span className="text-danger">*</span></label>
                <Field as="select" name="groupByField" className={fieldClass('groupByField')}>
                  {GROUP_BY_FIELD_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Field>
                {showError('groupByField') && errors.groupByField && <small className="field-error-text">{errors.groupByField}</small>}
              </div>

              {isEditing && (
                <div className="form-group switch-field">
                  <label className="toggle-switch">
                    <Field type="checkbox" name="isActive" />
                    <span className="toggle-slider"></span>
                  </label>
                  <label>{CUSTOM_PIPELINE_COLUMN_STATUS}</label>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? ACTION_UPDATE : ACTION_SAVE)}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>{ACTION_CANCEL}</button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default CustomPipelineForm;
