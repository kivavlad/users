import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';
import useAlert from '@shared/hooks/useAlert';
import { useModals } from '@shared/hooks/useModals';

import { createUserService } from '..';

import type { FormValues } from '../../lib/schema';

export const useCreate = () => {
  const client = useQueryClient();
  const alert = useAlert();
  const { closeModal } = useModals();

  return useMutation({
    mutationFn: (values: FormValues) => createUserService.createUser(values),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users });
      alert.success('Новый пользователь создан');
      closeModal('createUser');
    },
    onError: (err) => {
      alert.error('Ошибка создания пользователя');
      console.error(err);
    },
  });
};
