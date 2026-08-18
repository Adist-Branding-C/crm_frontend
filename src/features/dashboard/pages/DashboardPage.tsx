import React, { useState } from 'react';
// import { ChevronDown, ChevronRight } from 'lucide-react';
import './DashboardPage.css';
import PageContainer from '../../../shared/components/layout/PageContainer';
import FeesManagementBanner from '../components/widgets/FeesManagementBanner';
import LeadStatusWidget from '../components/widgets/LeadStatusWidget';
import LeadSourceWidget from '../components/widgets/LeadSourceWidget';
import LeadPurposeWidget from '../components/widgets/LeadPurposeWidget';
import DealPipelineWidget from '../components/widgets/DealPipelineWidget';
import DealByStageWidget from '../components/widgets/DealByStageWidget';
import TasksWidget from '../components/widgets/TasksWidget';
import CampaignsWidget from '../components/widgets/CampaignsWidget';
import ActivitiesWidget from '../components/widgets/ActivitiesWidget';
import ActivitiesStatisticsWidget from '../components/widgets/ActivitiesStatisticsWidget';
import { StatCard, KpiCard } from '../components/widgets/Cards';
import WonDealsCard from '../components/widgets/WonDealsCard';
import LostDealsCard from '../components/widgets/LostDealsCard';
import InProgressDealsCard from '../components/widgets/InProgressDealsCard';
import {
  CALL_LOGGED_ACTIVITY_TYPE,
  HOT_LEAD_TYPE_NAME,
} from '../constants/dashboard.constants';
import { useLeadDashboardStatistics } from '../hooks/useLeadDashboardStatistics';
import { usePipelineAmount } from '../hooks/usePipelineAmount';
import { useFollowupStatistics } from '../../followup-required/hooks/useFollowupStatistics';
import { useActivitiesStatistics } from '../hooks/useActivitiesStatistics';
import { useCallLogsCount } from '../hooks/useCallLogsCount';
import type { DashboardPeriod } from '../types';
import { todayDateString } from '../../../shared/utils/dateUtils';

