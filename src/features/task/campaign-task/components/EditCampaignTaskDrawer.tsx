import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import GenericTaskForm from '../../shared/components/GenericTaskForm';
import type { EditCampaignTaskDrawerProps } from '../types/index';

const EditCampaignTaskDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, editingItem, staffOptions, staffLoading, leadOptions, leadLoading }: EditCampaignTaskDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [error]);

  if (!isOpen || !editingItem) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Edit Campaign Task</h5>
          <button className="drawer-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="drawer-body" ref={drawerBodyRef}>
          <GenericTaskForm validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} isLoading={isLoading} error={error} isEditing staffOptions={staffOptions} staffLoading={staffLoading ?? false} leadOptions={leadOptions} leadLoading={leadLoading ?? false} hideCategory />
        </div>
      </div>
    </div>
  );
};

export default EditCampaignTaskDrawer;
