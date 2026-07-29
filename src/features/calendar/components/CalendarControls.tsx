import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, User, ChevronDown } from 'lucide-react';
import { MONTH_NAMES } from '../constants';
import type { CalendarControlsProps } from '../types';

const CalendarControls: React.FC<CalendarControlsProps> = ({
  viewMode, onViewModeChange,
  currentDate, onPrevMonth, onNextMonth, onTodayClick,
  agents, selectedAgent, onAgentChange, selectedAgentName,
  showAgentDropdown, onSetShowAgentDropdown,
  searchQuery, onSearchChange,
}) => {
  const filteredAgents = useMemo(() =>
    agents.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [agents, searchQuery]
  );

  return (
  <div className="calendar-controls">
    <div className="calendar-controls-left">
      <div className="agent-select-wrapper">
        <div className="agent-select-trigger" onClick={() => onSetShowAgentDropdown(!showAgentDropdown)}>
          <span>{selectedAgentName}</span>
          <ChevronRight size={16} className={`dropdown-arrow ${showAgentDropdown ? 'open' : ''}`} />
        </div>
        {showAgentDropdown && (
          <div className="agent-dropdown">
            <div className="agent-search-box">
              <Search size={14} />
              <input type="text" placeholder="Search agents..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
            </div>
            <div className="agent-list">
              {filteredAgents.map(agent => (
                <div key={agent.id} className={`agent-option ${selectedAgent === agent.id ? 'selected' : ''}`}
                  onClick={() => { onAgentChange(agent.id); onSetShowAgentDropdown(false); }}>
                  <User size={14} />
                  <span>{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="calendar-controls-right">
      <div className="view-switch-buttons">
        <button className={`view-btn ${viewMode === 'day' ? 'active' : ''}`} onClick={() => onViewModeChange('day')}>Day</button>
        <button className={`view-btn ${viewMode === 'week' ? 'active' : ''}`} onClick={() => onViewModeChange('week')}>Week</button>
        <button className={`view-btn ${viewMode === 'month' ? 'active' : ''}`} onClick={() => onViewModeChange('month')}>Month</button>
      </div>

      <div className="month-navigation">
        <button className="nav-btn" onClick={onPrevMonth}><ChevronLeft size={18} /></button>
        <span className="current-month">
          {viewMode === 'day'
            ? `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
            : viewMode === 'week'
            ? `Week of ${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getDate() - currentDate.getDay() + 1}, ${currentDate.getFullYear()}`
            : `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`
          }
        </span>
        <button className="nav-btn" onClick={onNextMonth}><ChevronRight size={18} /></button>
      </div>
    </div>
  </div>
  );
};

export default CalendarControls;
