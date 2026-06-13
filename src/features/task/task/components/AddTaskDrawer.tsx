import { X } from 'lucide-react';
import TaskForm from './TaskForm';
import type { AddTaskDrawerProps } from '../types/add-task-drawer.types';

const AddTaskDrawer = ({
  isOpen,
  onClose,
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  categoryOptions,
  staffOptions,
}: AddTaskDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Task' : 'Add Task'}</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <TaskForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            isEditing={isEditing}
            categoryOptions={categoryOptions}
            staffOptions={staffOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTaskDrawer;
