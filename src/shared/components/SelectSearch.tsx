import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import type { LabelValuePair } from '../types/common';
import './SelectSearch.css';

interface SelectSearchProps {
  options: LabelValuePair[];
  value: string;
  name?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const SelectSearch = ({ options, value, name, onChange, onBlur, disabled, placeholder = 'Select', className = '' }: SelectSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(() => options.find(o => o.value === value), [options, value]);
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
        if (onBlur && isOpen) {
          onBlur({ target: { name, value } });
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [name, value, onBlur, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (val: string) => {
    setIsOpen(false);
    setSearch('');
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
  };

  return (
    <div className={`select-search-container ${className} ${disabled ? 'disabled' : ''}`} ref={containerRef}>
      <div 
        className={`select-search-value ${isOpen ? 'open' : ''} ${!selectedOption ? 'is-placeholder' : ''}`} 
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown size={14} className="icon" />
      </div>

      {isOpen && (
        <div className="select-search-dropdown">
          <div className="select-search-input-wrapper">
            <Search size={14} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="select-search-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="select-search-options">
            <div 
              className={`select-search-option ${value === '' ? 'selected' : ''}`} 
              onClick={() => handleSelect('')}
            >
              {placeholder}
            </div>
            {filteredOptions.map((o) => (
              <div 
                key={o.value} 
                className={`select-search-option ${value === o.value ? 'selected' : ''}`} 
                onClick={() => handleSelect(o.value)}
              >
                {o.label}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="select-search-option empty">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSearch;
