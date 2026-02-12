import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiTags } from "@shared/constants/tags";
import { createUserService } from '..';
import { FormValues } from "@features/CreateModal/lib/values";

export const useCreate = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (values: FormValues) => createUserService.createUser(values),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ApiTags.users });
    }
  });
};
