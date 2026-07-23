import Table from './Table';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton = ({ rows = 5, columns = 8 }: TableSkeletonProps) => (
  <Table>
    <TableHead>
      <TableRow>
        {Array.from({ length: columns }).map((_, i) => (
          <TableHeaderCell key={i} sortable={false} sortKey="">
            <div className="skeleton-box" style={{ width: `${Math.random() * 40 + 40}px` }} />
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: rows }).map((_, r) => (
        <TableRow key={r}>
          {Array.from({ length: columns }).map((_, c) => (
            <TableCell key={c}>
              <div
                className="skeleton-box"
                style={{ width: `${Math.random() * 30 + 50}px` }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TableSkeleton;
