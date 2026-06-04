import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';

interface AddCheckoutNoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: unknown;
  initialValues: { note: string };
  onSubmit: (values: { note: string }, helpers: { setSubmitting: (v: boolean) => void; resetForm: () => void }) => void;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}

const AddCheckoutNoteDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddCheckoutNoteDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Note' : 'Add Note'}</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, submitCount }) => {
              const formError = error || (submitCount > 0 ? Object.values(errors)[0] as string : '');
              return (
                <Form>
                  {formError && <ErrorMessage message={formError} />}

                  <div className="form-group">
                    <label>Note <span className="text-danger">*</span></label>
                    <Field as="textarea" name="note" className="form-control" placeholder="Enter checkout note" rows={4} />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                      {isLoading ? <Loader2 size={16} className="spin" /> : 'Save'}
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

export default AddCheckoutNoteDrawer;
