import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { DroppableColumnProps } from '../types';

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  data = {},
  className = '',
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id, data });

  return (
    <div
      ref={setNodeRef}
      className={`pipeline-column${isOver ? ' pipeline-column--drop-target' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default DroppableColumn;
