import { Users, UserCheck, UserPlus, UserMinus } from 'lucide-react';
import type { Column } from '../../../shared/types/table';
import type { LabelValuePair } from '../../../shared/types/common';

export type Option = LabelValuePair;

export interface StatsCard {
  key: string;
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  change: string;
}

// LeadSourceWise
export interface SourceRow {
  id: number;
  source: string;
  fromDate: string;
  toDate: string;
  none: number;
  new: number;
  connected: number;
  interested: number;
  registered: number;
  notInterested: number;
  justEnquiry: number;
  plusOne: number;
  detailsShared: number;
  plusTwoCall: number;
  neetAfter: number;
  seminarInt: number;
  nursingPg: number;
  fridayWeb: number;
  plusTwo2027: number;
  mbbs: number;
  webinarGform: number;
  webinarAtt: number;
  junkForm: number;
  junkHindi: number;
  webinarFollow: number;
  webinarLost: number;
  dnd: number;
  later: number;
  empty: number;
  total: number;
  [key: string]: string | number;
}

export const sourceWiseData: SourceRow[] = [
  { id: 1, source: 'Website', fromDate: '2024-01-01', toDate: '2024-01-31', none: 5, new: 25, connected: 45, interested: 32, registered: 18, notInterested: 12, justEnquiry: 8, plusOne: 6, detailsShared: 22, plusTwoCall: 4, neetAfter: 3, seminarInt: 5, nursingPg: 2, fridayWeb: 3, plusTwo2027: 4, mbbs: 5, webinarGform: 6, webinarAtt: 8, junkForm: 4, junkHindi: 2, webinarFollow: 3, webinarLost: 2, dnd: 3, later: 4, empty: 5, total: 208 },
];

export const sourceWiseSortOptions: Option[] = [
  { value: '', label: 'All' },
  { value: 'assignedDate', label: 'Assigned Date' },
  { value: 'createdDate', label: 'Created Date' },
];

