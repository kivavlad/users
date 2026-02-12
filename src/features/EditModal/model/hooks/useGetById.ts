import { useQuery } from '@tanstack/react-query';

import { editUserService } from '../edit-user.service';

export const useGetById = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => editUserService.getUserById(id),
    select: (data) => data.data,
  });
};
