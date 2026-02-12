import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';

import { editUserService } from '..';

export const useRemove = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => editUserService.removeUser(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users });
    },
  });
};
