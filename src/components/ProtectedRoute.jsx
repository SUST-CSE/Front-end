import { Navigate } from 'react-router-dom';
import useStore from '../zustand/store';
import { ROLES } from '../utils/constants';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useStore();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles) {
        const userRole = user?.role?.toLowerCase();
        const allowed = allowedRoles.map(r => r.toLowerCase());
        if (!allowed.includes(userRole)) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
