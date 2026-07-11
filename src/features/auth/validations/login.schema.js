import * as yup from 'yup';
import { PHONE_NUMBER_REGEX, PHONE_NUMBER_MESSAGE } from '../../../shared/constants/regex';
export const loginValidationSchema = yup.object({
    phone: yup.string().required('Phone number is required').matches(PHONE_NUMBER_REGEX, PHONE_NUMBER_MESSAGE),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});
//# sourceMappingURL=login.schema.js.map