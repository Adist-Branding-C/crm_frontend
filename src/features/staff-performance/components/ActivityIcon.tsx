import { PhoneCall, MessageSquare, Users, CheckCircle2 } from 'lucide-react';
import type { ActivityIconProps } from '../types';

const ActivityIcon = ({ type }: ActivityIconProps) => {
  switch (type) {
    case 'call': return <PhoneCall size={16} />;
    case 'email': return <MessageSquare size={16} />;
    case 'meeting': return <Users size={16} />;
    default: return <CheckCircle2 size={16} />;
  }
};

export default ActivityIcon;
