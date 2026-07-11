import * as yup from 'yup';
import { strongPasswordYupSchema } from '../../../shared/validations/password.validation';
export const resetPasswordValidationSchema = yup.object({
    password: strongPasswordYupSchema.required('Please enter a new password'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your new password'),
});
//# sourceMappingURL=resetPassword.schema.js.map