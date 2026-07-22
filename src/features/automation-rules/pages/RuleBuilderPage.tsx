import { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Loader2 } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import ToastNotification from '../../../shared/components/ToastNotification';
import { ScrollToFirstError } from '../../../shared/components/ScrollToFirstError';
import TriggerSection from '../components/TriggerSection';
import ActionsSection from '../components/ActionsSection';
import ConfirmDialog from '../components/ConfirmDialog';
import { useRuleBuilder } from '../hooks/useRuleBuilder';
import { ruleBuilderValidationSchema } from '../validations';
import '../styles/automation.css';
import './RuleBuilderPage.css';

const RuleBuilderPage = () => {
  const { isEditing, isLoading, ruleNotFound, initialValues, handleSubmit, handleCancel, toast } = useRuleBuilder();
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="automation-rules-page">
        <PageHeader title="Loading rule…" breadcrumb={false} />
      </div>
    );
  }

  if (ruleNotFound) {
    return (
      <div className="automation-rules-page">
        <PageHeader title="Rule not found" breadcrumb={false} />
        <button className="btn btn-primary" onClick={handleCancel}>Back to Rules List</button>
      </div>
    );
  }

  return (
    <div className="automation-rules-page" ref={containerRef}>
      <PageHeader title={isEditing ? 'Edit Automation Rule' : 'Create Automation Rule'} breadcrumb={false} />

      <Formik
        initialValues={initialValues}
        validationSchema={ruleBuilderValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, dirty, submitCount, isSubmitting, setFieldValue }) => (
          <Form>
            <ScrollToFirstError errors={errors} submitCount={submitCount} containerRef={containerRef} />

            <div className="automation-builder-section">
              <h3>Basics</h3>
              <div className="form-group">
                <label>Rule Name</label>
                <Field name="name" className="form-control" placeholder="e.g. Auto-assign website leads" />
                {touched.name && errors.name && <small className="automation-field-error">{errors.name}</small>}
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <Field as="textarea" name="description" className="form-control" rows={2} />
              </div>
              <div className="form-group switch-field">
                <label className="toggle-switch">
                  <input type="checkbox" checked={values.isActive} onChange={(e) => setFieldValue('isActive', e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
                <label>Active</label>
              </div>
            </div>

            <TriggerSection />

            {values.triggerType !== 'REASSIGN' && values.triggerType !== 'NOTIFICATION' && values.triggerType !== '' && (
              <ActionsSection />
            )}

            <div className="automation-builder-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => (dirty ? setShowDiscardConfirm(true) : handleCancel())}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 size={16} className="spin" /> : 'Save Rule'}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ConfirmDialog
        isOpen={showDiscardConfirm}
        title="Discard changes"
        message="Discard unsaved changes?"
        confirmLabel="Discard"
        danger
        onConfirm={handleCancel}
        onClose={() => setShowDiscardConfirm(false)}
      />

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </div>
  );
};

export default RuleBuilderPage;
