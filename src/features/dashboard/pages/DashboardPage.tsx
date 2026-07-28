import React, { useState } from 'react';
// import { ChevronDown, ChevronRight } from 'lucide-react';
import './DashboardPage.css';
import PageContainer from '../../../shared/components/layout/PageContainer';
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
  DASHBOARD_KPI_CARDS_HARDCODED,
  PIPELINE_LEADS_HARDCODED,
  CALL_LOGGED_ACTIVITY_TYPE,
  HOT_LEAD_TYPE_NAME,
} from '../constants/dashboard.constants';
import { useLeadOverviewStatistics } from '../hooks/useLeadOverviewStatistics';
import { usePipelineAmount } from '../hooks/usePipelineAmount';
import { useFollowupCount } from '../hooks/useFollowupCount';
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

  const leadOverview = useLeadOverviewStatistics(period, effectiveFrom, effectiveTo);
  const pipelineAmount = usePipelineAmount(period, effectiveFrom, effectiveTo);
  const followupCount = useFollowupCount();
  const outboundCallsCount = useCallLogsCount(period, effectiveFrom, effectiveTo);
  const todaysActivities = useActivitiesStatistics('today');
  const callsToday =
    todaysActivities.byType?.find((item) => item.activityType === CALL_LOGGED_ACTIVITY_TYPE)?.count ?? 0;
  const hotLeads = leadOverview.leadsByType?.find((type) => type.type === HOT_LEAD_TYPE_NAME)?.count ?? 0;

  return (
    <PageContainer>
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
          isLoading={leadOverview.isLoading}
        />
        <KpiCard
          title="Hot Leads"
          value={String(hotLeads)}
          isPrimary={true}
          isLoading={leadOverview.isLoading}
        />
        {DASHBOARD_KPI_CARDS_HARDCODED.map((card, index) => (
          <KpiCard
            key={index}
            title={card.title}
            value={card.value}
            isPrimary={card.isPrimary}
          />
        ))}
        <KpiCard
          title="Conversion Rate"
          value={`${leadOverview.conversionRate}%`}
          isPrimary={true}
          isHighlight={true}
          isLoading={leadOverview.isLoading}
        />
      </div>

      <div className="widgets-grid middle-cards-grid">
        <KpiCard
          title="Leads This Month"
          value={String(leadOverview.leadsThisMonth)}
          isPrimary={true}
          isLoading={leadOverview.isLoading}
        />
        <KpiCard title={PIPELINE_LEADS_HARDCODED.title} value={PIPELINE_LEADS_HARDCODED.value} isPrimary={true} />
        <KpiCard
          title="Total Leads"
          value={String(leadOverview.totalLeads)}
          isPrimary={true}
          isLoading={leadOverview.isLoading}
        />
        <KpiCard
          title="Today's Followups"
          value={String(followupCount.total)}
          isPrimary={true}
          isLoading={followupCount.isLoading}
        />
      </div>


      <div className="widgets-grid middle-cards-grid">
        <KpiCard
          title="My Leads"
          value={String(leadOverview.myLeads)}
          isLoading={leadOverview.isLoading}
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
      </div>

      <div className="widgets-grid middle-cards-grid">
        <WonDealsCard period={period} from={effectiveFrom} to={effectiveTo} />
        <LostDealsCard period={period} from={effectiveFrom} to={effectiveTo} />
        <InProgressDealsCard period={period} from={effectiveFrom} to={effectiveTo} />
      </div>

      <div className="widgets-grid middle-cards-grid">
        <LeadStatusWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <LeadSourceWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <LeadPurposeWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <DealPipelineWidget period={period} from={effectiveFrom} to={effectiveTo} />
      </div>

      <div className="widgets-grid bottom-cards-grid">
        <DealByStageWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <TasksWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <CampaignsWidget period={period} from={effectiveFrom} to={effectiveTo} />
        <ActivitiesWidget />
      </div>

      <div className="widgets-grid bottom-cards-grid">
        <ActivitiesStatisticsWidget period={period} from={effectiveFrom} to={effectiveTo} />
      </div>

    </PageContainer>
  );
};

export default DashboardPage;
