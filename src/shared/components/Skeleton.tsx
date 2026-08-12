import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export const Skeleton = ({ width = '100%', height = '1em', borderRadius, className }: SkeletonProps) => (
  <span
    className={`skeleton ${className ?? ''}`}
    style={{ width, height, borderRadius }}
  />
);
