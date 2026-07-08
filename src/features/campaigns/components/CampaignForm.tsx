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

          return (
            <Form>
              {error && <ErrorMessage message={error} />}

              <div className="form-group">
                <label>Type <span className="text-danger">*</span></label>
                <Field as="select" name="type" className={fieldClass('type')} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleTypeChange(e.target.value)}>
                  <option value="">Select</option>
                  {CAMPAIGN_TYPE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Field>
                <FormikError name="type" component="small" className="field-error-text" />
              </div>

              {values.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN && (
                <>
                  <div className="form-group">
                    <label>Name <span className="text-danger">*</span></label>
                    <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter campaign name" />
                    <FormikError name="name" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <Field type="date" name="startDate" className={fieldClass('startDate')} />
                    <FormikError name="startDate" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <Field type="date" name="endDate" className={fieldClass('endDate')} />
                    <FormikError name="endDate" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <Field as="textarea" name="description" className={fieldClass('description')} placeholder="Enter description" rows={3} />
                    <FormikError name="description" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Agents <span className="text-danger">*</span></label>
                    <AgentMultiSelect
                      agents={staff.agents}
                      selected={values.agents}
                      onChange={(selected) => setFieldValue('agents', selected)}
                      isLoading={staff.isLoading}
                      error={!!(touched.agents && errors.agents)}
                    />
                    <FormikError name="agents" component="small" className="field-error-text" />
                  </div>
                </>
              )}

              {values.type === CAMPAIGN_TYPES.DATA_POOL && (
                <>
                  <div className="form-group">
                    <label>Pool Name <span className="text-danger">*</span></label>
                    <Field type="text" name="poolName" className={fieldClass('poolName')} placeholder="Enter pool name" />
                    <FormikError name="poolName" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Agents <span className="text-danger">*</span></label>
                    <AgentMultiSelect
                      agents={staff.agents}
                      selected={values.poolAgents}
                      onChange={(selected) => setFieldValue('poolAgents', selected)}
                      isLoading={staff.isLoading}
                      error={!!(touched.poolAgents && errors.poolAgents)}
                    />
                    <FormikError name="poolAgents" component="small" className="field-error-text" />
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
