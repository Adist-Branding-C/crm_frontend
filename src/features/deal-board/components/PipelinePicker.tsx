import type { DealPipelineItem } from '../../deal-pipeline-builder/types/interface';

import './PipelinePicker.css';

interface PipelinePickerProps {
  pipelines: DealPipelineItem[];
  selectedPipelineId: number | null;
  onChange: (id: number) => void;
}

/**
 * Dropdown for choosing which pipeline the board (Kanban columns + stats)
 * is scoped to.
 *
 * Used by:
 * - DealBoardPage
 */
function PipelinePicker({ pipelines, selectedPipelineId, onChange }: PipelinePickerProps) {
  if (pipelines.length <= 1) return null;

  return (
    <select
      className="pipeline-picker-select"
      style={{ width: 'auto', minWidth: '10rem' }}
      value={selectedPipelineId ?? ''}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {pipelines.map((pipeline) => (
        <option key={pipeline.id} value={pipeline.id}>
          {pipeline.name}
          {pipeline.isDefault ? ' (Default)' : ''}
        </option>
      ))}
    </select>
  );
}

export default PipelinePicker;
