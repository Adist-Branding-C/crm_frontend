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
import { StatCard, KpiCard } from '../components/widgets/Cards';
import { DASHBOARD_KPI_CARDS } from '../constants/dashboard.constants';

const DashboardPage = () => {
//   const [branch, setBranch] = useState<string>('calicut');
  const [period, setPeriod] = useState<string>('today');
  const [customFrom, setCustomFrom] = useState<string>('');
  const [customTo, setCustomTo] = useState<string>('');
  const [showCustom, setShowCustom] = useState<boolean>(false);

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomFrom(e.target.value)}
                className="date-input"
              />
              <span className="date-separator">to</span>
              <input
                type="date"
                value={customTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomTo(e.target.value)}
                className="date-input"
              />
            </div>
          )}

        </div>
      </div>

      <div className="widgets-grid middle-cards-grid">
        {DASHBOARD_KPI_CARDS.map((card, index) => (
          <KpiCard
            key={index}
            title={card.title}
            value={card.value}
            isPrimary={card.isPrimary}
            isHighlight={card.isHighlight ?? false}
          />
        ))}
      </div>

      <div className="widgets-grid middle-cards-grid">
        <KpiCard title="Leads This Month" value="526" isPrimary={true} />
        <KpiCard title="Pipeline Leads" value="45" isPrimary={true} />
        <KpiCard title="Total Leads" value="1048" isPrimary={true} />
        <KpiCard title="Today's Followups" value="12" isPrimary={true} />
      </div>


      <div className="widgets-grid middle-cards-grid">
        <KpiCard title="My Leads" value="28" />
        <KpiCard title="Pipeline amount" value="₹70,205" isPrimary={true} />
        <KpiCard title="Calls Today" value="35" />
        <KpiCard title="Outbound Calls Today" value="18" />
      </div>

      <div className="widgets-grid middle-cards-grid">
        <KpiCard title="Won Deals" value="12" />
        <KpiCard title="Lost Deals" value="3" />
      </div>

      <div className="widgets-grid middle-cards-grid">
        <LeadStatusWidget />
        <LeadSourceWidget />
        <LeadPurposeWidget />
        <DealPipelineWidget />
      </div>

      <div className="widgets-grid bottom-cards-grid">
        <DealByStageWidget />
        <TasksWidget />
        <CampaignsWidget />
        <ActivitiesWidget />
      </div>

    </PageContainer>
  );
};

export default DashboardPage;
