import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiTags } from "@shared/constants/tags";
import { IUser } from "@shared/types/user.types";
import { editUserService } from "..";

export const useEdit = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (values: IUser) => 
      editUserService.editUser(values),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users })
    }
  });
};
