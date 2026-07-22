import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterButtonProps {
  showFilters: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ showFilters, onClick }) => (
  <button className="btn btn-secondary" onClick={onClick}>
    <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
  </button>
);

export default FilterButton;
