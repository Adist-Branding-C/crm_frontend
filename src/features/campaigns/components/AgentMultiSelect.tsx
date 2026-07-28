import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, X, ChevronDown, Check, Loader2 } from 'lucide-react';
import type { AgentMultiSelectProps } from '../types';

const AVATAR_COLORS = ['#f1414f', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

let instanceCounter = 0;

const AgentMultiSelect = ({ agents, selected, onChange, isLoading, error, labelledBy }: AgentMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const instanceId = useRef(`agent-multi-select-${++instanceCounter}`).current;
  const listboxId = `${instanceId}-listbox`;
  const optionId = (agentId: string) => `${instanceId}-option-${agentId}`;

  const filtered = useMemo(() => {
    if (!search.trim()) return agents;
    const q = search.toLowerCase();
    return agents.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        (a.designation && a.designation.toLowerCase().includes(q)) ||
        (a.email && a.email.toLowerCase().includes(q)),
    );
  }, [agents, search]);

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

  const toggleAgent = useCallback(
    (agentId: string) => {
      onChange(
        selected.includes(agentId)
          ? selected.filter((id) => id !== agentId)
          : [...selected, agentId],
      );
    },
    [selected, onChange],
  );

  const removeAgent = useCallback(
    (agentId: string) => {
      onChange(selected.filter((id) => id !== agentId));
    },
    [selected, onChange],
  );

  const selectedAgents = useMemo(() => agents.filter((a) => selected.includes(a.id)), [agents, selected]);

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
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
            toggleAgent(filtered[highlightedIndex].id);
          }
          break;
      }
    },
    [isOpen, filtered, highlightedIndex, toggleAgent],
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
        aria-controls={listboxId}
        aria-labelledby={labelledBy}
        aria-activedescendant={isOpen && highlightedIndex >= 0 ? optionId(filtered[highlightedIndex]?.id ?? '') : undefined}
      >
        <div className="multi-select-trigger-inner">
          {selectedAgents.length === 0 ? (
            <span className="multi-select-placeholder">Select agents...</span>
          ) : (
            <div className="multi-select-tags">
              {selectedAgents.map((agent) => (
                <span key={agent.id} className="multi-select-tag">
                  <span className="multi-select-tag-avatar" style={{ backgroundColor: getAvatarColor(agent.name) }}>
                    {getInitials(agent.name)}
                  </span>
                  <span className="multi-select-tag-label">{agent.name}</span>
                  <X
                    size={14}
                    className="multi-select-tag-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAgent(agent.id);
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
            <label htmlFor={`${instanceId}-search`} className="sr-only">Search agents</label>
            <input
              ref={searchInputRef}
              id={`${instanceId}-search`}
              type="text"
              placeholder="Search by name, ID, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="multi-select-search-input"
            />
          </div>

          <div className="multi-select-options" ref={optionsRef} role="listbox" id={listboxId}>
            {isLoading ? (
              <div className="multi-select-empty">
                <Loader2 size={20} className="spin" />
                <span>Loading agents...</span>
              </div>
            ) : agents.length === 0 ? (
              <div className="multi-select-empty">No agents available</div>
            ) : filtered.length === 0 ? (
              <div className="multi-select-empty">No agents found</div>
            ) : (
              filtered.map((agent, index) => {
                const isItemSelected = selected.includes(agent.id);
                const isHighlighted = index === highlightedIndex;
                return (
                  <div
                    key={agent.id}
                    id={optionId(agent.id)}
                    className={`multi-select-option${isItemSelected ? ' multi-select-option--selected' : ''}${isHighlighted ? ' multi-select-option--highlighted' : ''}`}
                    onClick={() => toggleAgent(agent.id)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    role="option"
                    aria-selected={isItemSelected}
                  >
                    <div className="multi-select-option-avatar" style={{ backgroundColor: getAvatarColor(agent.name) }}>
                      {getInitials(agent.name)}
                    </div>
                    <div className="multi-select-option-info">
                      <div className="multi-select-option-name">{agent.name}</div>
                      <div className="multi-select-option-meta">
                        {agent.id && <span className="multi-select-option-id">ID: {agent.id}</span>}
                        {agent.designation && <span className="multi-select-option-phone">{agent.designation}</span>}
                      </div>
                      {agent.email && <div className="multi-select-option-email">{agent.email}</div>}
                    </div>
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

export default AgentMultiSelect;
