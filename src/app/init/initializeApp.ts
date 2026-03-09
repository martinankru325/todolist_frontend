import { useAppDispatch, useAppSelector } from "../providers/store/hooks/useAppDispatch";
import { useEffect } from "react";
import { setAuth, setInitialized } from "entities/user/model/slice/authSlice";
import { queryClient } from "../providers/queryClient";
import { useMe } from "entities/user";

export const useInitializeApp = () => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(state => state.auth.isAuth);
  useEffect(() => {
    if (!isAuth) {
      queryClient.removeQueries({ queryKey: ['profile'], exact: true });
    }
  }, [isAuth]);

  const { data, isSuccess, isError } = useMe()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAuth(true));
      dispatch(setInitialized());
    }
    if (isError) {
      dispatch(setInitialized());
    }
  }, [isSuccess, isError, data, dispatch]);
};
