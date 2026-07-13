import React from 'react';
import { Building, AlertCircle, Clock, Users, UserCheck, DollarSign } from 'lucide-react';
import StatCard from '../../../shared/components/StatCard';
import type { CompaniesStatsGridProps } from '../types/component.types';

const CompaniesStatsGrid: React.FC<CompaniesStatsGridProps> = React.memo(({ stats }) => (
  <div className="company-stats-grid">
    <StatCard icon={Building} iconColor="#3b82f6" iconBackground="#3b82f620" value={stats.totalCompanies} label="Total Companies" />
    <StatCard icon={AlertCircle} iconColor="#ef4444" iconBackground="#ef444420" value={stats.expiredCustomers} label="Expired" />
    <StatCard icon={Clock} iconColor="#f59e0b" iconBackground="#f59e0b20" value={stats.soonExpire} label="Soon Expire" />
    <StatCard icon={Users} iconColor="#8b5cf6" iconBackground="#8b5cf620" value={stats.totalStaff} label="Total Staff" />
    <StatCard icon={UserCheck} iconColor="#06b6d4" iconBackground="#06b6d420" value={stats.licensedSeats} label="Licensed Seats" />
    <StatCard icon={DollarSign} iconColor="#10b981" iconBackground="#10b98120" value={`$${stats.totalRevenue.toLocaleString()}`} label="Total Revenue" />
  </div>
));

CompaniesStatsGrid.displayName = 'CompaniesStatsGrid';
export default CompaniesStatsGrid;
