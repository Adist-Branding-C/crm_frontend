import * as yup from 'yup';
const dealTaskValidationSchema = yup.object({
    title: yup.string().trim().required('Title is required'),
    description: yup.string().trim().notRequired(),
    scheduledDate: yup.string().required('Scheduled date is required'),
    scheduledTime: yup.string().required('Scheduled time is required'),
    assignedTo: yup.string().required('Assigned to is required'),
    leadId: yup.string().notRequired(),
    priority: yup.string().required('Priority is required'),
    status: yup.string().required('Status is required'),
});
export const addDealTaskValidationSchema = dealTaskValidationSchema;
export const editDealTaskValidationSchema = dealTaskValidationSchema;
//# sourceMappingURL=index.js.map