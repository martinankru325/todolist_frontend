import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'app/providers/queryClient';
import { login } from 'entities/user/model/slice/authSlice';
import { useAppDispatch } from 'app/providers/store/hooks/useAppDispatch';
import { googleCallbackRequest } from './authSocial';

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (code: string) => googleCallbackRequest(code),
    onSuccess: async (data) => {
      if (!data.access_token) {
        console.error('Ошибка: Бэк прислал 200, но токена нет. Проверь вкладку Network!');
        return; 
      }
      localStorage.setItem('accessToken', data.access_token);
      dispatch(login());
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/project');
    },
    onError: (error) => {
      console.log('GitLab Auth Error:', error);
    },
  });
};
