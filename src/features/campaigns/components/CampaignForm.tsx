import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../task-settings/utils/scrollToFirstError';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { CAMPAIGN_TYPES, CAMPAIGN_TYPE_OPTIONS } from '../constants';
import AgentMultiSelect from './AgentMultiSelect';
import { useStaffOptions } from '../hooks/useStaffOptions';
import type { CampaignFormProps, CampaignFormData } from '../types';

const CampaignForm = ({ editingItem, validationSchema, initialValues, onSubmit, isLoading, error, onCancel, scrollContainerRef }: CampaignFormProps) => {
  const prevSubmitCountRef = useRef(0);
  const staff = useStaffOptions();
  const isEditing = !!editingItem;

  useEffect(() => {
    if (editingItem) {
      staff.setSelectedType(editingItem.type || '');
    } else {
      staff.clearCache();
      staff.setSelectedType('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingItem]);

  useEffect(() => {
    if (error) {
      scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error, scrollContainerRef]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, dirty, submitCount, isSubmitting, values, setFieldValue }) => {
          if (submitCount > prevSubmitCountRef.current) {
            prevSubmitCountRef.current = submitCount;
            if (Object.keys(errors).length > 0) {
              requestAnimationFrame(() => scrollToFirstError(scrollContainerRef?.current ?? null));
            }
          }

          const handleTypeChange = (type: string) => {
            setFieldValue('type', type);
            staff.setSelectedType(type);
          };

          const fieldClass = (name: keyof CampaignFormData) =>
            `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

          const fieldId = (name: keyof CampaignFormData) => `campaign-${name}`;
          const errorId = (name: keyof CampaignFormData) => `campaign-${name}-error`;
          const isInvalid = (name: keyof CampaignFormData) => !!(touched[name] && errors[name]);

          return (
            <Form>
              {error && <ErrorMessage message={error} />}

              <div className="form-group">
                <label htmlFor={fieldId('type')}>Type <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  id={fieldId('type')}
                  name="type"
                  className={fieldClass('type')}
                  aria-invalid={isInvalid('type')}
                  aria-describedby={isInvalid('type') ? errorId('type') : undefined}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleTypeChange(e.target.value)}
                >
                  <option value="">Select</option>
                  {CAMPAIGN_TYPE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Field>
                <FormikError name="type" component="small" id={errorId('type')} className="field-error-text" />
              </div>

              {values.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN && (
                <>
                  <div className="form-group">
                    <label htmlFor={fieldId('name')}>Name <span className="text-danger">*</span></label>
                    <Field
                      type="text"
                      id={fieldId('name')}
                      name="name"
                      className={fieldClass('name')}
                      placeholder="Enter campaign name"
                      aria-invalid={isInvalid('name')}
                      aria-describedby={isInvalid('name') ? errorId('name') : undefined}
                    />
                    <FormikError name="name" component="small" id={errorId('name')} className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label htmlFor={fieldId('startDate')}>Start Date <span className="text-danger">*</span></label>
                    <Field
                      type="date"
                      id={fieldId('startDate')}
                      name="startDate"
                      className={fieldClass('startDate')}
                      aria-invalid={isInvalid('startDate')}
                      aria-describedby={isInvalid('startDate') ? errorId('startDate') : undefined}
                    />
                    <FormikError name="startDate" component="small" id={errorId('startDate')} className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label htmlFor={fieldId('endDate')}>End Date <span className="text-danger">*</span></label>
                    <Field
                      type="date"
                      id={fieldId('endDate')}
                      name="endDate"
                      className={fieldClass('endDate')}
                      aria-invalid={isInvalid('endDate')}
                      aria-describedby={isInvalid('endDate') ? errorId('endDate') : undefined}
                    />
                    <FormikError name="endDate" component="small" id={errorId('endDate')} className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label htmlFor={fieldId('description')}>Description <span className="text-danger">*</span></label>
                    <Field
                      as="textarea"
                      id={fieldId('description')}
                      name="description"
                      className={fieldClass('description')}
                      placeholder="Enter description"
                      rows={3}
                      aria-invalid={isInvalid('description')}
                      aria-describedby={isInvalid('description') ? errorId('description') : undefined}
                    />
                    <FormikError name="description" component="small" id={errorId('description')} className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label id={`${fieldId('agents')}-label`}>Agents <span className="text-danger">*</span></label>
                    <AgentMultiSelect
                      agents={staff.agents}
                      selected={values.agents}
                      onChange={(selected) => setFieldValue('agents', selected)}
                      isLoading={staff.isLoading}
                      error={!!(touched.agents && errors.agents)}
                      labelledBy={`${fieldId('agents')}-label`}
                    />
                    <FormikError name="agents" component="small" id={errorId('agents')} className="field-error-text" />
                  </div>
                </>
              )}

              {values.type === CAMPAIGN_TYPES.DATA_POOL && (
                <>
                  <div className="form-group">
                    <label htmlFor={fieldId('poolName')}>Pool Name <span className="text-danger">*</span></label>
                    <Field
                      type="text"
                      id={fieldId('poolName')}
                      name="poolName"
                      className={fieldClass('poolName')}
                      placeholder="Enter pool name"
                      aria-invalid={isInvalid('poolName')}
                      aria-describedby={isInvalid('poolName') ? errorId('poolName') : undefined}
                    />
                    <FormikError name="poolName" component="small" id={errorId('poolName')} className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label id={`${fieldId('poolAgents')}-label`}>Agents <span className="text-danger">*</span></label>
                    <AgentMultiSelect
                      agents={staff.agents}
                      selected={values.poolAgents}
                      onChange={(selected) => setFieldValue('poolAgents', selected)}
                      isLoading={staff.isLoading}
                      error={!!(touched.poolAgents && errors.poolAgents)}
                      labelledBy={`${fieldId('poolAgents')}-label`}
                    />
                    <FormikError name="poolAgents" component="small" id={errorId('poolAgents')} className="field-error-text" />
                  </div>
                </>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? ACTION_UPDATE : ACTION_SAVE)}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>{ACTION_CANCEL}</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CampaignForm;
