import { useState, useCallback } from 'react';
export function useLeadTypesToast() {
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
//# sourceMappingURL=useLeadTypesToast.js.map