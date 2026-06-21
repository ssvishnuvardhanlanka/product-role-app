import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, hasRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !hasRole(...roles)) {
    return <Navigate to="/products" />;
  }

  return children;
}