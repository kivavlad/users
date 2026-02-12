import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';

import { createUserService } from '..';
import type { FormValues } from '../../lib/schema';

export const useCreate = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (values: FormValues) => createUserService.createUser(values),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users });
    },
  });
};
