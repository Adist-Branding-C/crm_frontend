import { Users, DollarSign, ListChecks, Phone, ClipboardList, Clock } from 'lucide-react';
import type { ReportCategory, ReportOption } from '../types';
import type { Column } from '../../../shared/types/table';
import type { DailyActivityRow, GLAPIRow, DeletedLead, DealStageStat, DealAgentStat, LeadConversionDeal, TaskWiseRow, LeadChangeRow, TaskWorkRow, GLDialerCall, GLDialerAgentStat, CallFeedbackEntry, CheckinRow, AttendanceRow } from '../types';

export const reportCategories: ReportCategory[] = [
  { id: 'lead', title: 'Lead Reports', path: '/reports/lead', icon: Users },
  // { id: 'deal', title: 'Deal Reports', path: '/reports/deal', icon: DollarSign },
  // { id: 'task', title: 'Task Reports', path: '/reports/task', icon: ListChecks },
  // { id: 'call', title: 'Call Reports', path: '/reports/call', icon: Phone },
  // { id: 'checkin', title: 'Check-in & Check-out', path: '/reports/checkin', icon: ClipboardList },
  // { id: 'attendance', title: 'Attendance Report', path: '/reports/attendance', icon: Clock },
];

export const leadReportOptions: ReportOption[] = [
  // { id: 'daily', title: 'Daily Activity Report', description: "A compact overview of your team's sales progress", path: '/reports/lead/daily' },
  // { id: 'status-wise', title: 'Status Wise Report', description: 'Track performance and progress segmented by various statuses for precise insights', path: '/reports/lead/status-wise' },
  // { id: 'status-change', title: 'Status Change Report', description: 'An overview of key updates, tracking shifts in status for enhanced decision-making', path: '/reports/lead/status-change' },
  // { id: 'source-wise', title: 'Source Wise Report', description: 'Evaluate the effectiveness of different lead sources with comprehensive data insights', path: '/reports/lead/source-wise' },
  // { id: 'checkout', title: 'Check Out Summary report', description: 'Track employee engagement and activity with detailed check-in data', path: '/reports/lead/checkout' },
  // { id: 'export', title: 'Export', description: 'Quickly download and share vital data for deeper offline analysis', path: '/reports/lead/export' },
  { id: 'export-history', title: 'Export History', description: 'Track all your past lead data exports for complete transparency', path: '/reports/lead/export-history' },
  { id: 'import-history', title: 'Import History', description: 'Track all your past lead data imports for complete transparency', path: '/reports/lead/import-history' },
  { id: 'gl-api', title: 'GL API History', description: 'Track all your past lead data api for complete transparency', path: '/reports/lead/gl-api' },
  { id: 'deleted', title: 'Deleted Leads', description: '', path: '/reports/lead/deleted' },
];

/**
 * Column definitions for the Deleted Leads report table - mirrors the main leads
 * table's COLUMNS (crm_ui/src/features/enquiries/constants/index.ts) plus
 * Deleted At / Deleted By, and without the sortable flag on fields the backend's
 * LEAD_SORT_FIELD_MAP doesn't support sorting by.
 */
export const DELETED_LEAD_COLUMNS: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
  { key: 'source', label: 'Source' },
  { key: 'createdAt', label: 'Created At', sortable: true },
  { key: 'deletedAt', label: 'Deleted At' },
  { key: 'deletedBy', label: 'Deleted By' },
];

export const dealReportOptions: ReportOption[] = [
  { id: 'stage', title: 'Deals by Stage', description: 'Overview of deals segmented by current stage in pipeline', path: '/reports/deal/stage' },
  { id: 'conversion', title: 'Lead Conversion', description: 'Track conversion rates from lead to deal', path: '/reports/deal/conversion' },
  { id: 'visit', title: 'Deal Visit', description: 'Record and analyze deal visit activities', path: '/reports/deal/visit' },
  { id: 'export', title: 'Deal Export', description: 'Export deal data for offline analysis', path: '/reports/deal/export' },
  { id: 'export-history', title: 'Deal Export History', description: 'Track all your past deal data exports', path: '/reports/deal/export-history' },
  { id: 'deleted', title: 'Deleted Deals', description: 'View and restore previously deleted deals', path: '/reports/deal/deleted' },
];

