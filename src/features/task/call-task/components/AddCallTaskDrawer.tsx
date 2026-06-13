import { X } from 'lucide-react';
import CallTaskForm from './CallTaskForm';
import type { AddCallTaskDrawerProps } from '../types/add-call-task-drawer.types';

const AddCallTaskDrawer = ({
  isOpen,
  onClose,
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  staffOptions,
}: AddCallTaskDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Call Task' : 'Add Call Task'}</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <CallTaskForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            isEditing={isEditing}
            staffOptions={staffOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCallTaskDrawer;
