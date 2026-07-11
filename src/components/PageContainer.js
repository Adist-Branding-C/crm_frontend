import React from 'react';
import './PageContainer.css';
export default function PageContainer({ children, className = '' }) {
    return React.createElement('div', { className: `page-container ${className}`.trim() }, children);
}
//# sourceMappingURL=PageContainer.js.map