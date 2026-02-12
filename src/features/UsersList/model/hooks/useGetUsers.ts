import { useQuery } from "@tanstack/react-query";
import { userService } from "../users.service";
import { UserTags } from '../constants';

export const useGetUsers = () => {
  return useQuery({
    queryKey: UserTags,
    queryFn: userService.getUsers,
    select: (data) => data.data
  });
};
