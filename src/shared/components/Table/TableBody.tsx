import { Children, type ReactNode } from 'react';
import { LABEL_NO_DATA } from '../../constants/labels';

interface TableBodyProps {
  children: ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
  skeletonCols?: number;
}

const SkeletonRow = ({ cols }: { cols: number }) => (
  <tr>
    <td><div className="skeleton-box" /></td>
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i}><div className="skeleton-box" /></td>
    ))}
    <td><div className="skeleton-box skeleton-box--action" /></td>
  </tr>
);

const EmptyRow = ({ colSpan }: { colSpan: number }) => (
  <tr>
    <td colSpan={colSpan} className="dataTables_empty">{LABEL_NO_DATA}</td>
  </tr>
);

const TableBody = ({ children, isLoading, skeletonRows = 5, skeletonCols = 2 }: TableBodyProps) => {
  if (isLoading) {
    return (
      <tbody>
        {Array.from({ length: skeletonRows }).map((_, i) => (
          <SkeletonRow key={i} cols={skeletonCols} />
        ))}
      </tbody>
    );
  }

  return (
    <tbody>
      {Children.count(children) === 0 ? <EmptyRow colSpan={skeletonCols + 2} /> : children}
    </tbody>
  );
};

export default TableBody;