export const sourceWiseAgentOptions: Option[] = [
  { value: '', label: 'Select Agent' },
  { value: 'all', label: 'All Agents' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
];

export const sourceWiseSourceOptions: Option[] = [
  { value: '', label: 'Select Source' },
  { value: 'all', label: 'All Sources' },
  { value: 'website', label: 'Website' },
  { value: 'meta', label: 'Meta Campaign' },
  { value: 'referral', label: 'Referral' },
  { value: 'whatsapp', label: 'Incoming Call / WhatsApp' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google Ads' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'seminar', label: 'Seminar' },
];

export const sourceWiseColumns: Column[] = [
  { key: 'select', label: 'Select' },
  { key: 'action', label: 'Action' },
  { key: 'slNo', label: 'SL No' },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'fromDate', label: 'From Date', sortable: true },
  { key: 'toDate', label: 'To Date', sortable: true },
  { key: 'none', label: 'None', sortable: true },
  { key: 'new', label: 'New', sortable: true },
  { key: 'connected', label: 'Connected', sortable: true },
  { key: 'interested', label: 'Interested', sortable: true },
  { key: 'registered', label: 'Registered', sortable: true },
  { key: 'notInterested', label: 'Not Interested', sortable: true },
  { key: 'justEnquiry', label: 'Just Enquiry', sortable: true },
  { key: 'plusOne', label: 'Plus One', sortable: true },
  { key: 'detailsShared', label: 'Details Shared', sortable: true },
  { key: 'plusTwoCall', label: 'Plus Two Call', sortable: true },
  { key: 'neetAfter', label: 'NEET After', sortable: true },
  { key: 'seminarInt', label: 'Seminar Int', sortable: true },
  { key: 'nursingPg', label: 'Nursing PG', sortable: true },
  { key: 'fridayWeb', label: 'Friday Web', sortable: true },
  { key: 'plusTwo2027', label: 'Plus Two 2027', sortable: true },
  { key: 'mbbs', label: 'MBBS Doing', sortable: true },
  { key: 'webinarGform', label: 'Web GForm', sortable: true },
  { key: 'webinarAtt', label: 'Web Attended', sortable: true },
  { key: 'junkForm', label: 'Junk Form', sortable: true },
  { key: 'junkHindi', label: 'Junk Hindi', sortable: true },
  { key: 'webinarFollow', label: 'Web Follow', sortable: true },
  { key: 'webinarLost', label: 'Web Lost', sortable: true },
  { key: 'dnd', label: 'DND', sortable: true },
  { key: 'later', label: 'Later', sortable: true },
  { key: 'empty', label: 'Empty Status', sortable: true },
  { key: 'total', label: 'Total Leads', sortable: true },
];

// LeadStatusWise
export interface StatusRow {
  id: number;
  agentName: string;
  initials: string;
  total: number;
  new: number;
  connected: number;
  interested: number;
  registered: number;
  notInterested: number;
  justEnquiry: number;
  detailsShared: number;
  webinarAttended: number;
  lost: number;
  dnd: number;
  later: number;
  [key: string]: string | number;
}

export const statusWiseData: StatusRow[] = [
  { id: 1, agentName: 'John Doe', initials: 'JD', total: 156, new: 25, connected: 45, interested: 32, registered: 18, notInterested: 12, justEnquiry: 8, detailsShared: 22, webinarAttended: 5, lost: 8, dnd: 3, later: 4 },
  { id: 2, agentName: 'Jane Smith', initials: 'JS', total: 142, new: 18, connected: 38, interested: 28, registered: 15, notInterested: 10, justEnquiry: 6, detailsShared: 18, webinarAttended: 4, lost: 6, dnd: 2, later: 3 },
  { id: 3, agentName: 'Mike Johnson', initials: 'MJ', total: 198, new: 35, connected: 52, interested: 42, registered: 25, notInterested: 15, justEnquiry: 12, detailsShared: 28, webinarAttended: 8, lost: 12, dnd: 4, later: 5 },
  { id: 4, agentName: 'Sarah Williams', initials: 'SW', total: 124, new: 20, connected: 35, interested: 25, registered: 14, notInterested: 8, justEnquiry: 5, detailsShared: 15, webinarAttended: 3, lost: 5, dnd: 2, later: 2 },
  { id: 5, agentName: 'Rahul Sharma', initials: 'RS', total: 167, new: 28, connected: 48, interested: 35, registered: 20, notInterested: 14, justEnquiry: 9, detailsShared: 20, webinarAttended: 6, lost: 9, dnd: 3, later: 4 },
  { id: 6, agentName: 'Priya Patel', initials: 'PP', total: 145, new: 22, connected: 40, interested: 30, registered: 17, notInterested: 11, justEnquiry: 7, detailsShared: 19, webinarAttended: 4, lost: 7, dnd: 2, later: 3 },
  { id: 7, agentName: 'Amit Kumar', initials: 'AK', total: 189, new: 32, connected: 50, interested: 38, registered: 22, notInterested: 13, justEnquiry: 11, detailsShared: 25, webinarAttended: 7, lost: 11, dnd: 4, later: 4 },
  { id: 8, agentName: 'Sneha Reddy', initials: 'SR', total: 132, new: 19, connected: 36, interested: 26, registered: 15, notInterested: 9, justEnquiry: 6, detailsShared: 16, webinarAttended: 4, lost: 6, dnd: 2, later: 3 },
  { id: 9, agentName: 'Vikram Singh', initials: 'VS', total: 156, new: 24, connected: 42, interested: 31, registered: 18, notInterested: 12, justEnquiry: 8, detailsShared: 18, webinarAttended: 5, lost: 8, dnd: 3, later: 3 },
  { id: 10, agentName: 'Ananya Gupta', initials: 'AG', total: 178, new: 30, connected: 48, interested: 36, registered: 21, notInterested: 13, justEnquiry: 10, detailsShared: 23, webinarAttended: 6, lost: 10, dnd: 3, later: 4 },
];

export const statusWiseStatsCards: StatsCard[] = [
  { key: 'total', label: 'Total Leads', value: 1587, icon: Users, color: 'var(--info)', change: '+12%' },
  { key: 'interested', label: 'Interested Leads', value: 323, icon: UserCheck, color: 'var(--success)', change: '+8%' },
  { key: 'registered', label: 'Registered Leads', value: 185, icon: UserPlus, color: 'var(--category-purple-text)', change: '+15%' },
  { key: 'notInterested', label: 'Not Interested', value: 117, icon: UserMinus, color: 'var(--danger)', change: '-5%' },
];

export const statusWiseColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'agentName', label: 'Agent Name', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'new', label: 'New', sortable: true },
  { key: 'connected', label: 'Connected', sortable: true },
  { key: 'interested', label: 'Interested', sortable: true },
  { key: 'registered', label: 'Registered', sortable: true },
  { key: 'notInterested', label: 'Not Interested', sortable: true },
  { key: 'justEnquiry', label: 'Just Enquiry', sortable: true },
  { key: 'detailsShared', label: 'Details Shared', sortable: true },
  { key: 'webinarAttended', label: 'Webinar', sortable: true },
  { key: 'lost', label: 'Lost', sortable: true },
  { key: 'dnd', label: 'DND', sortable: true },
  { key: 'later', label: 'Later', sortable: true },
];

// LeadStatusChange
export interface StatusChangeRow {
  id: number;
  agentName: string;
  total: number;
  [key: string]: string | number;
}

