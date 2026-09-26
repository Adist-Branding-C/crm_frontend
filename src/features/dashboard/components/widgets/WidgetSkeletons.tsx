import React from 'react';
import { Skeleton } from '../../../../shared/components/Skeleton';


export const ListRowsSkeleton = ({ rows = 4 }: { rows?: number }) => (
  <div className="list-container">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="list-item">
        <div className="list-item-left">
          <Skeleton width={12} height={12} borderRadius="2px" />
          <Skeleton width={`${64 - index * 6}px`} height="0.8125rem" />
        </div>
        <Skeleton width="1.5rem" height="0.8125rem" />
      </div>
    ))}
  </div>
);


export const BarRowsSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <div className="list-container">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
          <Skeleton width="5rem" height="0.8125rem" />
          <Skeleton width="1.5rem" height="0.8125rem" />
        </div>
        <Skeleton width="100%" height="6px" borderRadius="3px" />
      </div>
    ))}
  </div>
);


export const ChartSkeleton = ({ height = 170 }: { height?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
    <Skeleton width="55%" height="70%" borderRadius="8px" />
  </div>
);

export const BarListSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="bar-list-skeleton">
    {Array.from({ length: rows }).map((_, index) => (
      <Skeleton key={index} width="100%" height={32} borderRadius="var(--border-radius-md)" />
    ))}
  </div>
);
