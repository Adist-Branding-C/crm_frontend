import type { TriggerType } from '../types';
import { getTriggerMeta } from '../constants';

const TriggerTypeBadge = ({ triggerType }: { triggerType: TriggerType }) => {
  const meta = getTriggerMeta(triggerType);
  return <span className={`badge ${meta.badgeClass}`}>{meta.label}</span>;
};

export default TriggerTypeBadge;
