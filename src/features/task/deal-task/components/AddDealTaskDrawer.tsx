import { X } from 'lucide-react';
import DealTaskForm from './DealTaskForm';
import type { AddDealTaskDrawerProps } from '../types/add-deal-task-drawer.types';

const AddDealTaskDrawer = ({
  isOpen,
  onClose,
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  deals,
  dealListLoading,
  staffOptions,
}: AddDealTaskDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Deal Task' : 'Add Deal Task'}</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <DealTaskForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            isEditing={isEditing}
            deals={deals}
            dealListLoading={dealListLoading}
            staffOptions={staffOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AddDealTaskDrawer;
