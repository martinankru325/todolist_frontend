import { Navigate, useSearchParams } from 'react-router-dom';

import { AuthResetVerifySuccess } from '..';

export const AuthResetVerifyView = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <Navigate to="/auth" replace />;

  return <AuthResetVerifySuccess token={token} />;
};
