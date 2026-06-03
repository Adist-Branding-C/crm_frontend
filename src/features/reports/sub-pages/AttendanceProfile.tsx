import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Home, Timer, Activity } from 'lucide-react';

const AttendanceProfile = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const dateParam = searchParams.get('date') || '2026-04-24';

  const staffData: Record<string, { name: string; phone: string; officeTime: string; wfhTime: string; totalTime: string; activity: number }> = {
    '917025769000': { name: 'John Doe', phone: '917025769000', officeTime: '8h 30m', wfhTime: '1h 00m', totalTime: '9h 30m', activity: 92 },
    '917025769001': { name: 'Jane Smith', phone: '917025769001', officeTime: '7h 45m', wfhTime: '2h 00m', totalTime: '9h 45m', activity: 88 },
    '917025769002': { name: 'Mike Johnson', phone: '917025769002', officeTime: '9h 00m', wfhTime: '0h 30m', totalTime: '9h 30m', activity: 95 },
    '917025769003': { name: 'Sarah Williams', phone: '917025769003', officeTime: '8h 00m', wfhTime: '1h 30m', totalTime: '9h 30m', activity: 90 },
    '917025769004': { name: 'David Brown', phone: '917025769004', officeTime: '7h 30m', wfhTime: '1h 00m', totalTime: '8h 30m', activity: 85 },
  };

  const staffIdStr = staffId ?? '917025769000';
  const staff = staffData[staffIdStr] ?? staffData['917025769000']!;

  const logsData = [
    { id: 1, time: '09:30 AM', type: 'Check In', location: 'Sector 18, Delhi', duration: '-' },
    { id: 2, time: '10:15 AM', type: 'Break Start', location: 'Cafeteria', duration: '15m' },
    { id: 3, time: '10:30 AM', type: 'Break End', location: 'Cafeteria', duration: '-' },
    { id: 4, time: '01:00 PM', type: 'Lunch Start', location: 'Cafeteria', duration: '1h' },
    { id: 5, time: '02:00 PM', type: 'Lunch End', location: 'Cafeteria', duration: '-' },
    { id: 6, time: '05:30 PM', type: 'Check Out', location: 'Sector 18, Delhi', duration: '-' },
  ];

  return (
    <div className="report-content-wrapper with-sidebar">
      <div className="profile-header">
        <button className="btn btn-secondary" onClick={() => navigate('/reports/attendance')}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>
      <div className="profile-staff-info">
        <div className="profile-staff-details">
          <h2>{staff.name}</h2>
          <p className="profile-staff-phone">{staff.phone}</p>
          <p className="profile-staff-date">{dateParam}</p>
        </div>
      </div>
      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <Clock size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.officeTime}</span>
            <span className="profile-stat-label">Office Time</span>
          </div>
        </div>
        <div className="profile-stat-card">
          <Home size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.wfhTime}</span>
            <span className="profile-stat-label">Work From Home</span>
          </div>
        </div>
        <div className="profile-stat-card">
          <Timer size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.totalTime}</span>
            <span className="profile-stat-label">Total Duration</span>
          </div>
        </div>
        <div className="profile-stat-card">
          <Activity size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.activity}%</span>
            <span className="profile-stat-label">Activity</span>
          </div>
        </div>
      </div>
      <div className="profile-section">
        <h3 className="profile-section-title">Activity Logs</h3>
        <div className="table-container">
          <table className="enquiries-table">
            <thead><tr><th>Time</th><th>Activity</th><th>Location</th><th>Duration</th></tr></thead>
            <tbody>
              {logsData.map(log => (
                <tr key={log.id}>
                  <td>{log.time}</td>
                  <td><span className={`badge badge-${log.type.toLowerCase().replace(' ', '-')}`}>{log.type}</span></td>
                  <td>{log.location}</td>
                  <td>{log.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceProfile;
