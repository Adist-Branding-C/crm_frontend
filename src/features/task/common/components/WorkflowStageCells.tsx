import { TCell } from '../../../../shared/components/table';
import './WorkflowStageCells.css';

interface WorkflowStageCellsProps {
  workflowName?: string | null | undefined;
  stageName?: string | null | undefined;
  stageColor?: string | null | undefined;
}

const WorkflowStageCells = ({ workflowName, stageName, stageColor }: WorkflowStageCellsProps) => (
  <>
    <TCell>{workflowName ? workflowName : <span className="cell-muted">-</span>}</TCell>
    <TCell>
      {stageName ? (
        <span className="stage-cell">
          <span className="stage-cell__dot" style={{ backgroundColor: stageColor || 'var(--border-strong)' }} />
          {stageName}
        </span>
      ) : (
        <span className="cell-muted">-</span>
      )}
    </TCell>
  </>
);

export default WorkflowStageCells;