export const taskReportOptions: ReportOption[] = [
  { id: 'task-wise', title: 'Task Wise Report', description: 'Comprehensive breakdown of tasks by category and status', path: '/reports/task/task-wise' },
  { id: 'lead-change', title: 'Lead Change Report', description: 'Track task-related lead changes and updates', path: '/reports/task/lead-change' },
  { id: 'work', title: 'Task Work Report', description: 'Analyze task completion and work distribution', path: '/reports/task/work' },
];

export const callReportOptions: ReportOption[] = [
  { id: 'ivr', title: 'IVR Call Report', description: 'Detailed analysis of IVR call patterns and metrics', path: '/reports/call/ivr' },
  { id: 'dialer', title: 'GLDialer Call Report', description: 'Track dialer performance and call statistics', path: '/reports/call/dialer' },
  { id: 'feedback', title: 'Call Feedback Report', description: 'Customer feedback and satisfaction metrics', path: '/reports/call/feedback' },
];

export const dailyActivitySampleData: DailyActivityRow[] = [
  { id: 1, agentName: 'Rameesa', total: 45, attendance: 22, visitor: 5, leadAdd: 12, taskAdd: 8, callTaskFeedback: 3, dealsAdd: 4, taskEdit: 6, leadUpdate: 10, noteAdd: 8, callLogAdd: 5, statusUpdated: 3, purposeUpdated: 2, voiceNoteAdd: 1, fileNoteAdd: 0 },
  { id: 2, agentName: 'Fida Fathima', total: 38, attendance: 21, visitor: 3, leadAdd: 10, taskAdd: 6, callTaskFeedback: 2, dealsAdd: 3, taskEdit: 5, leadUpdate: 8, noteAdd: 6, callLogAdd: 4, statusUpdated: 2, purposeUpdated: 1, voiceNoteAdd: 0, fileNoteAdd: 0 },
  { id: 3, agentName: 'Nandana K', total: 32, attendance: 20, visitor: 4, leadAdd: 8, taskAdd: 5, callTaskFeedback: 1, dealsAdd: 2, taskEdit: 4, leadUpdate: 6, noteAdd: 5, callLogAdd: 3, statusUpdated: 1, purposeUpdated: 1, voiceNoteAdd: 1, fileNoteAdd: 0 },
  { id: 4, agentName: 'Aysha', total: 28, attendance: 23, visitor: 2, leadAdd: 6, taskAdd: 4, callTaskFeedback: 1, dealsAdd: 1, taskEdit: 3, leadUpdate: 5, noteAdd: 4, callLogAdd: 2, statusUpdated: 1, purposeUpdated: 0, voiceNoteAdd: 0, fileNoteAdd: 0 },
  { id: 5, agentName: 'Nesri', total: 25, attendance: 19, visitor: 1, leadAdd: 5, taskAdd: 3, callTaskFeedback: 1, dealsAdd: 1, taskEdit: 2, leadUpdate: 4, noteAdd: 3, callLogAdd: 2, statusUpdated: 1, purposeUpdated: 0, voiceNoteAdd: 0, fileNoteAdd: 0 },
];

