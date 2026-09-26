import { AlertTriangle } from 'lucide-react';
import { TCell, TRow } from '../../../../shared/components/table';
import { formatTaskDuration } from '../utils/formatTaskDuration';
import { CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import type { TaskPipelineStageView } from '../types';

interface PipelineDistributionStageRowProps {
  stage: TaskPipelineStageView;
}

/**
 * One row of the pipeline-distribution table: stage name (with its color dot
 * and a Bottleneck badge when flagged), task count, average age and oldest
 * task age - bottleneck rows get a warning background tint.
 *
 * Used by:
 * - TaskPipelineDistributionReport
 */
const PipelineDistributionStageRow = ({ stage }: PipelineDistributionStageRowProps) => (
  <TRow className={stage.isBottleneck ? 'pipeline-bottleneck-row' : undefined}>
    <TCell>
      <div className="pipeline-stage-cell">
        <span
          className="pipeline-stage-dot"
          style={{ backgroundColor: stage.color ?? CHART_PALETTE_DEFAULT }}
          aria-hidden="true"
        />
        <span>{stage.stageName}</span>
        {stage.isBottleneck && (
          <span className="badge badge-warning pipeline-bottleneck-badge">
            <AlertTriangle size={12} />
            Bottleneck
          </span>
        )}
      </div>
    </TCell>
    <TCell>{stage.taskCount}</TCell>
    <TCell>{formatTaskDuration(stage.avgAgeInStageHours)}</TCell>
    <TCell>{formatTaskDuration(stage.oldestTaskAgeHours)}</TCell>
  </TRow>
);

export default PipelineDistributionStageRow;