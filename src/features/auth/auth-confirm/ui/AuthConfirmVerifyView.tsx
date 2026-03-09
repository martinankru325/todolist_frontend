import { useQuery } from '@tanstack/react-query';
import { Navigate, useSearchParams } from 'react-router-dom';

import { AuthConfirmVerifyFaild, AuthConfirmVerifySuccess } from '..';
import { verifyEmailRequest } from '../api/confirm';

export const AuthConfirmVerifyView = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ['verify-email', token],
    queryFn: () => verifyEmailRequest({ token: token! }),
    retry: false,
    enabled: !!token,
  });

  if (!token) return <Navigate to="/auth" replace />;

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Проверяем вашу почту</h2>
      </div>
    );
  }

  if (isSuccess) {
    return <AuthConfirmVerifySuccess />;
  }

  if (isError) {
    return <AuthConfirmVerifyFaild />;
  }

  return null;
};
