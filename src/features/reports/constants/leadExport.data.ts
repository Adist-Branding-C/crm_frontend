import type { LabelValuePair } from '../../../shared/types/common';

export type Option = LabelValuePair;

export interface FieldOption {
  key: string;
  label: string;
}

export const sourceOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social', label: 'Social Media' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'call', label: 'Incoming Call' },
];

export const purposeOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'demo', label: 'Demo' },
  { value: 'enquiry', label: 'Enquiry' },
];

export const statusOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'new', label: 'New' },
  { value: 'connected', label: 'Connected' },
  { value: 'interested', label: 'Interested' },
  { value: 'registered', label: 'Registered' },
  { value: 'notInterested', label: 'Not Interested' },
];

export const createdByOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
];

export const assignedToOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
];

export const leadTypeOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'hot', label: 'Hot Lead' },
  { value: 'warm', label: 'Warm Lead' },
  { value: 'cold', label: 'Cold Lead' },
];

export const campaignOptions: Option[] = [
  { value: '', label: 'Select' },
  { value: 'campaign1', label: 'Campaign 1' },
  { value: 'campaign2', label: 'Campaign 2' },
];

export const sortOptions: Option[] = [
  { value: 'createdDate', label: 'Created Date' },
  { value: 'updatedDate', label: 'Updated Date' },
  { value: 'nameAZ', label: 'Name A-Z' },
  { value: 'nameZA', label: 'Name Z-A' },
];

export const fieldOptions: FieldOption[] = [
  { key: 'name', label: 'Name' },
  { key: 'companyName', label: 'Company Name' },
  { key: 'type', label: 'Type' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'assignedDate', label: 'Assigned Date' },
  { key: 'mobileNo', label: 'Mobile No' },
  { key: 'countryCode', label: 'Country Code' },
  { key: 'purpose', label: 'Purpose' },
  { key: 'status', label: 'Status' },
  { key: 'dateTime', label: 'Date & Time' },
  { key: 'mobileWithCountry', label: 'Mobile No with Country Code' },
  { key: 'address', label: 'Address' },
  { key: 'location', label: 'Location' },
  { key: 'updatedDateTime', label: 'Updated Date & Time' },
  { key: 'emailId', label: 'Email Id' },
  { key: 'campaign', label: 'Campaign' },
  { key: 'remarks', label: 'Remarks' },
  { key: 'source', label: 'Source' },
  { key: 'staffName', label: 'Staff Name' },
  { key: 'date', label: 'Date' },
];
