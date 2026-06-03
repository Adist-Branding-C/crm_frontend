import { FacebookLeadStatus } from '../../../shared/constants/enums';
import type { Workflow, FacebookLead } from '../types';

export const workflowsList: Workflow[] = [
  { id: 1, name: 'All Workflows' },
  { id: 2, name: 'MBBS new common' },
  { id: 3, name: 'Demo Workflow' },
  { id: 4, name: 'Admission Leads' },
  { id: 5, name: 'Enquiry Flow' },
];

export const sampleLeads: FacebookLead[] = [
  { id: 794307, workflowName: 'MBBS new common', name: 'Shan Nizar Pathummal Bevi', phone: '919446705481', additionalData: { city: 'Kochi', course: 'MBBS', email: 'shan@test.com', campaign: 'MBBS 2026' }, status: FacebookLeadStatus.SUCCESS, leadStatus: 'New', createdAt: '2026-04-25 02:27:03', failureReason: '-' },
  { id: 794306, workflowName: 'Demo Workflow', name: 'Rahul Sharma', phone: '919876543210', additionalData: { city: 'Delhi', course: 'Demo', email: 'rahul@test.com', campaign: 'Demo' }, status: FacebookLeadStatus.SUCCESS, leadStatus: 'Existing', createdAt: '2026-04-25 02:25:11', failureReason: '-' },
  { id: 794305, workflowName: 'Admission Leads', name: 'Priya Patel', phone: '919812345678', additionalData: { city: 'Mumbai', course: 'Engineering', email: 'priya@test.com', campaign: 'Admission' }, status: FacebookLeadStatus.FAILED, leadStatus: 'New', createdAt: '2026-04-25 02:20:45', failureReason: 'Duplicate phone number' },
  { id: 794304, workflowName: 'MBBS new common', name: 'Amit Kumar', phone: '919798765432', additionalData: { city: 'Bangalore', course: 'MBBS', email: 'amit@test.com', campaign: 'MBBS 2026' }, status: FacebookLeadStatus.PENDING, leadStatus: 'Duplicate', createdAt: '2026-04-25 02:18:33', failureReason: '-' },
  { id: 794303, workflowName: 'Enquiry Flow', name: 'Sneha Reddy', phone: '919745678901', additionalData: { city: 'Chennai', course: 'Nursing', email: 'sneha@test.com', campaign: 'Enquiry' }, status: FacebookLeadStatus.SUCCESS, leadStatus: 'New', createdAt: '2026-04-25 02:15:22', failureReason: '-' },
  { id: 794302, workflowName: 'Demo Workflow', name: 'John Doe', phone: '919623456789', additionalData: { city: 'Hyderabad', course: 'Demo', email: 'john@test.com', campaign: 'Demo' }, status: FacebookLeadStatus.FAILED, leadStatus: 'New', createdAt: '2026-04-25 02:10:08', failureReason: 'Invalid phone format' },
  { id: 794301, workflowName: 'Admission Leads', name: 'Jane Smith', phone: '919556778899', additionalData: { city: 'Pune', course: 'Engineering', email: 'jane@test.com', campaign: 'Admission' }, status: FacebookLeadStatus.SUCCESS, leadStatus: 'Existing', createdAt: '2026-04-25 02:05:55', failureReason: '-' },
  { id: 794300, workflowName: 'MBBS new common', name: 'Mike Johnson', phone: '919445566778', additionalData: { city: 'Kolkata', course: 'MBBS', email: 'mike@test.com', campaign: 'MBBS 2026' }, status: FacebookLeadStatus.PENDING, leadStatus: 'New', createdAt: '2026-04-25 02:00:12', failureReason: '-' },
  { id: 794299, workflowName: 'Enquiry Flow', name: 'Sarah Lee', phone: '919334455667', additionalData: { city: 'Ahmedabad', course: 'Nursing', email: 'sarah@test.com', campaign: 'Enquiry' }, status: FacebookLeadStatus.SUCCESS, leadStatus: 'Duplicate', createdAt: '2026-04-25 01:55:44', failureReason: '-' },
  { id: 794298, workflowName: 'Demo Workflow', name: 'Tom Harris', phone: '919223344556', additionalData: { city: 'Jaipur', course: 'Demo', email: 'tom@test.com', campaign: 'Demo' }, status: FacebookLeadStatus.FAILED, leadStatus: 'New', createdAt: '2026-04-25 01:50:33', failureReason: 'Missing required field' },
];
