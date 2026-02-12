import { useQuery } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';

import { userService } from '../users.service';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ApiTags.users,
    queryFn: () => userService.getUsers(),
    select: (data) => data.data,
  });
};
