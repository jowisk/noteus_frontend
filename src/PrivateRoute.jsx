// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import PlatformPage from './pages/PlatformPage'; // Import the PlatformPage component

const PrivateRoute = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/sign-in" replace />;
  }

  // Render the PlatformPage component
  return <PlatformPage />;
};

export default PrivateRoute;
