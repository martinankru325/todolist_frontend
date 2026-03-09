import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api/userApi';
import { User } from '../model/types/user';

export const useMe = () => {
  return useQuery<User>({
    queryKey: ['profile'],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: 15 * 60 * 1000,
  });
};
