import type { ReactNode } from 'react';
import './RowCard.css';

interface RowCardProps {
  selected?: boolean;
  checkbox?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  onTitleClick?: () => void;
  meta?: ReactNode[];
  badges?: ReactNode[];
  trailing?: ReactNode;
  actions?: ReactNode;
}

const RowCard = ({ selected, checkbox, title, subtitle, onTitleClick, meta, badges, trailing, actions }: RowCardProps) => (
  <div className={`row-card ${selected ? 'selected' : ''}`}>
    {checkbox && <div className="row-card-checkbox">{checkbox}</div>}

    <div
      className={`row-card-primary ${onTitleClick ? 'clickable' : ''}`}
      onClick={onTitleClick}
    >
      <div className="row-card-title">{title}</div>
      {subtitle && <div className="row-card-subtitle">{subtitle}</div>}
    </div>

    {meta && meta.length > 0 && (
      <div className="row-card-meta">
        {meta.map((item, index) => (
          <span key={index} className="row-card-meta-item">{item}</span>
        ))}
      </div>
    )}

    {badges && badges.length > 0 && (
      <div className="row-card-badges">{badges}</div>
    )}

    {trailing && <div className="row-card-trailing">{trailing}</div>}

    {actions && <div className="row-card-actions">{actions}</div>}
  </div>
);

export default RowCard;
