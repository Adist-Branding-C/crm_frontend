import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../task-settings/utils/scrollToFirstError';
import { CAMPAIGN_TYPES, CAMPAIGN_TYPE_OPTIONS } from '../constants';
import AgentMultiSelect from './AgentMultiSelect';
import { useStaffOptions } from '../hooks/useStaffOptions';
import type { AddCampaignDrawerProps, CampaignFormData } from '../types';

const AddCampaignDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddCampaignDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);
  const staff = useStaffOptions();

  useEffect(() => {
    if (isOpen) {
      staff.clearCache();
      staff.setSelectedType('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (error) {
      drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Add Campaign</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body" ref={drawerBodyRef}>
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
                  requestAnimationFrame(() => scrollToFirstError(drawerBodyRef.current));
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
                      {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : 'Save'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignDrawer;
