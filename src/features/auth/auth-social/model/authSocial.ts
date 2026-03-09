import { apiClient } from 'shared/api/apiClient';
import { authSocialProviders } from './types';
import { LoginResponse } from '../../auth-by-username/model/types';

export const authSocial = async (provider: authSocialProviders) => {
  const { data } = await apiClient.get<{auth_url: string }>(`/auth/${provider}/login`);
  window.location.href = data.auth_url;
};

export const gitLabCallbackRequest = async (code: string): Promise<LoginResponse> => {
  const response = await apiClient.get<LoginResponse>('/auth/gitlab/callback', {
    params: {code},
  });

  return response.data;
}

export const googleCallbackRequest = async (code: string): Promise<LoginResponse> => {
  const response = await apiClient.get<LoginResponse>('/auth/google/callback', {
    params: {code},
  });

  return response.data;
}