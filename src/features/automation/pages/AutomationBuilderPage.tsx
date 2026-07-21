import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import TriggerConfigFields from '../components/TriggerConfigFields';
import AutomationActionsSection from '../components/AutomationActionsSection';
import { useAutomationFormOptions, useAutomationRuleDetail, useAutomationBuilderSubmit } from '../hooks';
import { AutomationMapper } from '../mappers/automation.mapper';
import { automationValidationSchema } from '../validations';
import { AUTOMATION_TRIGGER_TYPE_OPTIONS, ADD_AUTOMATION_INITIAL_VALUES, TRIGGER_ACTION_MATRIX } from '../constants';
import type { AutomationFormData } from '../types/interface';
import './AutomationBuilderPage.css';

const AutomationBuilderPage = () => {
  const { automationId } = useParams<{ automationId?: string }>();
  const navigate = useNavigate();
  const isEditing = !!automationId;
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  const { rule, isLoading: isLoadingRule, error: loadError } = useAutomationRuleDetail(automationId);
  const options = useAutomationFormOptions();
  const { handleSubmit, isLoading: isSubmitting, error: submitError } = useAutomationBuilderSubmit(automationId);

  const initialValues: AutomationFormData = isEditing
    ? (rule ? AutomationMapper.toFormValues(rule) : ADD_AUTOMATION_INITIAL_VALUES)
    : ADD_AUTOMATION_INITIAL_VALUES;

  if (isEditing && isLoadingRule) {
    return (
      <PageContainer>
        <PageHeader title="Edit Automation" breadcrumb={false} />
        <div className="automation-builder-loading"><Loader2 size={24} className="spin" /></div>
      </PageContainer>
    );
  }

  if (isEditing && loadError) {
    return (
      <PageContainer>
        <PageHeader title="Edit Automation" breadcrumb={false} />
        <ErrorMessage message={loadError} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={isEditing ? 'Edit Automation' : 'Add Automation'}
        description="Configure when this automation fires and what it does."
        breadcrumb={false}
      />

      <div className="automation-builder-body" ref={bodyRef}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={automationValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, submitCount, isSubmitting: formikSubmitting, setFieldValue }) => {
            if (submitCount > prevSubmitCountRef.current) {
              prevSubmitCountRef.current = submitCount;
              if (Object.keys(errors).length > 0) {
                requestAnimationFrame(() => {
                  const errorEl = bodyRef.current?.querySelector('.input-error, .field-error-text');
                  errorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
              }
            }

            // REASSIGN/NOTIFICATION can't carry user-configured actions (built-in
            // only) — clear any leftover actions when switching to one of them,
            // handled directly in the select's onChange (same pattern
            // CampaignForm.tsx uses for its own type-change side effects)
            // rather than a useEffect, since this callback runs inside
            // Formik's render-prop and can't call hooks of its own.
            const handleTriggerTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
              const nextTriggerType = e.target.value as AutomationFormData['triggerType'];
              setFieldValue('triggerType', nextTriggerType);
              const nextAllowedActions = nextTriggerType ? TRIGGER_ACTION_MATRIX[nextTriggerType] : [];
              if (nextAllowedActions.length === 0) {
                setFieldValue('actions', []);
              }
            };

            const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
            const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

            return (
              <Form>
                {(submitError) && <ErrorMessage message={submitError} />}

                <section className="automation-builder-section">
                  <h3 className="section-title">Basic Information</h3>

                  <div className="form-group">
                    <label>Automation Name <span className="text-danger">*</span></label>
                    <Field type="text" name="name" className={fieldClass('name')} placeholder="e.g. Assign Meta leads to Sales" />
                    {showError('name') && errors.name && <small className="field-error-text">{errors.name}</small>}
                  </div>

                  <div className="form-group">
                    <label>Automation Type <span className="text-danger">*</span></label>
                    <Field as="select" name="triggerType" className={fieldClass('triggerType')} onChange={handleTriggerTypeChange}>
                      <option value="">Select automation type</option>
                      {AUTOMATION_TRIGGER_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Field>
                    {showError('triggerType') && errors.triggerType && <small className="field-error-text">{errors.triggerType}</small>}
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <div>
                      <label className="toggle-switch">
                        <Field type="checkbox" name="isActive" />
                        <span className="toggle-slider" />
                      </label>
                      <span style={{ marginLeft: '0.75rem' }}>{values.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                </section>

                <section className="automation-builder-section">
                  <h3 className="section-title">Trigger Configuration</h3>
                  <TriggerConfigFields
                    triggerType={values.triggerType}
                    triggerConfig={values.triggerConfig}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    statusOptions={options.statusOptions}
                    staffOptions={options.staffOptions}
                    departmentOptions={options.departmentOptions}
                    optionsLoading={options.isLoading}
                  />
                </section>

                <section className="automation-builder-section">
                  <h3 className="section-title">Actions</h3>
                  <AutomationActionsSection
                    triggerType={values.triggerType}
                    actions={values.actions}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    sourceOptions={options.sourceOptions}
                    statusOptions={options.statusOptions}
                    purposeOptions={options.purposeOptions}
                    staffOptions={options.staffOptions}
                    departmentOptions={options.departmentOptions}
                    campaignOptions={options.campaignOptions}
                    optionsLoading={options.isLoading}
                  />
                </section>

                <div className="form-actions flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting || formikSubmitting}>
                    {isSubmitting || formikSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? 'Update Automation' : 'Save Automation')}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/automation')}>Cancel</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </PageContainer>
  );
};

export default AutomationBuilderPage;
