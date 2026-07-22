import type { TriggerType } from '../types';
import { TRIGGER_TYPE_META } from '../constants';

const TriggerTypeBadge = ({ triggerType }: { triggerType: TriggerType }) => {
  const meta = TRIGGER_TYPE_META[triggerType];
  return <span className={`badge ${meta.badgeClass}`}>{meta.label}</span>;
};

export default TriggerTypeBadge;
