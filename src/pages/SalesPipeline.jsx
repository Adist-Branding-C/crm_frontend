import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreHorizontal, Search, Filter, ChevronRight, ChevronDown, DollarSign, Calendar, User, Phone, Mail, GripVertical, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import AddDealDrawer from '../components/AddDealDrawer';
import './SalesPipeline.css';

const salesAgents = [
  { id: 1, name: 'All Agents' },
  { id: 2, name: 'John Doe' },
  { id: 3, name: 'Jane Smith' },
  { id: 4, name: 'Mike Johnson' },
  { id: 5, name: 'Emily Brown' },
];

const dealTypes = [
  { id: 1, name: 'All Types' },
  { id: 2, name: 'New Business' },
  { id: 3, name: 'Renewal' },
  { id: 4, name: 'Expansion' },
  { id: 5, name: 'Upsell' },
];

const pipelineStages = [
  { id: 1, name: 'New Lead', color: '#6366f1' },
  { id: 2, name: 'Qualified', color: '#8b5cf6' },
  { id: 3, name: 'Meeting Scheduled', color: '#06b6d4' },
  { id: 4, name: 'Proposal Sent', color: '#f59e0b' },
  { id: 5, name: 'Negotiation', color: '#f97316' },
  { id: 6, name: 'Closed Won', color: '#10b981' },
  { id: 7, name: 'Closed Lost', color: '#ef4444' },
];

const sampleDeals = [
  { id: 1, title: 'TechCorp Enterprise Deal', value: 45000, stage: 1, contact: 'John Doe', company: 'TechCorp', probability: 20, nextAction: 'Follow up call', dueDate: '2025-05-15' },
  { id: 2, title: 'Startup Growth Package', value: 12000, stage: 2, contact: 'Sarah Smith', company: 'StartupXYZ', probability: 40, nextAction: 'Send proposal', dueDate: '2025-05-18' },
  { id: 3, title: 'Annual Contract Renewal', value: 28000, stage: 3, contact: 'Mike Johnson', company: 'GlobalTech', probability: 60, nextAction: 'Demo meeting', dueDate: '2025-05-20' },
  { id: 4, title: 'Enterprise License', value: 95000, stage: 4, contact: 'Emily Brown', company: 'MegaCorp', probability: 70, nextAction: 'Review terms', dueDate: '2025-05-22' },
  { id: 5, title: 'SMB Package Deal', value: 8500, stage: 5, contact: 'David Lee', company: 'SmallBiz Inc', probability: 85, nextAction: 'Contract review', dueDate: '2025-05-25' },
  { id: 6, title: 'Consulting Services', value: 15000, stage: 6, contact: 'Lisa Anderson', company: 'ConsultPro', probability: 100, nextAction: 'Sign contract', dueDate: '2025-05-10' },
  { id: 7, title: 'Marketing Agency Deal', value: 6500, stage: 7, contact: 'James Wilson', company: 'AdAgency', probability: 0, nextAction: 'Lost - Budget', dueDate: '2025-04-28' },
  { id: 8, title: 'Retail POS System', value: 22000, stage: 1, contact: 'Amanda Lee', company: 'ShopMart', probability: 15, nextAction: 'Initial call', dueDate: '2025-05-16' },
  { id: 9, title: 'Cloud Migration', value: 35000, stage: 2, contact: 'Chris Taylor', company: 'DataFlow', probability: 35, nextAction: 'Discovery call', dueDate: '2025-05-19' },
  { id: 10, title: 'Security Software', value: 18000, stage: 4, contact: 'Rachel Kim', company: 'SecureNet', probability: 65, nextAction: 'Send quote', dueDate: '2025-05-21' },
];

