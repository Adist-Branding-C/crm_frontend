import { NavLink } from 'react-router-dom';
import styles from './SettingsTabs.module.css';

interface Tab {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface SettingsTabsProps {
  tabs: Tab[];
}

const SettingsTabs = ({ tabs }: SettingsTabsProps) => {
  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.active : ''}`
          }
        >
          {tab.icon && <span className={styles.icon}>{tab.icon}</span>}
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default SettingsTabs;
