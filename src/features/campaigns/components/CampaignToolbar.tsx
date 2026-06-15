import { Search, Plus, Download } from 'lucide-react';
import { ACTION_SEARCH } from '../../../shared/constants/actionLabels';
import type { CampaignToolbarProps } from '../types/campaign-toolbar.types';

const CampaignToolbar = ({ search, onSearchChange, onExport, onAdd }: CampaignToolbarProps) => (
  <div className="enquiries-toolbar">
    <div className="toolbar-left">
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input type="text" placeholder={ACTION_SEARCH} value={search} onChange={onSearchChange} className="search-input" />
      </div>
    </div>
    <div className="toolbar-right">
      <button className="btn btn-secondary" onClick={onExport}><Download size={16} />Export</button>
      <button className="btn btn-primary" onClick={onAdd}><Plus size={16} />Campaign</button>
    </div>
  </div>
);

export default CampaignToolbar;
