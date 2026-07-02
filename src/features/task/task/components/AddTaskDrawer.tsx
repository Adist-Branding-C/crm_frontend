import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import GenericTaskForm from '../../shared/components/GenericTaskForm';
import type { AddTaskDrawerProps } from '../types/index';

const AddTaskDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing = false, categoryOptions, staffOptions, leadOptions, leadLoading }: AddTaskDrawerProps) => {
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
          <GenericTaskForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            isEditing={isEditing}
            categoryOptions={categoryOptions}
            staffOptions={staffOptions}
            leadOptions={leadOptions}
            leadLoading={leadLoading ?? false}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTaskDrawer;
