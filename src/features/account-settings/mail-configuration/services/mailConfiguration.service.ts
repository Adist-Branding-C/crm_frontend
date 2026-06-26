import type { MailConfigFormData, MailConfigResponse } from '../types/mailConfiguration.types';

class MailConfigurationService {
  async createMailConfig(data: MailConfigFormData): Promise<MailConfigResponse> {
    return {
      status: true,
      message: 'Mail configuration saved successfully',
      data: data,
    };
  }

  async updateMailConfig(id: number, data: MailConfigFormData): Promise<MailConfigResponse> {
    return {
      status: true,
      message: 'Mail configuration updated successfully',
      data: data,
    };
  }

  async deleteMailConfig(id: number): Promise<{ status: boolean; message: string }> {
    return {
      status: true,
      message: 'Mail configuration deleted successfully',
    };
  }
}

export const mailConfigurationService = new MailConfigurationService();
