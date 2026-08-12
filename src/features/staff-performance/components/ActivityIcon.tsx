import { PhoneCall, MessageSquare, Users, CheckCircle2 } from 'lucide-react';

// Unused since StaffDetailView dropped the mock "Recent Activity" section
// (no backend-tracked activity feed exists yet) - kept compiling rather than
// deleted; safe to remove this file if it's confirmed dead.
interface ActivityIconProps {
  type: string;
}

const ActivityIcon = ({ type }: ActivityIconProps) => {
  switch (type) {
    case 'call': return <PhoneCall size={16} />;
    case 'email': return <MessageSquare size={16} />;
    case 'meeting': return <Users size={16} />;
    default: return <CheckCircle2 size={16} />;
  }
};

export default ActivityIcon;
