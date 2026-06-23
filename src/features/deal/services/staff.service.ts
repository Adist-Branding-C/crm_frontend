import axiosInstance from '../../../api/axiosInstance';

class StaffService {
  async getStaff() {
    const response = await axiosInstance.get('/staff');
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const staffService = new StaffService();
