import { X } from 'lucide-react';
import CampaignTaskForm from './CampaignTaskForm';
import type { AddCampaignTaskDrawerProps } from '../types/add-campaign-task-drawer.types';

const AddCampaignTaskDrawer = ({
  isOpen,
  onClose,
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  staffOptions,
  campaignOptions,
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
          <CampaignTaskForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            isEditing={isEditing}
            staffOptions={staffOptions}
            campaignOptions={campaignOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCampaignTaskDrawer;
