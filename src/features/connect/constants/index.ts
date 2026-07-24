import type { ConnectOption } from '../types';

export const connectOptions: ConnectOption[] = [
  {
    id: 'lead-api',
    name: 'Lead Generation API',
    subtitle: 'Configure developer API',
    category: 'Developer Tools',
    description: 'The Leadist API enables developers to configure and integrate seamlessly, automating processes and optimizing lead management.',
    configFields: ['apiKey', 'endpoint', 'webhook'],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    subtitle: 'Social media platform',
    category: 'Social Media',
    description: 'Connect Facebook to capture leads directly from your Facebook ads and pages, streamlining lead management and communication.',
    configFields: ['appId', 'appSecret', 'webhookUrl'],
    hasViewLeads: true,
  },
  {
    id: 'webhook',
    name: 'Webhook',
    subtitle: 'Receive leads automatically',
    category: 'Automation',
    description: 'Connect a webhook to automatically receive leads from any external source directly into Leadist as they come in.',
    configFields: ['webhookUrl', 'secretKey'],
  },
];
