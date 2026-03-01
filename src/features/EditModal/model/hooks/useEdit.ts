import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';
import useAlert from '@shared/hooks/useAlert';
import { useModals } from '@shared/hooks/useModals';

import { editUserService } from '..';

import type { IUser } from '@shared/types/user.types';

export const useEdit = () => {
  const client = useQueryClient();
  const alert = useAlert();
  const { closeModal } = useModals();

  return useMutation({
    mutationFn: (user: IUser) => editUserService.editUser(user),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users });
      alert.success('Пользователь обновлен');
      closeModal('editUser');
    },
    onError: () => {
      alert.error('Не удалось обновить пользователя');
    },
  });
};
