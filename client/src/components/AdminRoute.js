// client/src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

function AdminRoute({ children }) {
  const { user } = useAuth();

  // 1. First, we wrap the component in a ProtectedRoute.
  // This handles the 'loading' and 'isAuthenticated' checks for us.
  return (
    <ProtectedRoute>
      {/* 2. If the user is authenticated, we check their role. */}
      {user?.role === 'Admin' ? (
        // 3. If they are an admin, show the page
        children
      ) : (
        // 4. If they are not an admin, send them to the dashboard
        <Navigate to="/dashboard" replace />
      )}
    </ProtectedRoute>
  );
}

export default AdminRoute;