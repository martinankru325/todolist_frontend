import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'app/providers/store/hooks/useAppDispatch';
import { Loader } from 'shared/ui';

export const PublicRoute = () => {
  const { isAuth, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return <Loader />;
  }

  if (isAuth) {
    return <Navigate to="/project" replace />;
  }

  return <Outlet />;
};
