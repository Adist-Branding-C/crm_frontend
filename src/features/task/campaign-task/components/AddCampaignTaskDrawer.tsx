import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { AddCampaignTaskDrawerProps } from '../types/add-campaign-task-drawer.types';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
];

const CAMPAIGN_TYPE_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'social', label: 'Social Media' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' },
];

const AddCampaignTaskDrawer = ({
  isOpen,
  onClose,
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
}: AddCampaignTaskDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Campaign Task' : 'Add Campaign Task'}</h5>
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
              const formError = error || (submitCount > 0 ? Object.values(errors)[0] : '');
              return (
                <Form>
                  {formError && <ErrorMessage message={formError} />}

                  <div className="form-group">
                    <label>Title <span className="text-danger">*</span></label>
                    <Field type="text" name="title" className="form-control" placeholder="Enter campaign task title" />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <Field as="textarea" name="description" className="form-control" placeholder="Enter description" rows={3} />
                  </div>

                  <div className="form-group">
                    <label>Campaign Name</label>
                    <Field type="text" name="campaignName" className="form-control" placeholder="Enter campaign name" />
                  </div>

                  <div className="form-group">
                    <label>Campaign Type</label>
                    <Field as="select" name="campaignType" className="form-control">
                      <option value="">Select type</option>
                      {CAMPAIGN_TYPE_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </Field>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Scheduled Date</label>
                      <Field type="date" name="scheduledDate" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Scheduled Time</label>
                      <Field type="time" name="scheduledTime" className="form-control" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Assigned To</label>
                    <Field type="text" name="assignedTo" className="form-control" placeholder="Enter assignee name" />
                  </div>

                  <div className="form-group">
                    <label>Status <span className="text-danger">*</span></label>
                    <Field as="select" name="status" className="form-control">
                      <option value="">Select status</option>
                      {STATUS_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </Field>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                      {isLoading ? <Loader2 size={16} className="spin" /> : isEditing ? 'Update' : 'Save'}
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

export default AddCampaignTaskDrawer;
