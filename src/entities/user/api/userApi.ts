import { apiClient } from 'shared/api';

import { User, UserSchema } from '../model/types/user';

export const getUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/profile');
  return UserSchema.parse(response.data);
};
