import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle2, XCircle } from 'lucide-react';
import type { LeadPipelineItem } from '../types/interface';
import './PipelineListCard.css';

interface PipelineListCardProps {
  pipeline: LeadPipelineItem;
  onSetDefault: (id: number) => void;
  onDelete: (pipeline: LeadPipelineItem) => void;
}

/**
 * One pipeline's card on the pipeline list page: name, default/active
 * badges, and actions (open canvas, set default, delete).
 *
 * Used by:
 * - LeadPipelineListPage
 */
function PipelineListCard({ pipeline, onSetDefault, onDelete }: PipelineListCardProps) {
  const navigate = useNavigate();

  return (
    <div className="pipeline-card">
      <div className="pipeline-card__header">
        <h3 className="pipeline-card__name">{pipeline.name}</h3>
        {pipeline.isDefault && (
          <span className="pipeline-card__badge pipeline-card__badge--default">
            <Star size={12} /> Default
          </span>
        )}
      </div>

      <div className="pipeline-card__status">
        {pipeline.isActive ? (
          <span className="pipeline-card__status-text pipeline-card__status-text--active">
            <CheckCircle2 size={14} /> Active
          </span>
        ) : (
          <span className="pipeline-card__status-text pipeline-card__status-text--inactive">
            <XCircle size={14} /> Inactive
          </span>
        )}
      </div>

      <div className="pipeline-card__actions">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/settings/lead-pipelines/${pipeline.id}`)}
        >
          Open canvas
        </button>
        {!pipeline.isDefault && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => onSetDefault(Number(pipeline.id))}>
            Make default
          </button>
        )}
        {!pipeline.isDefault && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ color: 'var(--danger-text)' }}
            onClick={() => onDelete(pipeline)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default PipelineListCard;
