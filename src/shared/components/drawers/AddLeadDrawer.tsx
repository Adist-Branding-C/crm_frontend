import Drawer from './Drawer';
import LeadForm from '../../../features/enquiries/components/LeadForm';
import type { AddLeadDrawerProps } from '../../types/drawers';
import './AddLeadDrawer.css';

const AddLeadDrawer = ({ isOpen, onClose, onSaved, lead }: AddLeadDrawerProps) => {
  const isEditing = !!lead;

  const handleChange = (field: keyof LeadFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and Phone are required');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const response = await leadsService.addLead(form as unknown as Record<string, unknown>);
      if (response.status) {
        setForm(INITIAL_FORM);
        onSuccess?.();
        onClose();
      } else {
        setError(response.message);
      }
    } catch {
      setError('Failed to create lead. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setError('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Lead' : 'Add New Lead'}
      overlayClassName="drawer-overlay"
      panelClassName="drawer-panel"
    >
      <LeadForm lead={lead} onSaved={onSaved} onClose={onClose} />
    </Drawer>
  );
};

export default AddLeadDrawer;
