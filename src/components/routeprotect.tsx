import { Navigate } from 'react-router';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }:Props) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
