import { useState, useCallback } from 'react';
export function useToast() {
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showToast, setShowToast] = useState(false);
    const showToastMessage = useCallback((message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    }, []);
    return { toastMessage, toastType, showToast, setShowToast, showToastMessage };
}
//# sourceMappingURL=useToast.js.map