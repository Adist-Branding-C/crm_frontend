import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { ScrollToFirstError } from '../../../shared/components/ScrollToFirstError';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { CAMPAIGN_TYPES, CAMPAIGN_TYPE_OPTIONS } from '../constants';
import AgentMultiSelect from './AgentMultiSelect';
import { useStaffOptions } from '../hooks/useStaffOptions';
import type { CampaignFormProps, CampaignFormData } from '../types/index';

/**
 * Formik-driven add/edit form for campaigns; the same component renders both modes based on the
 * initialValues/isEditing props the parent drawer passes in. Fields shown depend on the selected
 * `type` (Lead Campaign vs Data Pool).
 */
const CampaignForm = ({ validationSchema, initialValues, onSubmit, onCancel, isLoading, error, isEditing, bodyRef }: CampaignFormProps) => {
  const staff = useStaffOptions();

  useEffect(() => {
    if (isEditing) {
      staff.setSelectedType(initialValues.type || '');
    } else {
      staff.clearCache();
      staff.setSelectedType('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, initialValues.type]);

  useEffect(() => {
    if (error) {
      bodyRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error, bodyRef]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, submitCount, isSubmitting, values, setFieldValue }) => {
        const handleTypeChange = (type: string) => {
          setFieldValue('type', type);
          staff.setSelectedType(type);
        };

        const fieldClass = (name: keyof CampaignFormData) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

        return (
          <Form>
            <ScrollToFirstError errors={errors} submitCount={submitCount} containerRef={bodyRef} />
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
                  <label>Start Date <span className="text-danger">*</span></label>
                  <Field type="date" name="startDate" className={fieldClass('startDate')} />
                  <FormikError name="startDate" component="small" className="field-error-text" />
                </div>

                <div className="form-group">
                  <label>End Date <span className="text-danger">*</span></label>
                  <Field type="date" name="endDate" className={fieldClass('endDate')} />
                  <FormikError name="endDate" component="small" className="field-error-text" />
                </div>

                <div className="form-group">
                  <label>Description <span className="text-danger">*</span></label>
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
  );
};

export default CampaignForm;
