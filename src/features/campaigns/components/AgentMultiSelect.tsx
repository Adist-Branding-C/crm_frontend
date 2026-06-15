import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import type { AgentMultiSelectProps } from '../types/agent-multi-select.types';

const AgentMultiSelect = ({ agents, selected, onChange, isLoading }: AgentMultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

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

  const filtered = useMemo(
    () => agents.filter(a => a.name.toLowerCase().includes(search.toLowerCase())),
    [agents, search]
  );

  const toggleAgent = useCallback((agentId: string) => {
    onChange(
      selected.includes(agentId)
        ? selected.filter(id => id !== agentId)
        : [...selected, agentId]
    );
  }, [selected, onChange]);

  const removeAgent = useCallback((agentId: string) => {
    onChange(selected.filter(id => id !== agentId));
  }, [selected, onChange]);

  const selectedNames = useMemo(
    () => agents.filter(a => selected.includes(a.id)).map(a => a.name),
    [agents, selected]
  );

  return (
    <div ref={containerRef} className="multi-select-container">
      <div className="multi-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selected.length === 0 && (
          <span className="multi-select-placeholder">Select agents...</span>
        )}
        {selectedNames.map(name => (
          <span key={name} className="multi-select-tag">
            {name}
            <X
              size={14}
              className="multi-select-tag-remove"
              onClick={(e) => {
                e.stopPropagation();
                const agent = agents.find(a => a.name === name);
                if (agent) removeAgent(agent.id);
              }}
            />
          </span>
        ))}
        <ChevronDown size={16} className="multi-select-chevron" />
      </div>

      {isOpen && (
        <div className="multi-select-dropdown">
          <div className="multi-select-search-wrapper">
            <div className="multi-select-search-inner">
              <Search size={14} className="multi-select-search-icon" />
              <input
                type="text"
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="multi-select-search-input"
              />
            </div>
          </div>
          <div className="multi-select-options">
            {isLoading ? (
              <div className="multi-select-empty">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="multi-select-empty">No agents found</div>
            ) : filtered.map(agent => {
              const isSelected = selected.includes(agent.id);
              return (
                <div
                  key={agent.id}
                  className={`multi-select-option ${isSelected ? 'multi-select-option-selected' : ''}`}
                  onClick={() => toggleAgent(agent.id)}
                >
                  {agent.name}
                  {isSelected && <span className="multi-select-check">✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentMultiSelect;
