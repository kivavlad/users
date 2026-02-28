import { useQuery } from '@tanstack/react-query';

import { ApiTags } from '@shared/constants/tags';
import useAlert from '@shared/hooks/useAlert';

import { userService } from '../users.service';

export const useGetUsers = () => {
  const alert = useAlert();

  return useQuery({
    queryKey: ApiTags.users,
    queryFn: () => userService.getUsers(),
    select: (data) => data.data,
    onError(err) {
      alert.error('Не удалось получить пользователей');
      console.error(err);
    },
  });
};
