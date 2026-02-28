import { useQuery } from '@tanstack/react-query';

import useAlert from '@shared/hooks/useAlert';

import { editUserService } from '../edit-user.service';

export const useGetById = (id: string) => {
  const alert = useAlert();

  return useQuery({
    queryKey: [id],
    queryFn: () => editUserService.getUserById(id),
    select: (data) => data.data,
    onError(err) {
      alert.error('Не удалось загрузить данные пользователя');
      console.error(err);
    },
  });
};
