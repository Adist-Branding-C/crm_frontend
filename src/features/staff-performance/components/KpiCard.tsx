import type { KpiCardProps } from '../types';

const KpiCard = ({ title, value }: KpiCardProps) => (
  <div className="card kpi-card primary-outline">
    <div className="kpi-value">{value}</div>
    <div className="kpi-footer">
      <span className="kpi-title">{title}</span>
    </div>
  </div>
);

export default KpiCard;
