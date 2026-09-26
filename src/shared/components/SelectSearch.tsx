import { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Search } from 'lucide-react';
import type { CSSProperties } from 'react';
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

const MENU_OFFSET = 4;
const VIEWPORT_MARGIN = 8;
const FALLBACK_DROPDOWN_HEIGHT = 260;

const SelectSearch = ({ options, value, name, onChange, onBlur, disabled, placeholder = 'Select', className = '' }: SelectSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState<CSSProperties>({});
  const [openUp, setOpenUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(() => options.find(o => o.value === value), [options, value]);
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  /**
   * Anchors the portaled menu to the trigger's bounding box using fixed
   * positioning and flips it above the trigger when there is not enough room
   * below (mirrors the ActionMenuPortal pattern used across task settings).
   */
  const updatePosition = useCallback(() => {
    if (!isOpen || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight || FALLBACK_DROPDOWN_HEIGHT;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldOpenUp = spaceBelow < menuHeight + MENU_OFFSET * 2 && spaceAbove > spaceBelow;
    setOpenUp(shouldOpenUp);
    setStyle({
      position: 'fixed',
      top: shouldOpenUp ? undefined : rect.bottom + MENU_OFFSET,
      bottom: shouldOpenUp ? window.innerHeight - rect.top + MENU_OFFSET : undefined,
      left: Math.max(VIEWPORT_MARGIN, Math.min(rect.left, window.innerWidth - rect.width - VIEWPORT_MARGIN)),
      width: rect.width,
      zIndex: 9999,
    });
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !(menuRef.current && menuRef.current.contains(e.target as Node))
      ) {
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

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition, filteredOptions]);

  useEffect(() => {
    if (!isOpen) return;
    const handleRefresh = () => updatePosition();
    window.addEventListener('scroll', handleRefresh, true);
    window.addEventListener('resize', handleRefresh);
    return () => {
      window.removeEventListener('scroll', handleRefresh, true);
      window.removeEventListener('resize', handleRefresh);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      setStyle({});
      setOpenUp(false);
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

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div ref={menuRef} className={`select-search-dropdown${openUp ? ' dropup' : ''}`} style={style}>
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
        </div>,
        document.body,
      )}
    </div>
  );
};

export default SelectSearch;