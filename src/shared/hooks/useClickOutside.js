import { useRef, useEffect } from 'react';
export function useClickOutside(onClickOutside) {
    const ref = useRef(null);
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClickOutside();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [onClickOutside]);
    return ref;
}
//# sourceMappingURL=useClickOutside.js.map