import React from 'react';
import { Eye, Edit2, CreditCard } from 'lucide-react';
import type { CompanyRowActionsProps } from '../types/component.types';

/**
 * Row-level action buttons for a single company - view/edit/manage-subscription.
 * Pure presentational: no state, no API calls, just delegates to the callbacks it's given.
 *
 * Used by:
 * - CompanyRow
 */
const CompanyRowActions: React.FC<CompanyRowActionsProps> = ({ company, onView, onEdit, onManageSubscription }) => (
  <div className="action-buttons">
    <button className="action-btn" title="View" onClick={() => onView(company)}><Eye size={14} /></button>
    <button className="action-btn" title="Edit" onClick={() => onEdit(company)}><Edit2 size={14} /></button>
    <button className="action-btn" title="Subscription" onClick={() => onManageSubscription(company)}><CreditCard size={14} /></button>
  </div>
);

export default CompanyRowActions;
