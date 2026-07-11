import { useState, useCallback } from 'react';
export function useLeadAdditionalToast() {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const showSuccessToast = useCallback((message) => {
        setToastMessage(message);
        setToastType('success');
        setShowToast(true);
    }, []);
    const clearToast = useCallback(() => setShowToast(false), []);
    return { showToast, toastMessage, toastType, showSuccessToast, clearToast };
}
//# sourceMappingURL=useLeadAdditionalToast.js.map