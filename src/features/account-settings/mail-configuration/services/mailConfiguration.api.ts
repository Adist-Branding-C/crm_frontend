import { ApiResponse } from '../../../../shared/types/common';
import type { MailConfigFormData, MailConfigItem } from '../types';

export class MailConfigurationApiService {
  async createMailConfig(data: MailConfigFormData): Promise<ApiResponse<MailConfigItem>> {
    return {
      status: true,
      message: 'Mail configuration saved successfully',
    };
  }

  async updateMailConfig(id: number, data: MailConfigFormData): Promise<ApiResponse<MailConfigItem>> {
    return {
      status: true,
      message: 'Mail configuration updated successfully',
    };
  }

  async deleteMailConfig(id: number): Promise<ApiResponse<null>> {
    return {
      status: true,
      message: 'Mail configuration deleted successfully',
    };
  }
}
