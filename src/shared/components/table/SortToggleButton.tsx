import { ArrowUp, ArrowDown } from 'lucide-react';
import type { SortOrder } from '../../hooks/useTableData';

interface SortToggleButtonProps {
  sortOrder: SortOrder | undefined;
  onToggle: () => void;
}

const SortToggleButton = ({ sortOrder, onToggle }: SortToggleButtonProps) => (
  <button type="button" className="btn btn-secondary" onClick={onToggle}>
    {sortOrder === 'DESC' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
    {sortOrder === 'DESC' ? 'Newest First' : 'Oldest First'}
  </button>
);

export default SortToggleButton;
