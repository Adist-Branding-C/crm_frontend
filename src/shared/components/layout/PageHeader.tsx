import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem, BreadcrumbProps, PageHeaderProps } from '../../types/layout';
import './PageHeader.css';

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="page-breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={14} className="breadcrumb-separator" />}
          {item.link ? (
            <Link to={item.link} className="breadcrumb-item">{item.label}</Link>
          ) : (
            <span className="breadcrumb-item active">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const PageHeader = ({ title, description, action, breadcrumb }: PageHeaderProps) => {
  const defaultBreadcrumb: BreadcrumbItem[] = [
    { label: 'Tasks', link: '/user/tasks' },
    { label: title, link: null }
  ];
  
  return (
    <div className="page-header">
      <div className="page-header-content">
        <div className="page-header-text">
          {(breadcrumb !== false) && <Breadcrumb items={breadcrumb || defaultBreadcrumb} />}
          <h1 className="page-title">{title}</h1>
          {description && <p className="page-description">{description}</p>}
        </div>
        {action && <div className="page-header-action">{action}</div>}
      </div>
    </div>
  );
};

export { Breadcrumb };
export default PageHeader;