import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './DashboardContent.css';
import PageContainer from './PageContainer';
import { StatCard } from './widgets/Cards';
import LeadStatusWidget from './widgets/LeadStatusWidget';
import LeadSourceWidget from './widgets/LeadSourceWidget';
import LeadPurposeWidget from './widgets/LeadPurposeWidget';
import DealPipelineWidget from './widgets/DealPipelineWidget';
import DealByStageWidget from './widgets/DealByStageWidget';
import TasksWidget from './widgets/TasksWidget';
import CampaignsWidget from './widgets/CampaignsWidget';
import ActivitiesWidget from './widgets/ActivitiesWidget';
import { KpiCard } from './widgets/Cards';

const DashboardContent = () => {
  const [branch, setBranch] = useState('calicut');
  const [period, setPeriod] = useState('today');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [showCustom, setShowCustom] = useState(false);

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
                onChange={(e) => setCustomFrom(e.target.value)}
                className="date-input"
              />
              <span className="date-separator">to</span>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="date-input"
              />
            </div>
          )}

        </div>
      </div>

      <div className="widgets-grid middle-cards-grid">
        <KpiCard title="Today's Leads" value="20" isPrimary={true} />
        <KpiCard title="Hot Leads" value="15" isPrimary={true} />
        <KpiCard title="Qualified Leads" value="8" isPrimary={true} />
        <KpiCard title="Conversion Rate" value="69%" isPrimary={true} isHighlight={true} />
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

export default DashboardContent;