export const glAPISampleData: GLAPIRow[] = [
  { id: 8927040, slNo: 267, via: 'API', leadName: 'Muhammed Aadhil', countryCode: '+91', mobile: '9895205752', assignedTo: 'Rahmath', purpose: '', source: '1000 | Bukhara | Teena | MBBS | Lead | 3/4/26', status: 'Junk Lead _ Form not submitted', count: 0, dateTime: '20 Apr 2026 12:19:08 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8977734, slNo: 122, via: 'API', leadName: 'Sarath', countryCode: '+91', mobile: '7736068676', assignedTo: 'Fida Fathima', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Form not submitted', count: 0, dateTime: '24 Apr 2026 11:20:04 AM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8977732, slNo: 125, via: 'API', leadName: 'MonIrul', countryCode: '+91', mobile: '7012719127', assignedTo: 'Rameesa', purpose: 'DND', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'DND - NA/ Off/ Invalid/ No incoming / Busy', count: 0, dateTime: '24 Apr 2026 11:20:04 AM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8927041, slNo: 269, via: 'API', leadName: 'Adithyan lal', countryCode: '+91', mobile: '8590271518', assignedTo: 'Nandana K', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'DND - NA/ Off/ Invalid/ No incoming / Busy', count: 0, dateTime: '20 Apr 2026 12:19:08 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8927042, slNo: 270, via: 'API', leadName: 'Rupesh Kumar', countryCode: '+91', mobile: '7827847553', assignedTo: 'Fida Fathima', purpose: 'Lost', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Hindi/Arabic/ Bengali', count: 0, dateTime: '20 Apr 2026 12:19:08 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8878787, slNo: 400, via: 'API', leadName: 'Abraham', countryCode: '+91', mobile: '9446375014', assignedTo: 'Aysha', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Form not submitted', count: 0, dateTime: '18 Apr 2026 12:03:36 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8878786, slNo: 401, via: 'API', leadName: '温德尔 库马尔', countryCode: '+91', mobile: '9365611192', assignedTo: 'Nesri', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Hindi/Arabic/ Bengali', count: 0, dateTime: '18 Apr 2026 12:03:36 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8878785, slNo: 402, via: 'API', leadName: 'Amit Kumar Jay Bheem पाने ब्रो किंग GKP up 53', countryCode: '+91', mobile: '9519499714', assignedTo: 'Rahmath', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Hindi/Arabic/ Bengali', count: 0, dateTime: '18 Apr 2026 12:03:36 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8861448, slNo: 488, via: 'API', leadName: 'mohamed arshad', countryCode: '+91', mobile: '8891105190', assignedTo: 'Rameesa', purpose: 'DND', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'DND - NA/ Off/ Invalid/ No incoming / Busy', count: 0, dateTime: '16 Apr 2026 01:47:19 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  { id: 8861447, slNo: 489, via: 'API', leadName: 'Navaneeth bargavan p', countryCode: '+91', mobile: '7012099175', assignedTo: 'Aysha', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Not Interested', count: 0, dateTime: '16 Apr 2026 01:47:19 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
];

export const deletedLeadsSampleData: DeletedLead[] = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@email.com', location: 'Kochi, Kerala', assignedTo: 'John Doe', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-15', updatedAt: '2024-01-20', deletedAt: '2024-01-25', deleteReason: 'Duplicate' },
  { id: 2, name: 'Priya Patel', phone: '9876543211', email: 'priya@email.com', location: 'Trivandrum, Kerala', assignedTo: 'Jane Smith', purpose: 'Support', type: 'Cold Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-14', updatedAt: '2024-01-19', deletedAt: '2024-01-26', deleteReason: 'Not Interested' },
  { id: 3, name: 'Amit Kumar', phone: '9876543212', email: 'amit@email.com', location: 'Bangalore, Karnataka', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-13', updatedAt: '2024-01-18', deletedAt: '2024-01-24', deleteReason: 'Spam' },
  { id: 4, name: 'Sneha Reddy', phone: '9876543213', email: 'sneha@email.com', location: 'Hyderabad, Telangana', assignedTo: 'Mike Johnson', purpose: 'Demo', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-12', updatedAt: '2024-01-17', deletedAt: '2024-01-23', deleteReason: 'Invalid Number' },
  { id: 5, name: 'Vikram Singh', phone: '9876543214', email: 'vikram@email.com', location: 'Chennai, Tamil Nadu', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-11', updatedAt: '2024-01-16', deletedAt: '2024-01-22', deleteReason: 'Duplicate' },
  { id: 6, name: 'Ananya Gupta', phone: '9876543215', email: 'ananya@email.com', location: 'Mumbai, Maharashtra', assignedTo: 'John Doe', purpose: 'Support', type: 'Warm Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-10', updatedAt: '2024-01-15', deletedAt: '2024-01-21', deleteReason: 'Not Interested' },
  { id: 7, name: 'Rajesh Verma', phone: '9876543216', email: 'rajesh@email.com', location: 'Delhi, NCR', assignedTo: 'Mike Johnson', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-09', updatedAt: '2024-01-14', deletedAt: '2024-01-20', deleteReason: 'Spam' },
  { id: 8, name: 'Kavitha Nair', phone: '9876543217', email: 'kavitha@email.com', location: 'Kolkata, West Bengal', assignedTo: 'Jane Smith', purpose: 'Demo', type: 'Cold Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-08', updatedAt: '2024-01-13', deletedAt: '2024-01-19', deleteReason: 'Invalid Number' },
];

export const dealStageData: DealStageStat[] = [
  { stage: 'Open', count: 45, amount: 125000, color: '#3b82f6' },
  { stage: 'Close', count: 28, amount: 85000, color: '#f59e0b' },
  { stage: 'Win', count: 18, amount: 62000, color: '#10b981' },
];

export const dealAgentData: DealAgentStat[] = [
  { id: 1, name: 'John Doe', totalDeals: 45, openDeals: 12, winDeals: 8, closeDeals: 25 },
  { id: 2, name: 'Jane Smith', totalDeals: 38, openDeals: 10, winDeals: 6, closeDeals: 22 },
  { id: 3, name: 'Mike Johnson', totalDeals: 32, openDeals: 8, winDeals: 5, closeDeals: 19 },
  { id: 4, name: 'Sarah Williams', totalDeals: 28, openDeals: 7, winDeals: 4, closeDeals: 17 },
  { id: 5, name: 'David Brown', totalDeals: 25, openDeals: 6, winDeals: 3, closeDeals: 16 },
  { id: 6, name: 'Emily Davis', totalDeals: 22, openDeals: 5, winDeals: 2, closeDeals: 15 },
  { id: 7, name: 'Chris Wilson', totalDeals: 18, openDeals: 4, winDeals: 2, closeDeals: 12 },
  { id: 8, name: 'Amanda Taylor', totalDeals: 15, openDeals: 3, winDeals: 1, closeDeals: 11 },
];

export const dealConversionData: LeadConversionDeal[] = [
  { id: 1, dealCode: 'DL001', dealName: 'TechCorp Deal', leadName: 'Rahul Sharma', mobile: '9876543210', dealAmount: 50000, dealStatus: 'Open', leadSource: 'Website', lostReason: '', startDate: '2024-01-15', endDate: '2024-02-15', staffName: 'John Doe', createdBy: 'Admin', updatedAt: '2024-01-20' },
  { id: 2, dealCode: 'DL002', dealName: 'Startup Deal', leadName: 'Priya Patel', mobile: '9876543211', dealAmount: 25000, dealStatus: 'Win', leadSource: 'Referral', lostReason: '', startDate: '2024-01-14', endDate: '2024-02-14', staffName: 'Jane Smith', createdBy: 'Admin', updatedAt: '2024-01-19' },
  { id: 3, dealCode: 'DL003', dealName: 'Global Deal', leadName: 'Amit Kumar', mobile: '9876543212', dealAmount: 75000, dealStatus: 'Lost', leadSource: 'Social Media', lostReason: 'Not Interested', startDate: '2024-01-13', endDate: '2024-02-13', staffName: 'John Doe', createdBy: 'Admin', updatedAt: '2024-01-18' },
  { id: 4, dealCode: 'DL004', dealName: 'SmallBiz Deal', leadName: 'Sneha Reddy', mobile: '9876543213', dealAmount: 15000, dealStatus: 'Open', leadSource: 'Website', lostReason: '', startDate: '2024-01-12', endDate: '2024-02-12', staffName: 'Mike Johnson', createdBy: 'Admin', updatedAt: '2024-01-17' },
  { id: 5, dealCode: 'DL005', dealName: 'MegaCorp Deal', leadName: 'Vikram Singh', mobile: '9876543214', dealAmount: 100000, dealStatus: 'Win', leadSource: 'Email Campaign', lostReason: '', startDate: '2024-01-11', endDate: '2024-02-11', staffName: 'Jane Smith', createdBy: 'Admin', updatedAt: '2024-01-16' },
  { id: 6, dealCode: 'DL006', dealName: 'Enterprise Deal', leadName: 'Ananya Gupta', mobile: '9876543215', dealAmount: 35000, dealStatus: 'Lost', leadSource: 'Referral', lostReason: 'Price High', startDate: '2024-01-10', endDate: '2024-02-10', staffName: 'John Doe', createdBy: 'Admin', updatedAt: '2024-01-15' },
  { id: 7, dealCode: 'DL007', dealName: 'Corporate Deal', leadName: 'Rajesh Verma', mobile: '9876543216', dealAmount: 45000, dealStatus: 'Open', leadSource: 'Website', lostReason: '', startDate: '2024-01-09', endDate: '2024-02-09', staffName: 'Mike Johnson', createdBy: 'Admin', updatedAt: '2024-01-14' },
  { id: 8, dealCode: 'DL008', dealName: 'Business Deal', leadName: 'Kavitha Nair', mobile: '9876543217', dealAmount: 28000, dealStatus: 'Win', leadSource: 'Social Media', lostReason: '', startDate: '2024-01-08', endDate: '2024-02-08', staffName: 'Jane Smith', createdBy: 'Admin', updatedAt: '2024-01-13' },
];

export const taskWiseData: TaskWiseRow[] = [
  { id: 1, agentName: 'John Doe', total: 45, completed: 32, pending: 10, overDue: 3 },
  { id: 2, agentName: 'Jane Smith', total: 38, completed: 28, pending: 8, overDue: 2 },
  { id: 3, agentName: 'Mike Johnson', total: 42, completed: 35, pending: 5, overDue: 2 },
  { id: 4, agentName: 'Sarah Williams', total: 35, completed: 25, pending: 8, overDue: 2 },
  { id: 5, agentName: 'David Brown', total: 28, completed: 20, pending: 6, overDue: 2 },
  { id: 6, agentName: 'Emily Davis', total: 32, completed: 24, pending: 6, overDue: 2 },
  { id: 7, agentName: 'Chris Wilson', total: 25, completed: 18, pending: 5, overDue: 2 },
  { id: 8, agentName: 'Amanda Taylor', total: 22, completed: 15, pending: 5, overDue: 2 },
];

export const leadChangeData: LeadChangeRow[] = [
  { id: 1, slNum: 1, leadName: 'Rahul Sharma', mobile: '9876543210', leadSource: 'Website', leadStatus: 'New', noteAddedBy: 'John Doe', notes: 'Initial contact made' },
  { id: 2, slNum: 2, leadName: 'Priya Patel', mobile: '9876543211', leadSource: 'Referral', leadStatus: 'Connected', noteAddedBy: 'Jane Smith', notes: 'Interested in demo' },
  { id: 3, slNum: 3, leadName: 'Amit Kumar', mobile: '9876543212', leadSource: 'Social Media', leadStatus: 'Not Interested', noteAddedBy: 'Mike Johnson', notes: 'Scheduled follow-up' },
  { id: 4, slNum: 4, leadName: 'Sneha Reddy', mobile: '9876543213', leadSource: 'Website', leadStatus: 'New', noteAddedBy: 'John Doe', notes: 'Awaiting response' },
  { id: 5, slNum: 5, leadName: 'Vikram Singh', mobile: '9876543214', leadSource: 'Email Campaign', leadStatus: 'Connected', noteAddedBy: 'Sarah Williams', notes: 'Sent proposal' },
  { id: 6, slNum: 6, leadName: 'Ananya Gupta', mobile: '9876543215', leadSource: 'Referral', leadStatus: 'Not Interested', noteAddedBy: 'Jane Smith', notes: 'Budget concerns' },
  { id: 7, slNum: 7, leadName: 'Rajesh Verma', mobile: '9876543216', leadSource: 'Social Media', leadStatus: 'New', noteAddedBy: 'Mike Johnson', notes: 'Needs clarification' },
  { id: 8, slNum: 8, leadName: 'Kavitha Nair', mobile: '9876543217', leadSource: 'Website', leadStatus: 'Connected', noteAddedBy: 'John Doe', notes: 'Product demo scheduled' },
];

export const taskWorkData: TaskWorkRow[] = [
  { id: 1, slNo: 1, customerName: 'Rahul Sharma', task: 'Product Demo', contactNumber: '9876543210', assignedTo: 'John Doe', date: '2024-01-15', createdDate: '2024-01-10', completedDate: '2024-01-15', remark: 'Demo completed successfully', status: 'Completed', workStartOn: '10:00 AM', workEndOn: '11:30 AM' },
  { id: 2, slNo: 2, customerName: 'Priya Patel', task: 'Follow-up Call', contactNumber: '9876543211', assignedTo: 'Jane Smith', date: '2024-01-16', createdDate: '2024-01-11', completedDate: '2024-01-16', remark: 'Customer interested', status: 'Completed', workStartOn: '02:00 PM', workEndOn: '02:30 PM' },
  { id: 3, slNo: 3, customerName: 'Amit Kumar', task: 'Site Visit', contactNumber: '9876543212', assignedTo: 'Mike Johnson', date: '2024-01-17', createdDate: '2024-01-12', completedDate: '', remark: 'Visit scheduled', status: 'Pending', workStartOn: '09:00 AM', workEndOn: '' },
  { id: 4, slNo: 4, customerName: 'Sneha Reddy', task: 'Proposal Send', contactNumber: '9876543213', assignedTo: 'John Doe', date: '2024-01-18', createdDate: '2024-01-13', completedDate: '2024-01-18', remark: 'Proposal sent via email', status: 'Completed', workStartOn: '11:00 AM', workEndOn: '11:15 AM' },
  { id: 5, slNo: 5, customerName: 'Vikram Singh', task: 'Client Meeting', contactNumber: '9876543214', assignedTo: 'Sarah Williams', date: '2024-01-19', createdDate: '2024-01-14', completedDate: '', remark: 'Meeting rescheduled', status: 'In Progress', workStartOn: '03:00 PM', workEndOn: '' },
  { id: 6, slNo: 6, customerName: 'Ananya Gupta', task: 'Contract Review', contactNumber: '9876543215', assignedTo: 'Jane Smith', date: '2024-01-20', createdDate: '2024-01-15', completedDate: '2024-01-20', remark: 'Contract signed', status: 'Completed', workStartOn: '10:30 AM', workEndOn: '12:00 PM' },
  { id: 7, slNo: 7, customerName: 'Rajesh Verma', task: 'Product Demo', contactNumber: '9876543216', assignedTo: 'Mike Johnson', date: '2024-01-21', createdDate: '2024-01-16', completedDate: '', remark: 'Awaiting confirmation', status: 'Pending', workStartOn: '02:00 PM', workEndOn: '' },
  { id: 8, slNo: 8, customerName: 'Kavitha Nair', task: 'Follow-up Call', contactNumber: '9876543217', assignedTo: 'John Doe', date: '2024-01-22', createdDate: '2024-01-17', completedDate: '2024-01-22', remark: 'Callback scheduled', status: 'Completed', workStartOn: '04:00 PM', workEndOn: '04:20 PM' },
];

export const callHistoryData: GLDialerCall[] = [
  { id: 1, customer: 'Rahul Sharma', callType: 'Incoming', agentName: 'John Doe', callTime: '10:30 AM', duration: '5:23' },
  { id: 2, customer: 'Priya Patel', callType: 'Outgoing', agentName: 'Jane Smith', callTime: '11:15 AM', duration: '3:45' },
  { id: 3, customer: 'Amit Kumar', callType: 'Incoming', agentName: 'Mike Johnson', callTime: '12:00 PM', duration: '8:12' },
  { id: 4, customer: 'Sneha Reddy', callType: 'Outgoing', agentName: 'John Doe', callTime: '01:30 PM', duration: '2:18' },
  { id: 5, customer: 'Vikram Singh', callType: 'Incoming', agentName: 'Sarah Williams', callTime: '02:45 PM', duration: '6:55' },
  { id: 6, customer: 'Ananya Gupta', callType: 'Missed', agentName: 'Jane Smith', callTime: '03:20 PM', duration: '0:00' },
  { id: 7, customer: 'Rajesh Verma', callType: 'Incoming', agentName: 'Mike Johnson', callTime: '04:10 PM', duration: '4:32' },
  { id: 8, customer: 'Kavitha Nair', callType: 'Outgoing', agentName: 'John Doe', callTime: '05:00 PM', duration: '7:45' },
];

export const agentStatsData: GLDialerAgentStat[] = [
  { id: 1, agentName: 'John Doe', answeredCalls: 45 },
  { id: 2, agentName: 'Jane Smith', answeredCalls: 38 },
  { id: 3, agentName: 'Mike Johnson', answeredCalls: 32 },
  { id: 4, agentName: 'Sarah Williams', answeredCalls: 28 },
];

export const callFeedbackData: CallFeedbackEntry[] = [
  { id: 1, leadName: 'Rahul Sharma', number: '+91 98765 43210', agent: 'John Doe', remark: 'Interested in product', callStatus: 'Connected', callTime: '10:30 AM' },
  { id: 2, leadName: 'Priya Patel', number: '+91 98765 43211', agent: 'Jane Smith', remark: 'Callback later', callStatus: 'Action Pending', callTime: '11:15 AM' },
  { id: 3, leadName: 'Amit Kumar', number: '+91 98765 43212', agent: 'Mike Johnson', remark: 'Not interested', callStatus: 'Not Connected', callTime: '12:00 PM' },
  { id: 4, leadName: 'Sneha Reddy', number: '+91 98765 43213', agent: 'John Doe', remark: 'Needs more info', callStatus: 'Connected', callTime: '01:30 PM' },
  { id: 5, leadName: 'Vikram Singh', number: '+91 98765 43214', agent: 'Sarah Williams', remark: 'Demo scheduled', callStatus: 'Connected', callTime: '02:45 PM' },
  { id: 6, leadName: 'Ananya Gupta', number: '+91 98765 43215', agent: 'Jane Smith', remark: 'Busy, call tomorrow', callStatus: 'Action Pending', callTime: '03:20 PM' },
  { id: 7, leadName: 'Rajesh Verma', number: '+91 98765 43216', agent: 'Mike Johnson', remark: 'Wrong number', callStatus: 'Not Connected', callTime: '04:10 PM' },
  { id: 8, leadName: 'Kavitha Nair', number: '+91 98765 43217', agent: 'John Doe', remark: 'Very interested', callStatus: 'Connected', callTime: '05:00 PM' },
  { id: 9, leadName: 'Deepak Patel', number: '+91 98765 43218', agent: 'Sarah Williams', remark: 'Consider later', callStatus: 'Action Pending', callTime: '05:45 PM' },
  { id: 10, leadName: 'Meera Shah', number: '+91 98765 43219', agent: 'Jane Smith', remark: 'No answer', callStatus: 'Not Connected', callTime: '06:15 PM' },
];

export const checkinData: CheckinRow[] = [
  { id: 1, shop: 'Sector 18', agent: 'John Doe', note: 'Morning Checkin', typeIn: 'Check In', dateIn: '2026-04-25 09:30', locationIn: 'Delhi', typeOut: 'Check Out', dateOut: '2026-04-25 18:00', locationOut: 'Delhi' },
  { id: 2, shop: 'Nehru Place', agent: 'Jane Smith', note: 'Client Visit', typeIn: 'Check In', dateIn: '2026-04-25 10:00', locationIn: 'Noida', typeOut: 'Check Out', dateOut: '2026-04-25 17:30', locationOut: 'Noida' },
  { id: 3, shop: 'Cyber Hub', agent: 'Mike Johnson', note: 'Meeting', typeIn: 'Check In', dateIn: '2026-04-25 08:45', locationIn: 'Gurgaon', typeOut: 'Check Out', dateOut: '2026-04-25 19:00', locationOut: 'Gurgaon' },
  { id: 4, shop: 'Connaught Place', agent: 'John Doe', note: 'Office Work', typeIn: 'Check In', dateIn: '2026-04-24 09:00', locationIn: 'Delhi', typeOut: 'Check Out', dateOut: '2026-04-24 18:30', locationOut: 'Delhi' },
  { id: 5, shop: 'MG Road', agent: 'Jane Smith', note: 'Field Visit', typeIn: 'Check In', dateIn: '2026-04-24 10:30', locationIn: 'Gurgaon', typeOut: 'Check Out', dateOut: '2026-04-24 16:00', locationOut: 'Gurgaon' },
];

export const attendanceData: AttendanceRow[] = [
  { id: 1, agent: 'John Doe', phone: '917025769000', workingDays: 22, leave: 2, duration: '176h 30m' },
  { id: 2, agent: 'Jane Smith', phone: '917025769001', workingDays: 21, leave: 3, duration: '168h 45m' },
  { id: 3, agent: 'Mike Johnson', phone: '917025769002', workingDays: 20, leave: 1, duration: '160h 00m' },
  { id: 4, agent: 'Sarah Williams', phone: '917025769003', workingDays: 23, leave: 1, duration: '184h 15m' },
  { id: 5, agent: 'David Brown', phone: '917025769004', workingDays: 19, leave: 4, duration: '152h 30m' },
];

export const REPT_LEAD_TYPE_OPTIONS = [
  { value: 'hot', label: 'Hot Lead' },
  { value: 'warm', label: 'Warm Lead' },
  { value: 'cold', label: 'Cold Lead' },
];

export const REPT_PURPOSE_OPTIONS = [
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'demo', label: 'Demo' },
];

export const REPT_SOURCE_OPTIONS = [
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social', label: 'Social Media' },
];

export const REPT_DEAL_STAGE_OPTIONS = [
  { value: 'win', label: 'Win' },
  { value: 'lose', label: 'Lose' },
  { value: 'inProgress', label: 'In Progress' },
];

export const REPT_DEAL_TYPE_OPTIONS = [
  { value: 'hot', label: 'Hot Deal' },
  { value: 'warm', label: 'Warm Deal' },
  { value: 'cold', label: 'Cold Deal' },
];

export const REPT_SORT_OPTIONS = [
  { value: 'createdDate', label: 'Created Date' },
  { value: 'updatedDate', label: 'Updated Date' },
  { value: 'dealAmountHigh', label: 'Deal Amount (High-Low)' },
  { value: 'dealAmountLow', label: 'Deal Amount (Low-High)' },
];

export const deletedDealData = [
  { id: 1, dealName: 'TechCorp Deal', deletedBy: 'John Doe', leadName: 'Rahul Sharma', mobile: '9876543210', amount: 50000, status: 'Lost', type: 'Hot Deal', startDate: '2024-01-15', endDate: '2024-02-15', agent: 'John Doe', createdBy: 'Admin', createdAt: '2024-01-10', deletedAt: '2024-01-20', lostReason: 'Not Interested' },
  { id: 2, dealName: 'Startup Deal', deletedBy: 'Jane Smith', leadName: 'Priya Patel', mobile: '9876543211', amount: 25000, status: 'Lost', type: 'Cold Deal', startDate: '2024-01-14', endDate: '2024-02-14', agent: 'Jane Smith', createdBy: 'Admin', createdAt: '2024-01-09', deletedAt: '2024-01-19', lostReason: 'Price High' },
  { id: 3, dealName: 'Global Deal', deletedBy: 'Mike Johnson', leadName: 'Amit Kumar', mobile: '9876543212', amount: 75000, status: 'Lost', type: 'Warm Deal', startDate: '2024-01-13', endDate: '2024-02-13', agent: 'Mike Johnson', createdBy: 'Admin', createdAt: '2024-01-08', deletedAt: '2024-01-18', lostReason: 'Budget Issues' },
  { id: 4, dealName: 'SmallBiz Deal', deletedBy: 'John Doe', leadName: 'Sneha Reddy', mobile: '9876543213', amount: 15000, status: 'Lost', type: 'Cold Deal', startDate: '2024-01-12', endDate: '2024-02-12', agent: 'John Doe', createdBy: 'Admin', createdAt: '2024-01-07', deletedAt: '2024-01-17', lostReason: 'Not Needed' },
  { id: 5, dealName: 'MegaCorp Deal', deletedBy: 'Jane Smith', leadName: 'Vikram Singh', mobile: '9876543214', amount: 100000, status: 'Lost', type: 'Hot Deal', startDate: '2024-01-11', endDate: '2024-02-11', agent: 'Jane Smith', createdBy: 'Admin', createdAt: '2024-01-06', deletedAt: '2024-01-16', lostReason: 'Competitor' },
  { id: 6, dealName: 'Enterprise Deal', deletedBy: 'Mike Johnson', leadName: 'Ananya Gupta', mobile: '9876543215', amount: 35000, status: 'Lost', type: 'Warm Deal', startDate: '2024-01-10', endDate: '2024-02-10', agent: 'Mike Johnson', createdBy: 'Admin', createdAt: '2024-01-05', deletedAt: '2024-01-15', lostReason: 'Timeline' },
];
