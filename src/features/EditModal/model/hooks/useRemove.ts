import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';
import useAlert from '@shared/hooks/useAlert';
import { useModals } from '@shared/hooks/useModals';

import { editUserService } from '..';

export const useRemove = () => {
  const client = useQueryClient();
  const alert = useAlert();
  const { closeModal } = useModals();

  return useMutation({
    mutationFn: (id: string) => editUserService.removeUser(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users });
      alert.success('Пользователь удален');
      closeModal('editUser');
    },
    onError: (err) => {
      alert.error('Не удалось удалить пользователя');
      console.error(err);
    },
  });
};
