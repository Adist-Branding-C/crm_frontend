import type { Company } from '../types';

export const COMPANY_PLAN_OPTIONS = [
  { value: 'Enterprise', label: 'Enterprise' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Basic', label: 'Basic' },
];

import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';

export const COMPANY_STATUS_OPTIONS = [
  { value: CompanyStatus.ACTIVE, label: 'Active' },
  { value: CompanyStatus.EXPIRED, label: 'Expired' },
];

export const SAMPLE_COMPANIES: Company[] = [
  { id: 1, name: 'TechCorp Solutions', email: 'admin@techcorp.com', phone: '+1 234 567 8900', plan: 'Enterprise', staffCount: 25, leads: 1250, deals: 45, revenue: 125000, status: 'active', createdAt: '2024-01-15', expiryDate: '2025-01-15', plansHistory: [
    { plan: 'Basic', startDate: '2023-01-15', endDate: '2023-07-15', price: 500 },
    { plan: 'Professional', startDate: '2023-07-15', endDate: '2024-01-15', price: 1500 },
    { plan: 'Enterprise', startDate: '2024-01-15', endDate: '2025-01-15', price: 5000 }
  ]},
  { id: 2, name: 'StartupXYZ Inc', email: 'hello@startupxyz.com', phone: '+1 234 567 8901', plan: 'Professional', staffCount: 12, leads: 450, deals: 18, revenue: 45000, status: 'active', createdAt: '2024-03-20', expiryDate: '2025-03-20', plansHistory: [
    { plan: 'Basic', startDate: '2024-03-20', endDate: '2024-06-20', price: 500 },
    { plan: 'Professional', startDate: '2024-06-20', endDate: '2025-03-20', price: 1500 }
  ]},
  { id: 3, name: 'GlobalTech Systems', email: 'info@globaltech.com', phone: '+1 234 567 8902', plan: 'Enterprise', staffCount: 45, leads: 2800, deals: 95, revenue: 320000, status: 'active', createdAt: '2023-08-10', expiryDate: '2024-08-10', plansHistory: [
    { plan: 'Professional', startDate: '2022-08-10', endDate: '2023-08-10', price: 1500 },
    { plan: 'Enterprise', startDate: '2023-08-10', endDate: '2024-08-10', price: 5000 }
  ]},
  { id: 4, name: 'SmallBiz Solutions', email: 'contact@smallbiz.com', phone: '+1 234 567 8903', plan: 'Basic', staffCount: 5, leads: 120, deals: 8, revenue: 18000, status: 'active', createdAt: '2024-05-01', expiryDate: '2025-05-01', plansHistory: [
    { plan: 'Basic', startDate: '2024-05-01', endDate: '2025-05-01', price: 500 }
  ]},
  { id: 5, name: 'MegaCorp Industries', email: 'admin@megacorp.com', phone: '+1 234 567 8904', plan: 'Enterprise', staffCount: 80, leads: 5200, deals: 180, revenue: 650000, status: 'active', createdAt: '2023-02-28', expiryDate: '2024-02-28', plansHistory: [
    { plan: 'Professional', startDate: '2022-02-28', endDate: '2023-02-28', price: 1500 },
    { plan: 'Enterprise', startDate: '2023-02-28', endDate: '2024-02-28', price: 5000 }
  ]},
  { id: 6, name: 'AdAgency Pro', email: 'team@adagency.com', phone: '+1 234 567 8905', plan: 'Professional', staffCount: 18, leads: 680, deals: 32, revenue: 78000, status: 'expired', createdAt: '2023-06-15', expiryDate: '2024-06-15', plansHistory: [
    { plan: 'Professional', startDate: '2023-06-15', endDate: '2024-06-15', price: 1500 }
  ]},
  { id: 7, name: 'ShopMart Retail', email: 'admin@shopmart.com', phone: '+1 234 567 8906', plan: 'Basic', staffCount: 8, leads: 350, deals: 15, revenue: 28000, status: 'active', createdAt: '2024-02-10', expiryDate: '2025-02-10', plansHistory: [
    { plan: 'Basic', startDate: '2024-02-10', endDate: '2025-02-10', price: 500 }
  ]},
  { id: 8, name: 'DataFlow Analytics', email: 'hello@dataflow.com', phone: '+1 234 567 8907', plan: 'Professional', staffCount: 22, leads: 920, deals: 42, revenue: 145000, status: 'active', createdAt: '2023-11-05', expiryDate: '2024-11-05', plansHistory: [
    { plan: 'Basic', startDate: '2023-05-05', endDate: '2023-11-05', price: 500 },
    { plan: 'Professional', startDate: '2023-11-05', endDate: '2024-11-05', price: 1500 }
  ]},
  { id: 9, name: 'SecureNet Solutions', email: 'admin@securenet.com', phone: '+1 234 567 8908', plan: 'Enterprise', staffCount: 35, leads: 1850, deals: 78, revenue: 280000, status: 'active', createdAt: '2023-09-20', expiryDate: '2024-09-20', plansHistory: [
    { plan: 'Basic', startDate: '2023-03-20', endDate: '2023-09-20', price: 500 },
    { plan: 'Professional', startDate: '2023-09-20', endDate: '2024-03-20', price: 1500 },
    { plan: 'Enterprise', startDate: '2024-03-20', endDate: '2024-09-20', price: 5000 }
  ]},
  { id: 10, name: 'CloudTech Services', email: 'info@cloudtech.com', phone: '+1 234 567 8909', plan: 'Professional', staffCount: 15, leads: 580, deals: 25, revenue: 62000, status: 'active', createdAt: '2024-01-25', expiryDate: '2025-01-25', plansHistory: [
    { plan: 'Professional', startDate: '2024-01-25', endDate: '2025-01-25', price: 1500 }
  ]},
];