const DashboardPage = () => {
  //   const [branch, setBranch] = useState<string>('calicut');
  const [period, setPeriod] = useState<DashboardPeriod>('today');
  const [customFrom, setCustomFrom] = useState<string>('');
  const [customTo, setCustomTo] = useState<string>('');
  const [showCustom, setShowCustom] = useState<boolean>(false);

  const today = todayDateString();

  const isCustomRangeInvalid = Boolean(customFrom && customTo && customFrom > customTo);
  const effectiveFrom = isCustomRangeInvalid ? '' : customFrom;
  const effectiveTo = isCustomRangeInvalid ? '' : customTo;

  const { stats: dashboardStats, isLoading: dashboardLoading, isError: dashboardError } = useLeadDashboardStatistics(period, effectiveFrom, effectiveTo);
  const leadOverview = dashboardStats?.overview || {
    todayLeads: 0,
    totalLeads: 0,
    conversionRate: 0,
    leadsThisMonth: 0,
    leadsThisWeek: 0,
    myLeads: 0,
    leadsByType: []
  };
  
  const pipelineAmount = usePipelineAmount(period, effectiveFrom, effectiveTo);
  const followupStats = useFollowupStatistics();
  const outboundCallsCount = useCallLogsCount(period, effectiveFrom, effectiveTo);
  const todaysActivities = useActivitiesStatistics(period, effectiveFrom, effectiveTo);
  const callsToday =
    todaysActivities.byType?.find((item) => item.activityType === CALL_LOGGED_ACTIVITY_TYPE)?.count ?? 0;
  const hotLeads = leadOverview.leadsByType?.find((type) => type.type === HOT_LEAD_TYPE_NAME)?.count ?? 0;

  return (
    <PageContainer>
      <FeesManagementBanner />
      
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-filters">
          <div className="date-buttons">
            <button
              className={`date-btn ${period === 'today' ? 'active' : ''}`}
              onClick={() => { setPeriod('today'); setShowCustom(false); }}
            >
              Today
            </button>
            <button
              className={`date-btn ${period === 'week' ? 'active' : ''}`}
              onClick={() => { setPeriod('week'); setShowCustom(false); }}
            >
              This Week
            </button>
            <button
              className={`date-btn ${period === 'month' ? 'active' : ''}`}
              onClick={() => { setPeriod('month'); setShowCustom(false); }}
            >
              This Month
            </button>
            <button
              className={`date-btn ${showCustom || period === 'custom' ? 'active' : ''}`}
              onClick={() => { setPeriod('custom'); setShowCustom(true); }}
            >
              Custom
            </button>
          </div>
          {showCustom && (
            <div className="custom-date-range">
              <input
                type="date"
                value={customFrom}
                max={customTo || today}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomFrom(e.target.value)}
                className="date-input"
              />
              <span className="date-separator">to</span>
              <input
                type="date"
                value={customTo}
                min={customFrom || undefined}
                max={today}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomTo(e.target.value)}
                className="date-input"
              />
              {isCustomRangeInvalid && (
                <span className="date-range-error">"To" date can't be before "From" date</span>
              )}
            </div>
          )}

        </div>
      </div>

      <div className="widgets-grid middle-cards-grid">
        <KpiCard
          title="Today's Leads"
          value={String(leadOverview.todayLeads)}
          isPrimary={true}
          isLoading={dashboardLoading}
        />
        <KpiCard
          title="Hot Leads"
          value={String(hotLeads)}
          isPrimary={true}
          isLoading={dashboardLoading}
        />

        <KpiCard
          title="Conversion Rate"
          value={`${leadOverview.conversionRate}%`}
          isPrimary={true}
          isHighlight={true}
          isLoading={dashboardLoading}
        />

        <KpiCard
          title="Leads This Month"
          value={String(leadOverview.leadsThisMonth)}
          isPrimary={true}
          isLoading={dashboardLoading}
        />

        <KpiCard
          title="Total Leads"
          value={String(leadOverview.totalLeads)}
          isPrimary={true}
          isLoading={dashboardLoading}
        />

        <KpiCard
          title="My Leads"
          value={String(leadOverview.myLeads)}
          isLoading={dashboardLoading}
        />
        <KpiCard
          title="Pipeline amount"
          value={`₹${pipelineAmount.pipelineAmount.toLocaleString()}`}
          isPrimary={true}
          isLoading={pipelineAmount.isLoading}
        />
        <KpiCard
          title="Calls Today"
          value={String(callsToday)}
          isLoading={todaysActivities.isLoading}
        />
        <KpiCard
          title="Outbound Calls Today"
          value={String(outboundCallsCount.total)}
          isLoading={outboundCallsCount.isLoading}
        />

        <KpiCard
          title="Overdue Followups"
          value={String(followupStats.data?.overdue ?? 0)}
          isPrimary={true}
          isLoading={followupStats.isLoading}
        />
        <KpiCard
          title="Due Today Followups"
          value={String(followupStats.data?.dueToday ?? 0)}
          isPrimary={true}
          isLoading={followupStats.isLoading}
        />
        <KpiCard
          title="Upcoming Followups"
          value={String(followupStats.data?.upcoming ?? 0)}
          isPrimary={true}
          isLoading={followupStats.isLoading}
        />
        <KpiCard
          title="Total Followups"
          value={String(followupStats.data?.total ?? 0)}
          isPrimary={true}
          isLoading={followupStats.isLoading}
        />

        <WonDealsCard period={period} from={effectiveFrom} to={effectiveTo} />
        <LostDealsCard period={period} from={effectiveFrom} to={effectiveTo} />
        <InProgressDealsCard period={period} from={effectiveFrom} to={effectiveTo} />
      </div>

      <div className="widgets-grid middle-cards-grid">
        <LeadStatusWidget items={dashboardStats?.leadsByStatus} isLoading={dashboardLoading} isError={dashboardError} />
        <LeadSourceWidget items={dashboardStats?.leadsBySource} isLoading={dashboardLoading} isError={dashboardError} />
        <LeadPurposeWidget items={dashboardStats?.leadsByPurpose} isLoading={dashboardLoading} isError={dashboardError} />
        <DealPipelineWidget period={period} from={effectiveFrom} to={effectiveTo} />
      </div>

      <div className="widgets-grid bottom-cards-grid">
        <DealByStageWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <TasksWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <CampaignsWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <ActivitiesWidget period={period} from={effectiveFrom} to={effectiveTo} />
      </div>

      <div className="widgets-grid bottom-cards-grid">
        <ActivitiesStatisticsWidget period={period} from={effectiveFrom} to={effectiveTo} />
      </div>

    </PageContainer>
  );
};

export default DashboardPage;
