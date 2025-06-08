
import React from 'react';
import { Navigate } from 'react-router-dom';

// This component is deprecated in favor of the new Auth page
const Login = () => {
  return <Navigate to="/auth" replace />;
};

export default Login;
