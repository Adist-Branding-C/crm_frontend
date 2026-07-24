import React from 'react';
import { Plus } from 'lucide-react';

interface AddLeadButtonProps {
  onClick: () => void;
}

const AddLeadButton: React.FC<AddLeadButtonProps> = ({ onClick }) => (
  <button className="btn btn-primary" onClick={onClick}>
    <Plus size={16} /> Add Lead
  </button>
);

export default AddLeadButton;
