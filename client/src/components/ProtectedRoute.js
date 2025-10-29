// client/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Center } from '@chakra-ui/react';

function ProtectedRoute({ children }) {
  // 1. Get auth state from our hook
  const { isAuthenticated, loading } = useAuth();

  // 2. Show a loading spinner while auth state is being checked
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // 3. If not authenticated, redirect to the /login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 4. If authenticated, render the children (the page)
  return children;
}

export default ProtectedRoute;