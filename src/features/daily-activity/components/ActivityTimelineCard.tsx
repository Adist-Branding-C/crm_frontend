import { memo } from 'react';
import { Phone, User, DollarSign, CheckSquare, MessageSquare, Megaphone, ListChecks, ArrowRight } from 'lucide-react';
import { getChangeFieldLabel } from '../utils/activityHelpers';
import type { ActivityTimelineCardProps } from '../types';
import './ActivityTimelineCard.css';

/**
 * Maps an activity's entityType to a context-appropriate Lucide icon.
 *
 * Used by:
 * - ActivityTimelineCard (entity-type icon shown next to the activity type text).
 *
 * Notes:
 * - Falls back to the User icon for unrecognized/legacy entity types, so a
 *   deal win or task update never renders a misleading phone icon.
 */
const ENTITY_TYPE_ICONS: Record<string, typeof Phone> = {
  lead: User,
  deal: DollarSign,
  task: CheckSquare,
  followup: ListChecks,
  remark: MessageSquare,
  call: Phone,
  campaign: Megaphone,
};

const getEntityIcon = (entityType: string) => ENTITY_TYPE_ICONS[entityType] ?? User;

const ActivityTimelineCard = memo(({ activity }: ActivityTimelineCardProps) => {
  const EntityIcon = getEntityIcon(activity.entityType);
  const ContactIcon = activity.entityType === 'call' ? Phone : User;

  return (
    <div className="timeline-card">
      <div className="timeline-content">
        <div className="timeline-meta">
          <span className="time-ago">{activity.timeAgo}</span>
          {activity.timestamp && (
            <span className="timestamp">• {activity.timestamp}</span>
          )}
        </div>

        <div className="timeline-body">
          <div className="timeline-avatar">
            {activity.user?.trim()?.charAt(0)?.toUpperCase() || '?'}
          </div>

          <div className="timeline-details">
            <div className="timeline-title">
              <EntityIcon size={14} className="entity-type-icon" />
              <span className="activity-type-text">{activity.type} by </span>
              <span className="user-name">{activity.user}</span>
            </div>

            {activity.hasContactInfo && (
              <div className="timeline-related-lead">
                <ContactIcon size={12} />
                <span>{activity.relatedLead}</span>
              </div>
            )}

            <div className="timeline-description">
              {activity.description}
            </div>

            {activity.changes.length > 0 && (
              <div className="timeline-changes">
                {activity.changes.map((change, index) => (
                  <div className="timeline-change-row" key={`${change.fieldName}-${index}`}>
                    <span className="change-field-label">{getChangeFieldLabel(change.fieldName)}</span>
                    <span className="change-old-value">{change.oldValue || 'None'}</span>
                    <ArrowRight size={12} className="change-arrow" />
                    <span className="change-new-value">{change.newValue || 'None'}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="timeline-badges">
              <span className={`badge ${activity.badge.toLowerCase()}`}>{activity.badge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ActivityTimelineCard.displayName = 'ActivityTimelineCard';

export default ActivityTimelineCard;
