import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';

const sampleData = [
  { id: 1, endpoint: '/api/leads', method: 'GET', status: 200, responseTime: '245ms', calledAt: '2024-01-25 10:30 AM', user: 'John Doe' },
  { id: 2, endpoint: '/api/leads', method: 'POST', status: 201, responseTime: '120ms', calledAt: '2024-01-25 10:15 AM', user: 'Admin' },
  { id: 3, endpoint: '/api/leads/123', method: 'PUT', status: 200, responseTime: '180ms', calledAt: '2024-01-25 09:45 AM', user: 'Jane Smith' },
];

const LeadGLAPIHistory = () => {
  const [isFiltered, setIsFiltered] = useState(false);
  return (
    <div className="report-content-wrapper">
      <PageHeader title="GL API History" description="Track all your past lead data API" breadcrumb={false} />
      {isFiltered && (
        <div className="report-table-section">
          <table className="report-data-table">
            <thead><tr><th>Endpoint</th><th>Method</th><th>Status</th><th>Response Time</th><th>Called At</th><th>User</th></tr></thead>
            <tbody>{sampleData.map(row => (<tr key={row.id}><td>{row.endpoint}</td><td>{row.method}</td><td>{row.status}</td><td>{row.responseTime}</td><td>{row.calledAt}</td><td>{row.user}</td></tr>))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadGLAPIHistory;