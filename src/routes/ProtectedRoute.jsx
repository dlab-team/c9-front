import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/acceso', requiredAdminRole = false }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || (requiredAdminRole && !currentUser.isAdmin)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
