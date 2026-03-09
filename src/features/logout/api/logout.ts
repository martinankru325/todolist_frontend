import { apiClient } from "shared/api";

export const logoutRequest = async (): Promise<string> => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};
