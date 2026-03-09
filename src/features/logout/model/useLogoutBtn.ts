import { logout } from "entities/user/model/slice/authSlice";
import { useMutation } from "@tanstack/react-query";
import { logoutRequest } from "../api/logout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/providers/store/hooks/useAppDispatch";

export const useLogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: () => logoutRequest(),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      dispatch(logout());
      navigate('/auth');
    },
  });
};
