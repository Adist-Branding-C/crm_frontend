import type { ExecutionStatus } from '../types';
import { EXECUTION_STATUS_META } from '../constants';

const ExecutionStatusBadge = ({ status }: { status: ExecutionStatus }) => {
  const meta = EXECUTION_STATUS_META[status];
  return <span className={`badge ${meta.badgeClass}`}>{meta.label}</span>;
};

export default ExecutionStatusBadge;
