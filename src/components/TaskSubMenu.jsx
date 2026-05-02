import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ListChecks, Phone, Megaphone, CheckSquare, ChevronRight, ChevronDown } from 'lucide-react';
import './TaskSubMenu.css';

const taskMenuItems = [
  { id: 'tasks', label: 'Task', path: '/user/tasks', icon: ListChecks },
  { id: 'call-tasks', label: 'Call Tasks', path: '/user/call-tasks', icon: Phone },
  { id: 'campaign-tasks', label: 'Campaign Tasks', path: '/user/campaign-tasks', icon: Megaphone },
  { id: 'deal-tasks', label: 'Deal Tasks', path: '/user/deal-tasks', icon: CheckSquare },
];

const TaskSubMenu = ({ expanded: propExpanded, onToggle }) => {
  const location = useLocation();
  
  const isTaskRoute = taskMenuItems.some(item => item.path === location.pathname);
  const isExpanded = propExpanded !== undefined ? propExpanded : isTaskRoute;
  
  const currentParent = taskMenuItems.find(item => item.path === location.pathname);

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  return (
    <div className={`task-submenu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button 
        className="task-submenu-toggle" 
        onClick={handleToggle}
      >
        <span className="task-submenu-label">
          <ListChecks size={18} />
          <span>Tasks</span>
        </span>
        {isExpanded ? (
          <ChevronDown size={16} className="chevron-icon" />
        ) : (
          <ChevronRight size={16} className="chevron-icon" />
        )}
      </button>
      
      {isExpanded && (
        <div className="task-submenu-items">
          {taskMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`task-submenu-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { taskMenuItems };
export default TaskSubMenu;