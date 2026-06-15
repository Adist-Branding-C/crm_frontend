import type { Campaign } from '../types/campaign.types';

export function generateCampaignCsv(campaigns: Campaign[]): void {
  const headers = ['Sl No', 'Name', 'Type', 'Total Tasks', 'Completed Tasks', 'Completed %', 'Created By', 'Created At'];
  const rows = campaigns.map(c =>
    [c.slNo, `"${c.name}"`, c.type, c.totalTasks, c.completedTasks, c.completedPercent + '%', c.createdBy, c.createdAt].join(',')
  );
  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'campaigns.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}