export const statusChangeData: StatusChangeRow[] = [
  { id: 1, agentName: 'John Doe', total: 45 },
  { id: 2, agentName: 'Jane Smith', total: 38 },
  { id: 3, agentName: 'Mike Johnson', total: 52 },
  { id: 4, agentName: 'Sarah Williams', total: 28 },
  { id: 5, agentName: 'Rahul Sharma', total: 35 },
  { id: 6, agentName: 'Priya Patel', total: 22 },
  { id: 7, agentName: 'Amit Kumar', total: 41 },
  { id: 8, agentName: 'Sneha Reddy', total: 18 },
  { id: 9, agentName: 'Vikram Singh', total: 29 },
];

export const statusChangeStatusOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'new', label: 'New' },
  { value: 'connected', label: 'Connected' },
  { value: 'interested', label: 'Interested' },
  { value: 'registered', label: 'Registered' },
  { value: 'notInterested', label: 'Not Interested' },
  { value: 'justEnquiry', label: 'Just Enquiry - try after few days' },
  { value: 'detailsShared', label: 'Details Shared' },
  { value: 'webinar', label: 'Webinar Attended' },
  { value: 'junkLead', label: 'Junk Lead' },
  { value: 'dnd', label: 'DND - NA/ Off/ Invalid' },
  { value: 'later', label: 'Later Admission' },
];

export const statusChangeStaffOptions: Option[] = [
  { value: '', label: 'Select Staff' },
  { value: 'all', label: 'All' },
  { value: '7774', label: 'Dr Expert Edulinks' },
  { value: '7775', label: 'Fida Fathima' },
  { value: '7776', label: 'Nandana K' },
  { value: '7777', label: 'Rameesa' },
  { value: '7778', label: 'Aysha' },
  { value: '7779', label: 'Nesri' },
  { value: '7789', label: 'Dilshana' },
  { value: '8473', label: 'Rahmath' },
  { value: '8640', label: 'Lana' },
];

export const statusChangeSourceOptions: Option[] = [
  { value: '', label: 'Select Enquiry Source' },
  { value: 'empty', label: 'Empty Source' },
  { value: '21143', label: 'Incoming Call / whatsapp' },
  { value: '21144', label: 'Meta Campaign' },
  { value: '21153', label: 'From Doctor' },
  { value: '21714', label: 'Website' },
  { value: '21767', label: 'Meta' },
  { value: '24424', label: 'Uzbekistan | Common | Kerala' },
  { value: '24425', label: 'Uzbekistan | Common | GCC' },
];

export const statusChangeColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'agentName', label: 'Agent Name', sortable: true },
  { key: 'total', label: 'Total', sortable: true },
];

// LeadCheckoutSummary
export interface CheckoutRow {
  id: number;
  shop: string;
  agent: string;
  note: string;
  date: string;
  [key: string]: string | number;
}

export const checkoutData: CheckoutRow[] = [
  { id: 1, shop: 'Shop A', agent: 'John Doe', note: 'Checkout completed', date: '2024-01-25' },
  { id: 2, shop: 'Shop B', agent: 'Jane Smith', note: 'All tasks finished', date: '2024-01-25' },
  { id: 3, shop: 'Shop A', agent: 'Mike Johnson', note: 'Pending work tomorrow', date: '2024-01-24' },
  { id: 4, shop: 'Shop C', agent: 'Sarah Williams', note: 'Early checkout', date: '2024-01-24' },
  { id: 5, shop: 'Shop B', agent: 'John Doe', note: 'Completed', date: '2024-01-23' },
  { id: 6, shop: 'Shop A', agent: 'Priya Patel', note: 'Done', date: '2024-01-23' },
  { id: 7, shop: 'Shop C', agent: 'Amit Kumar', note: 'Work in progress', date: '2024-01-22' },
  { id: 8, shop: 'Shop B', agent: 'Sneha Reddy', note: 'Finished', date: '2024-01-22' },
  { id: 9, shop: 'Shop A', agent: 'Vikram Singh', note: 'All done', date: '2024-01-21' },
  { id: 10, shop: 'Shop C', agent: 'Ananya Gupta', note: 'Checkout', date: '2024-01-21' },
];

export const checkoutStaffOptions: Option[] = [
  { value: '', label: 'Select Staff' },
  { value: 'all', label: 'All Staff' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
  { value: 'sarah', label: 'Sarah Williams' },
];

export const checkoutColumns: Column[] = [
  { key: 'checkbox', label: '' },
  { key: 'action', label: 'Action' },
  { key: 'shop', label: 'Shop', sortable: true },
  { key: 'agent', label: 'Agent', sortable: true },
  { key: 'note', label: 'Note', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
];
