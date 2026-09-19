import { Plus } from 'lucide-react';
import './AddRowButton.css';

export interface AddRowButtonProps {
  label: string;
  hint?: string | undefined;
  ariaLabel?: string | undefined;
  onClick: () => void;
}


const AddRowButton = ({ label, hint, ariaLabel, onClick }: AddRowButtonProps) => (
  <button type="button" className="add-row-btn" aria-label={ariaLabel ?? label} onClick={onClick}>
    <span className="add-row-btn__icon" aria-hidden="true">
      <Plus size={14} strokeWidth={2.5} />
    </span>
    <span className="add-row-btn__label">{label}</span>
    {hint && <span className="add-row-btn__hint">{hint}</span>}
  </button>
);

export default AddRowButton;
