import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordService } from '../services/password.service';
import { getPasswordStrength } from '../../../../shared/validations/password.validation';
import { AUTH_ROUTES } from '../../../auth/constants/auth.constants';
import { clearAuthTokens } from '../../../auth/utils/tokenStorage';
const POST_PASSWORD_CHANGE_LOGOUT_DELAY_MS = 2000;
export const usePasswordData = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showToast, setShowToast] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const logoutTimeoutRef = useRef(undefined);
    useEffect(() => {
        return () => {
            if (logoutTimeoutRef.current)
                clearTimeout(logoutTimeoutRef.current);
        };
    }, []);
    const showToastMessage = useCallback((message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    }, []);
    const handleSubmit = useCallback(async (values, { setSubmitting, resetForm }) => {
        setIsLoading(true);
        try {
            const payload = {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            };
            const response = await passwordService.changePassword(payload);
            if (response.status) {
                resetForm();
                showToastMessage('Password changed successfully! Please sign in again.', 'success');
                logoutTimeoutRef.current = setTimeout(() => {
                    clearAuthTokens();
                    navigate(AUTH_ROUTES.LOGIN);
                }, POST_PASSWORD_CHANGE_LOGOUT_DELAY_MS);
                return true;
            }
            else {
                showToastMessage(response.message || 'Failed to change password', 'error');
                return false;
            }
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                const message = axiosErr.response?.data?.message || 'Failed to change password';
                showToastMessage(message, 'error');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                showToastMessage(err.message, 'error');
            }
            else {
                showToastMessage('Network error. Please try again.', 'error');
            }
            return false;
        }
        finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    }, [showToastMessage, navigate]);
    return {
        isLoading,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        toastMessage,
        toastType,
        showToast,
        setShowCurrentPassword,
        setShowNewPassword,
        setShowConfirmPassword,
        setShowToast,
        getPasswordStrength,
        handleSubmit,
    };
};
//# sourceMappingURL=usePasswordData.js.map