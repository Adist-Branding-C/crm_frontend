import React from 'react';
import { Search } from 'lucide-react';
import type { PipelineToolbarProps } from '../types/pipeline.types';

const PipelineToolbar: React.FC<PipelineToolbarProps> = ({
  searchQuery, setSearchQuery,
  activeView, loading,
  fetchLeads, fetchDeals, fetchTasks,
}) => {
  return (
    <>
      <div className="pipeline-search">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search deals..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <button
        className={`btn-filter ${activeView === 'leads' ? 'active' : ''}`}
        onClick={fetchLeads}
        disabled={loading}
      >
        Lead
      </button>
      <button
        className={`btn-filter ${activeView === 'deals' ? 'active' : ''}`}
        onClick={fetchDeals}
        disabled={loading}
      >
        Deal
      </button>
      <button
        className={`btn-filter ${activeView === 'tasks' ? 'active' : ''}`}
        onClick={fetchTasks}
        disabled={loading}
      >
        Task
      </button>
      {loading && <span className="pipeline-loading">Loading...</span>}
    </>
  );
};

export default PipelineToolbar;
