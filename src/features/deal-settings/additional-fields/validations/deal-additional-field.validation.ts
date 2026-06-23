import * as yup from 'yup';

export const dealAdditionalFieldValidationSchema = yup.object({
  fieldName: yup.string().required('Field name is required'),
  fieldType: yup.string().required('Field type is required'),
});
