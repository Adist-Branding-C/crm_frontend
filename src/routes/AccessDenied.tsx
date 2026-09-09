import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccessDenied = () => (
  <div className="access-denied">
    <ShieldAlert size={48} />
    <h1>403 — Access Denied</h1>
    <p>You don't have permission to view this page. If you believe this is a mistake, contact an administrator.</p>
    <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
  </div>
);

export default AccessDenied;
