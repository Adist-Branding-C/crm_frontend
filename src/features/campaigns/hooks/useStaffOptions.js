import { useState, useEffect, useRef } from 'react';
import { agentService } from '../../account-settings/agent/services/agent.service';
export function useStaffOptions() {
    const [selectedType, setSelectedType] = useState('');
    const [agents, setAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const cachedAgents = useRef(null);
    useEffect(() => {
        if (selectedType !== 'Data Pool' && selectedType !== 'Lead Campaign') {
            setAgents([]);
            setError(null);
            return;
        }
        if (cachedAgents.current) {
            setAgents(cachedAgents.current);
            return;
        }
        setIsLoading(true);
        setError(null);
        agentService.getAllAgents({ pageNumber: 1, limit: 10 })
            .then(res => {
            const rawItems = res.data?.items ?? [];
            const items = rawItems;
            if (!Array.isArray(items) || items.length === 0) {
                const empty = [];
                cachedAgents.current = empty;
                setAgents(empty);
                return;
            }
            const mapped = items.map((a) => {
                const agent = { id: String(a.staff_id), name: String(a.name ?? a.fullName ?? '') };
                if (a.email)
                    agent.email = a.email;
                if (a.phone_number || a.phone || a.phoneNumber)
                    agent.designation = String(a.phone_number ?? a.phone ?? a.phoneNumber ?? '');
                return agent;
            });
            cachedAgents.current = mapped;
            setAgents(mapped);
        })
            .catch(err => {
            setError(err?.response?.data?.message || err?.message || 'Failed to load staff');
            setAgents([]);
        })
            .finally(() => setIsLoading(false));
    }, [selectedType]);
    const clearCache = () => {
        cachedAgents.current = null;
    };
    return { selectedType, setSelectedType, agents, isLoading, error, clearCache };
}
//# sourceMappingURL=useStaffOptions.js.map