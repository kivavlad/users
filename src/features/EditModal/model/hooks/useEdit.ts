import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';
import type { IUser } from '@shared/types/user.types';

import { editUserService } from '..';

export const useEdit = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (user: IUser) => editUserService.editUser(user),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users });
    },
  });
};
