import { useState, useCallback } from 'react';
export function useLeadGenerationAPIData() {
    const [apiToken, setApiToken] = useState('gl_sk_4a7f9e2c1d8b3f5a6e7c9d2a1f8b4e6c7d');
    const [copied, setCopied] = useState(false);
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [activeTab, setActiveTab] = useState('introduction');
    const handleGenerateToken = useCallback(() => {
        setApiToken('gl_sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    }, []);
    const handleCopyToken = useCallback(() => {
        navigator.clipboard.writeText(apiToken);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [apiToken]);
    return { apiToken, copied, showTokenModal, setShowTokenModal, activeTab, setActiveTab, handleGenerateToken, handleCopyToken };
}
//# sourceMappingURL=useLeadGenerationAPIData.js.map