import * as yup from 'yup';
import { PHONE_NUMBER_REGEX, PHONE_NUMBER_MESSAGE } from '../../../shared/constants/regex';
export const forgotPasswordValidationSchema = yup.object({
    phone: yup.string().required('Phone number is required').matches(PHONE_NUMBER_REGEX, PHONE_NUMBER_MESSAGE),
});
//# sourceMappingURL=forgotPassword.schema.js.map