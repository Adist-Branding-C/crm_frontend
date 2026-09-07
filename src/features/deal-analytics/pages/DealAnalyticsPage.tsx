import { useState } from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import PipelinePicker from '../../deal-board/components/PipelinePicker';
import { useSelectedPipeline } from '../../deal-board/hooks/useSelectedPipeline';
import ForecastWidget from '../components/ForecastWidget';
import WinRateWidget from '../components/WinRateWidget';
import StageFunnelWidget from '../components/StageFunnelWidget';
import OwnerLeaderboardWidget from '../components/OwnerLeaderboardWidget';
import type { AnalyticsPeriod } from '../types';
import './DealAnalyticsPage.css';

const PERIOD_OPTIONS: { value: AnalyticsPeriod; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];

/**
 * Deal analytics dashboard (Phase 7): weighted forecast + stage funnel are
 * scoped to a pipeline (current-snapshot, no period), win rate + owner
 * leaderboard are scoped to a period (today/week/month) - matching each
 * metric's own natural semantics rather than forcing one shared filter bar
 * onto both kinds of data.
 */
const DealAnalyticsPage = () => {
  const { pipelines, selectedPipelineId, setSelectedPipelineId } = useSelectedPipeline();
  const [period, setPeriod] = useState<AnalyticsPeriod>('month');

  return (
    <PageContainer>
      <PageHeader
        title="Deal Analytics"
        description="Forecast, win rate, stage funnel, and owner performance across your pipelines."
        action={
          <div className="deal-analytics-period-toggle">
            {PERIOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`date-btn ${period === opt.value ? 'active' : ''}`}
                onClick={() => setPeriod(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="deal-analytics-grid">
        <ForecastWidget />
        <WinRateWidget period={period} />

        <div className="deal-analytics-funnel-section">
          <div className="deal-analytics-funnel-header">
            <PipelinePicker
              pipelines={pipelines}
              selectedPipelineId={selectedPipelineId}
              onChange={setSelectedPipelineId}
            />
          </div>
          <StageFunnelWidget pipelineId={selectedPipelineId ?? undefined} />
        </div>

        <OwnerLeaderboardWidget period={period} />
      </div>
    </PageContainer>
  );
};

export default DealAnalyticsPage;
