import React from 'react';
import './PageContainer.css';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return React.createElement('div', { className: `page-container ${className}`.trim() }, children);
}