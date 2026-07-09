import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import GenericTaskForm from '../../shared/components/GenericTaskForm';
import type { EditTaskDrawerProps } from '../types/index';

const EditTaskDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, editingItem, categoryOptions, staffOptions, leadOptions, leadLoading }: EditTaskDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  useEffect(() => {
    if (error) {
      drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  if (!isOpen || !editingItem) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Edit Task</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body" ref={drawerBodyRef}>
          <GenericTaskForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            isEditing
            staffOptions={staffOptions}
            categoryOptions={categoryOptions}
            leadOptions={leadOptions}
            leadLoading={leadLoading ?? false}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTaskDrawer;
