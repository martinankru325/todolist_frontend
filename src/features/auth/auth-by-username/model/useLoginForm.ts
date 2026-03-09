import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { queryClient } from 'app/providers/queryClient';
import { useAppDispatch } from 'app/providers/store/hooks/useAppDispatch';

import { loginRequest } from '../api/login';

import { LoginFormData, LoginResponse } from './types';
import { login } from 'entities/user/model/slice/authSlice';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: LoginFormData) => loginRequest(data),
    onSuccess: async (data: LoginResponse) => {
      localStorage.setItem('accessToken', data.access_token);
      dispatch(login());
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/project');
    },
  });
};
