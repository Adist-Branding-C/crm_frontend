import React from 'react';
import type { PageContainerProps } from '../../types/layout';
import './PageContainer.css';

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return React.createElement('div', { className: `page-container ${className}`.trim() }, children);
}