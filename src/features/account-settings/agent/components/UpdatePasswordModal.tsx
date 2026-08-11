import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import Modal from '../../../../shared/components/Modal';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import { updatePasswordValidationSchema } from '../validations/agent.validation';

interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any, formikHelpers: any) => Promise<void>;
  isLoading?: boolean;
}

const UpdatePasswordModal = ({ isOpen, onClose, onSubmit, isLoading }: UpdatePasswordModalProps) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} title="Update Password" onClose={onClose} maxWidth="500px">
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={updatePasswordValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, submitCount, isSubmitting }) => {
          const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
          const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

          if (submitCount > 0 && Object.keys(errors).length > 0) {
            requestAnimationFrame(() => scrollToFirstError(modalBodyRef.current));
          }

          return (
            <Form noValidate>
              <div ref={modalBodyRef} className="modal-body">
                <div className="form-group">
                  <label>New Password <span className="text-danger">*</span></label>
                  <Field type="password" name="password" className={fieldClass('password')} placeholder="Enter new password" />
                  {showError('password') && errors.password && <small className="field-error-text">{errors.password}</small>}
                </div>
                <div className="form-group">
                  <label>Confirm Password <span className="text-danger">*</span></label>
                  <Field type="password" name="confirmPassword" className={fieldClass('confirmPassword')} placeholder="Enter confirm password" />
                  {showError('confirmPassword') && errors.confirmPassword && <small className="field-error-text">{errors.confirmPassword}</small>}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting}>
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : 'Update Password'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default UpdatePasswordModal;
