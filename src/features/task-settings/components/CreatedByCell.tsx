import { TCell } from '../../../shared/components/table';

interface CreatedByCellProps {
  createdByName?: string | null | undefined;
}

/**
 * Renders the "Created By" table cell shared by every task-settings listing page
 * (task categories, meeting outcomes, call reasons, call statuses): the creator's name,
 * falling back to "--" when there's no name.
 */
const CreatedByCell = ({ createdByName }: CreatedByCellProps) => {
  const name = createdByName?.trim();

  return <TCell>{name || '--'}</TCell>;
};

export default CreatedByCell;
