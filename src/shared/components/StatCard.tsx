import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
  value: string | number;
  label: string;
}

const StatCard = ({ icon: Icon, iconColor, iconBackground, value, label }: StatCardProps) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: iconBackground }}>
      <Icon size={20} color={iconColor} />
    </div>
    <div className="stat-info">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </div>
);

export default StatCard;
