import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSession } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getSession().then((session) => {
      setStatus(session ? 'ok' : 'denied');
    });
  }, []);

  if (status === 'loading') return null;
  if (status === 'denied') return <Navigate to="/admin" replace />;
  return children;
}
