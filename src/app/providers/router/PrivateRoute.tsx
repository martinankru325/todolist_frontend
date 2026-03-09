import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks/useAppDispatch';
import { Loader } from 'shared/ui';

export const PrivateRoute = () => {
  const { isAuth, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return <Loader />;
  }

  if (!isAuth && isInitialized) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
