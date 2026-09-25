import * as yup from 'yup';
import { PHONE_NUMBER_REGEX, PHONE_NUMBER_MESSAGE } from '../../../shared/constants/regex';

export const loginValidationSchema = yup.object({
  isSuperAdmin: yup.boolean(),
  companyId: yup.string().trim().when('isSuperAdmin', {
    is: true,
    then: (schema) => schema,
    otherwise: (schema) => schema.required('Company ID is required'),
  }),
  phone: yup.string().required('Phone number is required').matches(PHONE_NUMBER_REGEX, PHONE_NUMBER_MESSAGE),
  password: yup.string().required('Password is required'),
});
