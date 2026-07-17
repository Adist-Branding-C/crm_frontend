import React from 'react';
import { Search } from 'lucide-react';
import type { PipelineToolbarProps } from '../types';

const PipelineToolbar: React.FC<PipelineToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  activeView,
  loading,
  onViewLeads,
  onViewDeals,
  onViewTasks,
}) => {
  return (
    <>
      <div className="pipeline-search">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search deals..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="search-input"
        />
      </div>
      <button
        className={`btn-filter ${activeView === 'leads' ? 'active' : ''}`}
        onClick={onViewLeads}
        disabled={loading}
      >
        Lead
      </button>
      <button
        className={`btn-filter ${activeView === 'deals' ? 'active' : ''}`}
        onClick={onViewDeals}
        disabled={loading}
      >
        Deal
      </button>
      <button
        className={`btn-filter ${activeView === 'tasks' ? 'active' : ''}`}
        onClick={onViewTasks}
        disabled={loading}
      >
        Task
      </button>
      {loading && <span className="pipeline-loading">Loading...</span>}
    </>
  );
};

export default PipelineToolbar;
