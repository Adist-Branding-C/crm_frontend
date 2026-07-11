import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { AUTH_ROUTES } from '../features/auth/constants/auth.constants';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading)
        return null;
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: AUTH_ROUTES.LOGIN, replace: true });
    }
    return children;
};
export default ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.js.map