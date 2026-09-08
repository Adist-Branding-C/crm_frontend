import PipelinePicker from '../../deal-board/components/PipelinePicker';
import { useSelectedPipeline } from '../../deal-board/hooks/useSelectedPipeline';
import type { DashboardPeriod } from '../../dashboard/types';
import WinRateWidget from './WinRateWidget';
import StageFunnelWidget from './StageFunnelWidget';
import './DealAnalyticsSection.css';

interface DealAnalyticsSectionProps {
  period: DashboardPeriod;
  /** Shared with the dashboard filter; empty string unless the period is "custom". */
  from: string;
  to: string;
}

/**
 * Deal-analytics widgets embedded in the main dashboard (previously a
 * standalone page).
 *
 * Win rate follows the dashboard's shared period / custom-range filter. The
 * stage funnel is a current-snapshot metric scoped to a single pipeline, so
 * the section carries one pipeline picker that scopes it.
 */
const DealAnalyticsSection = ({ period, from, to }: DealAnalyticsSectionProps) => {
  const { pipelines, selectedPipelineId, setSelectedPipelineId } = useSelectedPipeline();

  return (
    <section className="deal-analytics-section">
      <header className="deal-analytics-section__header">
        <PipelinePicker
          pipelines={pipelines}
          selectedPipelineId={selectedPipelineId}
          onChange={setSelectedPipelineId}
        />
      </header>

      <div className="deal-analytics-grid">
        <WinRateWidget period={period} from={from} to={to} />
        <StageFunnelWidget pipelineId={selectedPipelineId ?? undefined} />
      </div>
    </section>
  );
};

export default DealAnalyticsSection;
