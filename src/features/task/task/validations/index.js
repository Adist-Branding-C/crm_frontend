import * as yup from 'yup';
const taskValidationSchema = yup.object({
    title: yup.string().trim().required('Title is required'),
    description: yup.string().trim().notRequired(),
    categoryId: yup.string().required('Category is required'),
    scheduledDate: yup.string().required('Scheduled date is required'),
    scheduledTime: yup.string().required('Scheduled time is required'),
    assignedTo: yup.string().required('Assigned to is required'),
    leadId: yup.string().notRequired(),
    priority: yup.string().required('Priority is required'),
    status: yup.string().required('Status is required'),
});
export const addTaskValidationSchema = taskValidationSchema;
export const editTaskValidationSchema = taskValidationSchema;
//# sourceMappingURL=index.js.map