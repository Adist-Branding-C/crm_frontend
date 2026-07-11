import axiosInstance from '../../../../api/axiosInstance';
import { TASK_API } from '../constants/taskApiEndpoints';
export const taskService = {
    getTaskCategories() {
        return axiosInstance.get(TASK_API.CATEGORY, { params: { pageNumber: 1, limit: 10 } }).then(r => r.data);
    },
    getLeads() {
        return axiosInstance.get(TASK_API.LEAD, { params: { pageNumber: 1, limit: 100 } }).then(r => r.data);
    },
    getStaff() {
        return axiosInstance.get(TASK_API.STAFF, { params: { pageNumber: 1, limit: 100 } }).then(r => r.data);
    },
    getTasks(params) {
        return axiosInstance.get(TASK_API.BASE, { params: { pageNumber: 1, limit: 100, ...params } }).then(r => r.data);
    },
    createTask(data) {
        return axiosInstance.post(TASK_API.BASE, data).then(r => r.data);
    },
    updateTask(id, data) {
        return axiosInstance.patch(`${TASK_API.BASE}/${id}`, data).then(r => r.data);
    },
    deleteTask(id) {
        return axiosInstance.delete(`${TASK_API.BASE}/${id}`).then(r => r.data);
    },
};
//# sourceMappingURL=taskService.js.map