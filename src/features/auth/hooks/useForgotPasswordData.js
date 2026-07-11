import { useState, useCallback } from 'react';
import { authService } from '../services/AuthService';
import { forgotPasswordValidationSchema } from '../validations/forgotPassword.schema';
const forgotPasswordInitialValues = { phone: '' };
export function useForgotPasswordData() {
    const [submittedPhone, setSubmittedPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = useCallback(async (values, { setSubmitting }) => {
        setError('');
        setIsLoading(true);
        try {
            const response = await authService.forgotPassword({ phone: values.phone });
            if (response.status) {
                setSubmittedPhone(values.phone);
                setIsSent(true);
            }
            else {
                setError(response.message || 'Failed to send reset link');
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to send reset link');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
        }
        finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    }, []);
    return {
        submittedPhone,
        isLoading, isSent, setIsSent, error,
        handleSubmit,
        validationSchema: forgotPasswordValidationSchema,
        initialValues: forgotPasswordInitialValues,
    };
}
//# sourceMappingURL=useForgotPasswordData.js.map