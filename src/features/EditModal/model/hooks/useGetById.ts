import { useQuery } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';
import useAlert from '@shared/hooks/useAlert';
import { isError } from '@shared/lib/utils/isError';

import { editUserService } from '../edit-user.service';

export const useGetById = (id: string) => {
  const alert = useAlert();

  return useQuery({
    queryKey: [...ApiTags.users, id],
    queryFn: () => editUserService.getUserById(id),
    select: (data) => data.data,
    onError(err) {
      alert.error('Не удалось загрузить данные пользователя');
      isError(err) && console.error(err?.message);
    },
  });
};
