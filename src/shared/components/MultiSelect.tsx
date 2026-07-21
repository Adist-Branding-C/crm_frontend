import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, X, ChevronDown, Check, Loader2 } from 'lucide-react';
import type { LabelValuePair } from '../types/common';
import './MultiSelect.css';

interface MultiSelectProps {
  options: LabelValuePair[];
  selected: string[];
  onChange: (selected: string[]) => void;
  isLoading?: boolean;
  error?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

/**
 * Generic multi-select combobox: trigger + tag chips, search, keyboard nav,
 * outside-click-to-close, dropdown positioning. Operates on the app-wide
 * {value, label} option shape (LabelValuePair) instead of any one domain's
 * entity, so it's reusable for lead sources/statuses/purposes and anything
 * else that needs a multi-select.
 *
 * Extracted from src/features/campaigns/components/AgentMultiSelect.tsx's
 * shell (trigger/chips/search/keyboard-nav) minus the agent-specific avatar
 * rendering, which doesn't generalize. AgentMultiSelect itself is untouched -
 * it still renders avatars and stays campaign-specific.
 */
const MultiSelect = ({
  options,
  selected,
  onChange,
  isLoading,
  error,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No options available',
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current) {
      const items = optionsRef.current.querySelectorAll('.multi-select-option');
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const toggleOption = useCallback(
    (value: string) => {
      onChange(
        selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value],
      );
    },
    [selected, onChange],
  );

  const removeOption = useCallback(
    (value: string) => {
      onChange(selected.filter((v) => v !== value));
    },
    [selected, onChange],
  );

  const selectedOptions = useMemo(() => options.filter((o) => selected.includes(o.value)), [options, selected]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearch('');
          break;
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
          break;
        case 'Enter': {
          e.preventDefault();
          const highlighted = filtered[highlightedIndex];
          if (highlighted) {
            toggleOption(highlighted.value);
          }
          break;
        }
      }
    },
    [isOpen, filtered, highlightedIndex, toggleOption],
  );

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) setSearch('');
  };

  return (
    <div ref={containerRef} className={`multi-select-container${error ? ' input-error' : ''}`} onKeyDown={handleKeyDown}>
      <div
        className={`multi-select-trigger${isOpen ? ' multi-select-trigger--open' : ''}`}
        onClick={toggleOpen}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="multi-select-trigger-inner">
          {selectedOptions.length === 0 ? (
            <span className="multi-select-placeholder">{placeholder}</span>
          ) : (
            <div className="multi-select-tags">
              {selectedOptions.map((option) => (
                <span key={option.value} className="multi-select-tag">
                  <span className="multi-select-tag-label">{option.label}</span>
                  <X
                    size={14}
                    className="multi-select-tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(option.value);
                    }}
                  />
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronDown size={16} className={`multi-select-chevron${isOpen ? ' multi-select-chevron--open' : ''}`} />
      </div>

      {isOpen && (
        <div className="multi-select-dropdown">
          <div className="multi-select-search">
            <Search size={16} className="multi-select-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="multi-select-search-input"
            />
          </div>

          <div className="multi-select-options" ref={optionsRef} role="listbox">
            {isLoading ? (
              <div className="multi-select-empty">
                <Loader2 size={20} className="spin" />
                <span>Loading...</span>
              </div>
            ) : options.length === 0 ? (
              <div className="multi-select-empty">{emptyMessage}</div>
            ) : filtered.length === 0 ? (
              <div className="multi-select-empty">No matches found</div>
            ) : (
              filtered.map((option, index) => {
                const isItemSelected = selected.includes(option.value);
                const isHighlighted = index === highlightedIndex;
                return (
                  <div
                    key={option.value}
                    className={`multi-select-option${isItemSelected ? ' multi-select-option--selected' : ''}${isHighlighted ? ' multi-select-option--highlighted' : ''}`}
                    onClick={() => toggleOption(option.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    role="option"
                    aria-selected={isItemSelected}
                  >
                    <div className="multi-select-option-label">{option.label}</div>
                    <div className="multi-select-option-check">{isItemSelected && <Check size={16} />}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
