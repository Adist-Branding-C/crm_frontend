import React, { useState } from 'react';
import { 
  Download, Filter, Search, ChevronDown, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Enquiries.css';

const sourceOptions = [
  { value: '', label: 'Select' },
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social', label: 'Social Media' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'call', label: 'Incoming Call' },
];

const purposeOptions = [
  { value: '', label: 'Select' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
  { value: 'demo', label: 'Demo' },
  { value: 'enquiry', label: 'Enquiry' },
];

const statusOptions = [
  { value: '', label: 'Select' },
  { value: 'new', label: 'New' },
  { value: 'connected', label: 'Connected' },
  { value: 'interested', label: 'Interested' },
  { value: 'registered', label: 'Registered' },
  { value: 'notInterested', label: 'Not Interested' },
];

const createdByOptions = [
  { value: '', label: 'Select' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
];

const assignedToOptions = [
  { value: '', label: 'Select' },
  { value: 'john', label: 'John Doe' },
  { value: 'jane', label: 'Jane Smith' },
  { value: 'mike', label: 'Mike Johnson' },
];

const leadTypeOptions = [
  { value: '', label: 'Select' },
  { value: 'hot', label: 'Hot Lead' },
  { value: 'warm', label: 'Warm Lead' },
  { value: 'cold', label: 'Cold Lead' },
];

const campaignOptions = [
  { value: '', label: 'Select' },
  { value: 'campaign1', label: 'Campaign 1' },
  { value: 'campaign2', label: 'Campaign 2' },
];

const sortOptions = [
  { value: 'createdDate', label: 'Created Date' },
  { value: 'updatedDate', label: 'Updated Date' },
  { value: 'nameAZ', label: 'Name A-Z' },
  { value: 'nameZA', label: 'Name Z-A' },
];

const fieldOptions = [
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

const LeadExport = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    createdAt: { from: '', to: '' },
    updatedAt: { from: '', to: '' },
    assignedAt: { from: '', to: '' },
    enquirySource: '',
    enquiryPurpose: '',
    enquiryStatus: '',
    createdBy: '',
    assignedTo: '',
    leadType: '',
    campaign: '',
    did: '',
    location: '',
    remarks: '',
    dateRange: '',
    sortBy: 'createdDate',
    fileName: ''
  });
  const [selectedFields, setSelectedFields] = useState(['name', 'mobileNo', 'purpose', 'status', 'date']);

  const handleFieldToggle = (fieldKey) => {
    setSelectedFields(prev => 
      prev.includes(fieldKey) 
        ? prev.filter(f => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedFields(fieldOptions.map(f => f.key));
    } else {
      setSelectedFields([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Export request submitted successfully");
  };

  return (
    <div className="enquiries-page">
      <form onSubmit={handleSubmit}>
        <div className="export-form-card">
          <div className="form-section">
            <h3 className="section-title">Date Filters</h3>
            
            <div className="filter-row">
              <div className="filter-group">
                <label>Created At</label>
                <div className="date-range-input">
                  <input type="date" value={filters.createdAt.from} onChange={(e) => setFilters({ ...filters, createdAt: { ...filters.createdAt, from: e.target.value } })} />
                  <span>to</span>
                  <input type="date" value={filters.createdAt.to} onChange={(e) => setFilters({ ...filters, createdAt: { ...filters.createdAt, to: e.target.value } })} />
                </div>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Updated At</label>
                <div className="date-range-input">
                  <input type="date" value={filters.updatedAt.from} onChange={(e) => setFilters({ ...filters, updatedAt: { ...filters.updatedAt, from: e.target.value } })} />
                  <span>to</span>
                  <input type="date" value={filters.updatedAt.to} onChange={(e) => setFilters({ ...filters, updatedAt: { ...filters.updatedAt, to: e.target.value } })} />
                </div>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Assigned At</label>
                <div className="date-range-input">
                  <input type="date" value={filters.assignedAt.from} onChange={(e) => setFilters({ ...filters, assignedAt: { ...filters.assignedAt, from: e.target.value } })} />
                  <span>to</span>
                  <input type="date" value={filters.assignedAt.to} onChange={(e) => setFilters({ ...filters, assignedAt: { ...filters.assignedAt, to: e.target.value } })} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Lead Filters</h3>
            
            <div className="filter-row">
              <div className="filter-group">
                <label>Enquiry Source</label>
                <select value={filters.enquirySource} onChange={(e) => setFilters({ ...filters, enquirySource: e.target.value })}>
                  {sourceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Enquiry Purpose</label>
                <select value={filters.enquiryPurpose} onChange={(e) => setFilters({ ...filters, enquiryPurpose: e.target.value })}>
                  {purposeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Enquiry Status</label>
                <select value={filters.enquiryStatus} onChange={(e) => setFilters({ ...filters, enquiryStatus: e.target.value })}>
                  {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Created By</label>
                <select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}>
                  {createdByOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Assigned To</label>
                <select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
                  {assignedToOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Lead Type</label>
                <select value={filters.leadType} onChange={(e) => setFilters({ ...filters, leadType: e.target.value })}>
                  {leadTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Campaign</label>
                <select value={filters.campaign} onChange={(e) => setFilters({ ...filters, campaign: e.target.value })}>
                  {campaignOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>DID</label>
                <input type="text" placeholder="Enter DID" value={filters.did} onChange={(e) => setFilters({ ...filters, did: e.target.value })} />
              </div>
              <div className="filter-group">
                <label>Location</label>
                <input type="text" placeholder="Enter location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Remarks</label>
                <input type="text" placeholder="Enter remarks" value={filters.remarks} onChange={(e) => setFilters({ ...filters, remarks: e.target.value })} />
              </div>
              <div className="filter-group">
                <label>Date Range</label>
                <input type="date" value={filters.dateRange} onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Sort By</h3>
            <div className="filter-row">
              <div className="filter-group">
                <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
                  {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Export File Name</h3>
            <div className="filter-row">
              <div className="filter-group">
                <input 
                  type="text" 
                  placeholder="Enter file name" 
                  value={filters.fileName} 
                  onChange={(e) => setFilters({ ...filters, fileName: e.target.value })}
                  className="file-name-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Fields</h3>
            <div className="fields-selection">
              <div className="field-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedFields.length === fieldOptions.length}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              </div>
              <div className="fields-grid">
                {fieldOptions.map(field => (
                  <div key={field.key} className="field-checkbox">
                    <label>
                      <input 
                        type="checkbox"
                        checked={selectedFields.includes(field.key)}
                        onChange={() => handleFieldToggle(field.key)}
                      />
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary submit-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeadExport;