import { Navigate } from 'react-router-dom';
import { getSession } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  if (!getSession()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
