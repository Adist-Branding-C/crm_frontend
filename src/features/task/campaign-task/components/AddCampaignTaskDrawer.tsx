import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import GenericTaskForm from '../../shared/components/GenericTaskForm';
import type { AddCampaignTaskDrawerProps } from '../types/index';

const AddCampaignTaskDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, staffOptions, staffLoading, leadOptions, leadLoading }: AddCampaignTaskDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [error]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Add Campaign Task</h5>
          <button className="drawer-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="drawer-body" ref={drawerBodyRef}>
          <GenericTaskForm validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} isLoading={isLoading} error={error} isEditing={false} staffOptions={staffOptions} staffLoading={staffLoading ?? false} leadOptions={leadOptions} leadLoading={leadLoading ?? false} hideCategory />
        </div>
      </div>
    </div>
  );
};

export default AddCampaignTaskDrawer;
