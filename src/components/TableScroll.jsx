import React from 'react';
import './TableScroll.css';

const TableScroll = ({ children, className = '' }) => {
  return (
    <div className={`table-scroll-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default TableScroll;