export default function SalesPipeline() {
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(1);
  const [selectedType, setSelectedType] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deals, setDeals] = useState(sampleDeals);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowDateFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedAgent(1);
    setSelectedType(1);
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = searchQuery === '' || 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDate = true;
    if (dateFrom && dateTo) {
      matchesDate = deal.dueDate >= dateFrom && deal.dueDate <= dateTo;
    } else if (dateFrom) {
      matchesDate = deal.dueDate >= dateFrom;
    } else if (dateTo) {
      matchesDate = deal.dueDate <= dateTo;
    }
    
    const matchesAgent = selectedAgent === 1 || deal.contact === salesAgents.find(a => a.id === selectedAgent)?.name;
    
    return matchesSearch && matchesDate && matchesAgent;
  });

  const getDealsForStage = (stageId) => {
    return filteredDeals.filter(deal => deal.stage === stageId);
  };

  const getStageTotal = (stageId) => {
    const stageDeals = getDealsForStage(stageId);
    return stageDeals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    if (draggedDeal) {
      setDeals(prevDeals => 
        prevDeals.map(deal => 
          deal.id === draggedDeal.id 
            ? { ...deal, stage: stageId }
            : deal
        )
      );
      setDraggedDeal(null);
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return React.createElement(PageContainer, null,
    React.createElement(PageHeader, { 
      title: 'Sales Pipeline',
      description: 'Manage deals through your sales pipeline stages'
    }),
    
    React.createElement('div', { className: 'pipeline-toolbar' },
      React.createElement('div', { className: 'pipeline-left' },
        React.createElement('div', { className: 'pipeline-search' },
          React.createElement(Search, { size: 18, className: 'search-icon' }),
          React.createElement('input', {
            type: 'text',
            placeholder: 'Search deals...',
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: 'search-input'
          })
        ),
        React.createElement('div', { className: 'date-filter-wrapper', ref: filterRef },
          React.createElement('button', { 
            className: `btn-filter ${showDateFilter ? 'active' : ''}`,
            onClick: () => setShowDateFilter(!showDateFilter)
          },
            React.createElement(Filter, { size: 18 }),
            'Filter',
            showDateFilter ? React.createElement(ChevronDown, { size: 16 }) : React.createElement(ChevronRight, { size: 16 })
          ),
          showDateFilter && React.createElement('div', { className: 'date-filter-dropdown' },
            React.createElement('div', { className: 'date-filter-header' },
              React.createElement('span', null, 'Filters'),
              React.createElement('button', { className: 'clear-filter', onClick: (e) => { e.stopPropagation(); clearFilters(); setShowDateFilter(false); } },
                React.createElement(X, { size: 14 })
              )
            ),
            React.createElement('div', { className: 'date-filter-inputs' },
              React.createElement('div', { className: 'date-input-group' },
                React.createElement('label', null, 'Sales Agent'),
                React.createElement('select', {
                  value: selectedAgent,
                  onChange: (e) => setSelectedAgent(parseInt(e.target.value)),
                  className: 'date-input'
                },
                  salesAgents.map(agent => 
                    React.createElement('option', { key: agent.id, value: agent.id }, agent.name)
                  )
                )
              ),
              React.createElement('div', { className: 'date-input-group' },
                React.createElement('label', null, 'Deal Type'),
                React.createElement('select', {
                  value: selectedType,
                  onChange: (e) => setSelectedType(parseInt(e.target.value)),
                  className: 'date-input'
                },
                  dealTypes.map(type => 
                    React.createElement('option', { key: type.id, value: type.id }, type.name)
                  )
                )
              ),
              React.createElement('div', { className: 'date-input-group' },
                React.createElement('label', null, 'From Date'),
                React.createElement('input', {
                  type: 'date',
                  value: dateFrom,
                  onChange: (e) => setDateFrom(e.target.value),
                  className: 'date-input'
                })
              ),
              React.createElement('div', { className: 'date-input-group' },
                React.createElement('label', null, 'To Date'),
                React.createElement('input', {
                  type: 'date',
                  value: dateTo,
                  onChange: (e) => setDateTo(e.target.value),
                  className: 'date-input'
                })
              )
            )
          )
        )
      ),
      React.createElement('div', { className: 'pipeline-actions' },
        React.createElement('button', { className: 'btn-primary', onClick: () => setIsDrawerOpen(true) },
          React.createElement(Plus, { size: 18 }),
          'Add Deal'
        )
      )
    ),
    
    React.createElement('div', { className: 'pipeline-board' },
      pipelineStages.map(stage => 
        React.createElement('div', { 
          className: 'pipeline-column',
          onDragOver: handleDragOver,
          onDrop: (e) => handleDrop(e, stage.id)
        },
          React.createElement('div', { className: 'column-header', style: { borderTopColor: stage.color } },
            React.createElement('div', { className: 'column-title' },
              React.createElement('span', { className: 'column-name' }, stage.name),
              React.createElement('span', { className: 'column-count' }, getDealsForStage(stage.id).length)
            ),
            React.createElement('span', { className: 'column-value' }, '$' + getStageTotal(stage.id).toLocaleString())
          ),
          React.createElement('div', { className: 'column-cards' },
            getDealsForStage(stage.id).map(deal =>
              React.createElement('div', { 
                key: deal.id,
                className: 'deal-card',
                draggable: true,
                onDragStart: (e) => handleDragStart(e, deal)
              },
                React.createElement('div', { className: 'deal-header' },
                  React.createElement('span', { className: 'deal-company' }, deal.company),
                  React.createElement(MoreHorizontal, { size: 16, className: 'deal-menu' })
                ),
                React.createElement('div', { className: 'deal-title' }, deal.title),
                React.createElement('div', { className: 'deal-value' }, 
                  React.createElement(DollarSign, { size: 14 }),
                  deal.value.toLocaleString()
                ),
                React.createElement('div', { className: 'deal-footer' },
                  React.createElement('div', { className: 'deal-contact' },
                    React.createElement('div', { 
                      className: 'contact-avatar',
                      style: { background: getAvatarColor(deal.contact) }
                    }, deal.contact.charAt(0)),
                    React.createElement('span', null, deal.contact)
                  ),
                  React.createElement('div', { className: 'deal-probability', style: { color: deal.probability === 100 ? '#10b981' : deal.probability === 0 ? '#ef4444' : '#6b7280' } }, deal.probability + '%')
                ),
                React.createElement('div', { className: 'deal-due' },
                  React.createElement(Calendar, { size: 12 }),
                  React.createElement('span', null, deal.dueDate)
                ),
                )
              )
            )
          )
        )
      ),
    React.createElement(AddDealDrawer, { isOpen: isDrawerOpen, onClose: () => setIsDrawerOpen(false) })
  );
}