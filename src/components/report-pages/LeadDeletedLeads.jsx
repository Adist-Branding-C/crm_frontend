import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

const sampleData = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', deletedBy: 'Admin', deletedAt: '2024-01-25', reason: 'Duplicate' },
  { id: 2, name: 'Priya Patel', phone: '9876543211', deletedBy: 'John Doe', deletedAt: '2024-01-24', reason: 'Not Interested' },
];

const LeadDeletedLeads = () => {
  const [isFiltered, setIsFiltered] = useState(false);
  return (
    <div className="report-content-wrapper">
      <PageHeader title="Deleted Leads" description="Track all deleted leads" breadcrumb={false} />
      <div className="report-filter-section">
        <div className="report-filter-actions">
          <button className="btn btn-secondary" onClick={() => setIsFiltered(true)}>Filter</button>
        </div>
      </div>
      {isFiltered && (
        <div className="report-table-section">
          <table className="report-data-table">
            <thead><tr><th>Name</th><th>Phone</th><th>Deleted By</th><th>Deleted At</th><th>Reason</th></tr></thead>
            <tbody>{sampleData.map(row => (<tr key={row.id}><td>{row.name}</td><td>{row.phone}</td><td>{row.deletedBy}</td><td>{row.deletedAt}</td><td>{row.reason}</td></tr>))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadDeletedLeads;