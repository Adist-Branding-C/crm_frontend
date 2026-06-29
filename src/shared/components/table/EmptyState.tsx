interface EmptyStateProps {
  colSpan: number;
  message?: string;
}

const EmptyState = ({ colSpan, message }: EmptyStateProps) => (
  <tr>
    <td colSpan={colSpan} className="dataTables_empty">{message ?? 'No data available in table'}</td>
  </tr>
);

export default EmptyState;
