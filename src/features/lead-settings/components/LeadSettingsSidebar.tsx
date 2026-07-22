import { NavLink } from 'react-router-dom';
import { LEAD_SETTINGS_TABS } from '../constants/navigation';

const LeadSettingsSidebar = () => (
  <div className="settings-tabs">
    {LEAD_SETTINGS_TABS.map(tab => {
      const Icon = tab.icon;
      return (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) => `settings-tab${isActive ? ' active' : ''}`}
        >
          <Icon size={16} />
          <span style={{ paddingLeft: '10px' }}>{tab.label}</span>
        </NavLink>
      );
    })}
  </div>
);

export default LeadSettingsSidebar;
