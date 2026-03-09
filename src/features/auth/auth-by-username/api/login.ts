import { apiClient } from 'shared/api';

import { LoginResponse, LoginFormData } from '../model/types';

export const loginRequest = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  return response.data;
};
