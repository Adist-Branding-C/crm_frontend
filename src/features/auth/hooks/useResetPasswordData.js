import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { resetPasswordValidationSchema } from '../validations/resetPassword.schema';
const resetPasswordInitialValues = { password: '', confirmPassword: '' };
export function useResetPasswordData() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = useCallback(async (values, { setSubmitting }) => {
        if (!token) {
            setError('Invalid or missing reset token');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const response = await authService.resetPassword({ token, newPassword: values.password });
            if (response.status) {
                setIsSuccess(true);
            }
            else {
                setError(response.message || 'Failed to reset password');
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to reset password');
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
    }, [token]);
    return {
        token, showPassword, setShowPassword,
        showConfirmPassword, setShowConfirmPassword,
        isLoading, isSuccess, error,
        handleSubmit,
        validationSchema: resetPasswordValidationSchema,
        initialValues: resetPasswordInitialValues,
    };
}
//# sourceMappingURL=useResetPasswordData.js.map