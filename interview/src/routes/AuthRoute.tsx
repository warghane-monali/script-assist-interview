import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/app.store';

type Props = {
  children: React.ReactNode;
  isPrivate?: boolean;
};

const AuthRoute = ({ children, isPrivate = true }: Props) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  if (!hasHydrated) return null; // Optionally show a loading spinner or similar

  if (isPrivate) {
    return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
  } else {
    return isAuthenticated ? <Navigate to="/dashboard/info" replace /> : <>{children}</>;
  }
};

export default AuthRoute;
