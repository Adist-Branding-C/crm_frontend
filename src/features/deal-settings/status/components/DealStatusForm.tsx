import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../../task-settings/utils/scrollToFirstError';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../../shared/constants/actionLabels';
import { dealStatusValidationSchema } from '../validations/dealStatus.validation';
import { DEAL_STATUS_STAGE_OPTIONS, DEAL_STATUS_STATUS_OPTIONS } from '../constants/deal-status.constants';
import type { DealStatusFormData } from '../types/request';
import type { DealStatusItem } from '../types/interface';
import type { FormikHelpers } from 'formik';
import type { RefObject } from 'react';

interface DealStatusFormProps {
  editingItem: DealStatusItem | null;
  initialValues: DealStatusFormData;
  onSubmit: (values: DealStatusFormData, helpers: FormikHelpers<DealStatusFormData>) => Promise<void | boolean>;
  isLoading: boolean;
  error: string | null;
  onCancel: () => void;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

const DealStatusForm = ({
  editingItem,
  initialValues,
  onSubmit,
  isLoading,
  error,
  onCancel,
  scrollContainerRef,
}: DealStatusFormProps) => {
  const prevSubmitCountRef = useRef(0);
  const isEditing = !!editingItem;

  useEffect(() => {
    if (error) {
      scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error, scrollContainerRef]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={dealStatusValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, submitCount, isSubmitting }) => {
        if (submitCount > prevSubmitCountRef.current) {
          prevSubmitCountRef.current = submitCount;
          if (Object.keys(errors).length > 0) {
            requestAnimationFrame(() => scrollToFirstError(scrollContainerRef?.current ?? null));
          }
        }

        const fieldClass = (name: keyof DealStatusFormData) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

        return (
          <Form>
            {error && <ErrorMessage message={error} />}

            <div className="form-group">
              <label>Name <span className="text-danger">*</span></label>
              <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter deal status name" />
              <FormikError name="name" component="small" className="field-error-text" />
            </div>

            <div className="form-group">
              <label>Stage <span className="text-danger">*</span></label>
              <Field as="select" name="stage" className={fieldClass('stage')}>
                <option value="">Select Stage</option>
                {DEAL_STATUS_STAGE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Field>
              <FormikError name="stage" component="small" className="field-error-text" />
            </div>

            <div className="form-group">
              <label>Status <span className="text-danger">*</span></label>
              <Field as="select" name="status" className={fieldClass('status')}>
                <option value="">Select Status</option>
                {DEAL_STATUS_STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Field>
              <FormikError name="status" component="small" className="field-error-text" />
            </div>

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

export default DealStatusForm;
