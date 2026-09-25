import { Pencil, Phone, Trash2 } from 'lucide-react';
import type { ContactType } from '../types';
import { getContactTypeConfig, getContactTypeLabel } from '../constants/contactNumbers.constants';

export interface ContactNumberCardProps {
  label: string;
  isPrimary: boolean;
  display: string;
  dialNumber: string;
  types: ContactType[];
  remarks: string | null;
  isBusy: boolean;
  onAction: (type: ContactType, dialNumber: string) => void;
  onEdit?: (() => void) | undefined;
  onAskDelete?: (() => void) | undefined;
}

const ContactNumberCard = ({
  label,
  isPrimary,
  display,
  dialNumber,
  types,
  remarks,
  isBusy,
  onAction,
  onEdit,
  onAskDelete,
}: ContactNumberCardProps) => {
  return (
    <li className={`leaddrawer-number-card${isPrimary ? ' is-primary' : ''}`}>
      <div className="leaddrawer-number-top">
        <div className="leaddrawer-number-avatar" aria-hidden="true">
          <Phone size={15} />
        </div>
        <div className="leaddrawer-number-heading">
          <div className="leaddrawer-number-label">
            {label}
            {isPrimary && <span className="leaddrawer-number-badge">Primary</span>}
          </div>
          <div className="leaddrawer-number-value">{display}</div>
          {remarks && <p className="leaddrawer-number-remarks">{remarks}</p>}
        </div>
        {!isPrimary && (
          <div className="leaddrawer-number-tools">
            <button type="button" className="leaddrawer-icon-btn" aria-label={`Edit ${label}`} title="Edit" onClick={onEdit} disabled={isBusy}>
              <Pencil size={15} />
            </button>
            <button type="button" className="leaddrawer-icon-btn danger" aria-label={`Delete ${label}`} title="Delete" onClick={onAskDelete} disabled={isBusy}>
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>

      <div className="leaddrawer-number-actions" role="group" aria-label={`${label} actions`}>
        {types.map((type) => {
          const config = getContactTypeConfig(type);
          if (!config) return <span key={type} className="leaddrawer-number-action-label">{getContactTypeLabel(type)}</span>;
          return (
            <button
              key={type}
              type="button"
              className={`leaddrawer-number-action leaddrawer-number-action--${type}`}
              aria-label={`${config.label} ${display}`}
              title={config.label}
              onClick={() => onAction(type, dialNumber)}
            >
              <config.icon size={14} /> {config.label}
            </button>
          );
        })}
      </div>
    </li>
  );
};

export default ContactNumberCard;
